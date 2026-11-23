// Coverage calculations based on common Indian market practice.
// These are planning estimates, not underwriting decisions.

const LAKH = 100_000;
const CRORE = 100 * LAKH;

// ---------- Life (term) cover ----------

export type LifeInputs = {
  age: number;
  retirementAge: number;
  annualIncome: number;
  annualExpenses: number; // what the family would need each year without you
  loans: number;
  goals: number; // children's education, marriage, etc. at today's cost
  existingCover: number;
  savings: number; // liquid investments the family could use
  inflation: number; // % per year
  returnRate: number; // % per year earned on the payout
};

export const LIFE_DEFAULTS: LifeInputs = {
  age: 30,
  retirementAge: 60,
  annualIncome: 12 * LAKH,
  annualExpenses: 6 * LAKH,
  loans: 0,
  goals: 25 * LAKH,
  existingCover: 0,
  savings: 2 * LAKH,
  inflation: 6,
  returnRate: 8,
};

/** Present value of expenses that grow with inflation, paid yearly for `years`. */
export function growingAnnuityPV(annual: number, years: number, inflationPct: number, returnPct: number) {
  if (years <= 0 || annual <= 0) return 0;
  const g = inflationPct / 100;
  const r = returnPct / 100;
  if (Math.abs(r - g) < 1e-9) return (annual * years) / (1 + r);
  return (annual / (r - g)) * (1 - Math.pow((1 + g) / (1 + r), years));
}

/** Approximate maximum cover as a multiple of income that many Indian insurers allow by age. */
export function insurerIncomeMultiple(age: number) {
  if (age <= 35) return 25;
  if (age <= 40) return 20;
  if (age <= 45) return 15;
  if (age <= 50) return 12;
  if (age <= 55) return 10;
  return 5;
}

/** Term covers are usually sold in ₹25 lakh steps above ₹50 lakh. */
export function roundLifeCover(amount: number) {
  if (amount <= 0) return 0;
  const step = 25 * LAKH;
  return Math.max(50 * LAKH, Math.ceil(amount / step) * step);
}

export function calculateLifeCover(input: LifeInputs) {
  const years = Math.max(0, input.retirementAge - input.age);
  const incomeReplacement = growingAnnuityPV(input.annualExpenses, years, input.inflation, input.returnRate);
  const emergencyFund = input.annualExpenses / 2; // six months of expenses
  const gross = incomeReplacement + input.loans + input.goals + emergencyFund;
  const offsets = input.existingCover + input.savings;
  const need = Math.max(0, gross - offsets);
  const recommended = roundLifeCover(need);
  const multiple = insurerIncomeMultiple(input.age);
  const insurerLimit = input.annualIncome * multiple;
  return {
    years,
    incomeReplacement,
    emergencyFund,
    loans: input.loans,
    goals: input.goals,
    offsets,
    need,
    recommended,
    ruleOfThumb: { low: input.annualIncome * 10, high: input.annualIncome * 15 },
    insurerMultiple: multiple,
    insurerLimit,
    exceedsInsurerLimit: input.annualIncome > 0 && recommended > insurerLimit,
  };
}

// ---------- Health cover ----------

export type CityTier = "metro" | "tier2" | "tier3";

export type HealthInputs = {
  city: CityTier;
  adults: number; // 1 or 2 (you and spouse)
  children: number;
  eldestAge: number; // eldest member on the family floater
  preExisting: boolean;
  employerCover: number;
  parents: number; // 0, 1 or 2, insured on a separate policy
  eldestParentAge: number;
};

export const HEALTH_DEFAULTS: HealthInputs = {
  city: "metro",
  adults: 2,
  children: 1,
  eldestAge: 32,
  preExisting: false,
  employerCover: 5 * LAKH,
  parents: 0,
  eldestParentAge: 62,
};

export const CITY_LABELS: Record<CityTier, string> = {
  metro: "Metro (Mumbai, Delhi NCR, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad)",
  tier2: "Tier 2 city",
  tier3: "Tier 3 city / town",
};

// Base sum insured for one adult under 35, reflecting typical hospitalisation costs by city tier.
const CITY_BASE: Record<CityTier, number> = { metro: 10 * LAKH, tier2: 7.5 * LAKH, tier3: 5 * LAKH };

// Standard sum insured options sold in India.
export const SUM_INSURED_STEPS = [3, 5, 7.5, 10, 15, 20, 25, 30, 50, 75, 100].map((l) => l * LAKH);

export function roundSumInsured(amount: number) {
  return SUM_INSURED_STEPS.find((s) => s >= amount) ?? SUM_INSURED_STEPS[SUM_INSURED_STEPS.length - 1];
}

export function ageFactor(age: number) {
  if (age < 35) return 1;
  if (age <= 45) return 1.25;
  if (age <= 55) return 1.5;
  return 2;
}

export function calculateHealthCover(input: HealthInputs) {
  const base = CITY_BASE[input.city];
  const adults = Math.min(2, Math.max(1, input.adults));
  const children = Math.max(0, input.children);
  // A floater is shared, so each extra member adds less than a full sum insured.
  const familyFactor = 1 + 0.5 * (adults - 1) + 0.25 * children;
  const age = ageFactor(input.eldestAge);
  const ped = input.preExisting ? 1.25 : 1;
  const raw = base * familyFactor * age * ped;
  const recommended = roundSumInsured(raw);

  // Split larger covers into a base policy plus a cheaper super top-up.
  const basePolicy = recommended >= 15 * LAKH ? Math.min(recommended, roundSumInsured(base)) : recommended;
  const superTopUp = recommended - basePolicy;

  let parentsCover = 0;
  if (input.parents > 0) {
    const parentAge = input.eldestParentAge >= 70 ? 1.5 : input.eldestParentAge >= 60 ? 1.25 : 1;
    parentsCover = roundSumInsured(base * (input.parents === 2 ? 1.5 : 1) * parentAge);
  }

  return {
    base,
    familyFactor,
    ageFactor: age,
    pedFactor: ped,
    raw,
    recommended,
    basePolicy,
    superTopUp,
    parentsCover,
    employerCover: input.employerCover,
  };
}

// ---------- Formatting ----------

export function formatINR(amount: number) {
  const n = Math.round(amount);
  if (Math.abs(n) >= CRORE) return `₹${trim(n / CRORE)} Cr`;
  if (Math.abs(n) >= LAKH) return `₹${trim(n / LAKH)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const trim = (v: number) => Number(v.toFixed(2)).toString();
