import { describe, expect, it } from "vitest";
import {
  HEALTH_DEFAULTS,
  LIFE_DEFAULTS,
  calculateHealthCover,
  calculateLifeCover,
  formatINR,
  growingAnnuityPV,
  roundLifeCover,
  roundSumInsured,
} from "../coverage";

const L = 100_000;

describe("life cover", () => {
  it("discounts inflation-linked expenses", () => {
    // 6 L/yr for 30 yrs, 6% inflation, 8% return ≈ 128.8 L
    expect(growingAnnuityPV(6 * L, 30, 6, 8) / L).toBeCloseTo(128.8, 0);
    // Equal rates fall back to a simple discounted sum
    expect(growingAnnuityPV(1 * L, 10, 8, 8)).toBeCloseTo((10 * L) / 1.08);
    expect(growingAnnuityPV(1 * L, 0, 6, 8)).toBe(0);
  });

  it("rounds to ₹25 L steps with a ₹50 L floor", () => {
    expect(roundLifeCover(0)).toBe(0);
    expect(roundLifeCover(10 * L)).toBe(50 * L);
    expect(roundLifeCover(151 * L)).toBe(175 * L);
  });

  it("produces a sensible default recommendation", () => {
    const r = calculateLifeCover(LIFE_DEFAULTS);
    expect(r.years).toBe(30);
    expect(r.recommended).toBe(175 * L);
    expect(r.exceedsInsurerLimit).toBe(false);
  });

  it("returns zero when savings exceed the need", () => {
    const r = calculateLifeCover({ ...LIFE_DEFAULTS, savings: 1000 * L });
    expect(r.need).toBe(0);
    expect(r.recommended).toBe(0);
  });

  it("flags covers above the insurer's income multiple", () => {
    const r = calculateLifeCover({ ...LIFE_DEFAULTS, age: 50, annualIncome: 3 * L, annualExpenses: 10 * L });
    expect(r.insurerMultiple).toBe(12);
    expect(r.exceedsInsurerLimit).toBe(true);
  });
});

describe("health cover", () => {
  it("rounds up to standard sum insured options", () => {
    expect(roundSumInsured(4 * L)).toBe(5 * L);
    expect(roundSumInsured(17.5 * L)).toBe(20 * L);
    expect(roundSumInsured(500 * L)).toBe(100 * L);
  });

  it("splits a metro family floater into base + super top-up", () => {
    const r = calculateHealthCover(HEALTH_DEFAULTS); // metro, 2 adults, 1 child, age 32
    expect(r.recommended).toBe(20 * L);
    expect(r.basePolicy).toBe(10 * L);
    expect(r.superTopUp).toBe(10 * L);
  });

  it("keeps a single policy for a young individual in a tier 3 city", () => {
    const r = calculateHealthCover({ ...HEALTH_DEFAULTS, city: "tier3", adults: 1, children: 0, eldestAge: 28 });
    expect(r.recommended).toBe(5 * L);
    expect(r.superTopUp).toBe(0);
  });

  it("sizes parents separately", () => {
    const r = calculateHealthCover({ ...HEALTH_DEFAULTS, parents: 2, eldestParentAge: 72 });
    expect(r.parentsCover).toBe(25 * L); // 10 L × 1.5 × 1.5 = 22.5 L → 25 L
  });
});

describe("formatINR", () => {
  it("uses lakh and crore", () => {
    expect(formatINR(50_000)).toBe("₹50,000");
    expect(formatINR(7.5 * L)).toBe("₹7.5 L");
    expect(formatINR(175 * L)).toBe("₹1.75 Cr");
  });
});
