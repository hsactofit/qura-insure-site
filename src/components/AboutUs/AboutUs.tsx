"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Building2, CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";
import QuraCornerBrackets from "@/components/Common/QuraCornerBrackets";

const promoter = {
  name: "Devendra Ghodnadikar",
  role: "Promoter & Director",
  qualification: "MBA",
  experience: "35+ Years in Financial Markets",
  bio: "Mr. Ghodnadikar holds an MBA and brings over 35 years of deep-rooted experience in financial markets, stock broking, and insurance. As a founding member since incorporation, he stands as the cornerstone of Qura Insure's foundation, embodying the profound expertise that forms the bedrock of our client-focused approach. His commitment to excellence ensures clients receive bespoke, dependable financial services.",
  strengths: ["Financial Markets", "35+ Yrs Leadership", "Founding Director"],
};

const keyOfficers = [
  {
    name: "Harsh Shah",
    designation: "Principal Officer (PO)",
    qualification: "B.Com, pursuing MBA",
    experience: "2 Years Experience",
    detail: "Experienced in client servicing, backoffice operations, and vendor management. Leads IRDAI compliance and customer operations.",
    badgeIcon: ShieldCheck,
  },
  {
    name: "Harshad Nagtilak",
    designation: "Specified Person (SP)",
    qualification: "B.Com",
    experience: "9+ Years Experience",
    detail: "9+ years total experience in premier banking institutions (HDFC Bank, IDFC First Bank & Kotak Bank) as Relationship Manager & Wealth Manager.",
    badgeIcon: Award,
  },
  {
    name: "Siyaa Deshmukh",
    designation: "Specified Person (SP)",
    qualification: "B.Com",
    experience: "2 Years Experience",
    detail: "Specializes in backend client handling, policy servicing, and seamless customer support.",
    badgeIcon: UserCheck,
  },
];

const operationalLeaders = [
  {
    name: "Jigar Maniar",
    role: "Sales Head",
    image: "/team/jigar-maniar.jpeg",
    intro: "Jigar brings more than 17 years of experience across contact-center management, insurance, refinancing, lead management, and MIS.",
    detail: "He leads sales & client experience with a focus on efficient workflows and practical data-led decisions. His career includes work with Mercedes-Benz, Audi, Volkswagen, Kia, Hyundai, Honda Cars, Ashok Leyland, and Ducati.",
    strengths: ["Sales Leadership", "17+ Yrs Experience", "Client Servicing"],
  },
  {
    name: "Akanksha Patel",
    role: "Operations Head",
    image: "/team/aakansha-patel.jpeg",
    intro: "Akanksha combines operations leadership with deep experience in data analysis, helping teams turn complex information into confident action.",
    detail: "Her analytical approach improves operational efficiency and effectiveness across projects, translating data insights into reliable day-to-day decisions.",
    strengths: ["Operations Strategy", "Data Analytics", "Team Development"],
  },
];

const certificates = [
  { title: "IRDAI Brokerage / Agency License", desc: "Registered & approved insurance intermediary" },
  { title: "Principal Officer (PO) Certificate", desc: "IRDAI certified Principal Officer governance" },
  { title: "Specified Person (SP) Certifications", desc: "Certified advisors for transparent policy guidance" },
];

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export default function AboutUs() {
  const [activeLeader, setActiveLeader] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLeader((prev) => (prev + 1) % operationalLeaders.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="team" className="relative overflow-hidden bg-primary py-28 text-white md:py-36">
      <div className="absolute inset-0 bg-grid-pattern opacity-[.06]" />
      <motion.div
        animate={{ x: [0, 70, 0], y: [0, -30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-cta/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div {...reveal} className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.2em] text-cta">About Qura Insure</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">
              Experience you can trust. <span className="font-editorial text-cta">People you can reach.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-white/65">
            Backed by 35+ years of financial expertise, IRDAI certified officers, and dedicated operations leadership.
          </p>
        </motion.div>

        {/* 1. Promoter & Founder Section */}
        <motion.div {...reveal} className="relative mt-16 overflow-hidden rounded-none md:rounded-sm border border-cta/30 bg-white/[.07] p-8 backdrop-blur-md md:p-12 lg:p-14">
          <QuraCornerBrackets color="lime" size="md" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cta/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-cta">
                <Building2 size={15} /> Promoter & Management
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-[-.035em] md:text-5xl">{promoter.name}</h3>
              <div className="mt-2 text-lg font-medium text-cta">{promoter.role} • <span className="text-white/80">{promoter.qualification}</span></div>
              <p className="mt-6 text-lg leading-relaxed text-white/90">{promoter.bio}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {promoter.strengths.map((str) => (
                  <span key={str} className="rounded-full border border-cta/30 bg-cta/10 px-4 py-2 text-sm font-semibold text-cta">
                    {str}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-primary/60 p-7 text-white/85 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-[.18em] text-cta">Leadership Impact</div>
              <div className="mt-6 text-4xl font-bold text-white">35+ Years</div>
              <div className="mt-1 text-sm text-white/60">Financial Markets & Insurance Leadership</div>
              <div className="my-6 h-px bg-white/10" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><CheckCircle2 className="text-cta shrink-0" size={18} /> Founding member since incorporation</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="text-cta shrink-0" size={18} /> Deep expertise in stock broking & insurance</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="text-cta shrink-0" size={18} /> Client-focused bespoke financial guidance</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Key Officers & Specified Persons */}
        <div className="mt-16">
          <motion.div {...reveal} className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-cta">Regulatory & Key Officers</span>
            <h3 className="mt-2 text-3xl font-semibold md:text-4xl">IRDAI Certified Officers</h3>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {keyOfficers.map((officer, index) => {
              const IconComp = officer.badgeIcon;
              return (
                <motion.div
                  key={officer.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-none md:rounded-sm border border-white/10 bg-white/[.06] p-7 backdrop-blur-sm transition hover:border-cta/40 hover:bg-white/[.09]"
                >
                  <QuraCornerBrackets color="lime" size="sm" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-cta/15 p-3 text-cta"><IconComp size={22} /></span>
                    <span className="text-xs font-bold uppercase tracking-[.14em] text-cta">{officer.designation}</span>
                  </div>
                  <h4 className="mt-6 text-2xl font-semibold text-white">{officer.name}</h4>
                  <div className="mt-1 text-xs font-medium text-white/60">{officer.qualification}</div>
                  <div className="mt-4 rounded-xl bg-primary/40 px-3.5 py-2 text-xs font-semibold text-cta border border-white/5">
                    {officer.experience}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">{officer.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Operational Team Infinite Slider (4 Seconds Loop) */}
        <div className="mt-20">
          <motion.div {...reveal} className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-cta">Execution & Service</span>
              <h3 className="mt-2 text-3xl font-semibold md:text-4xl">Operational Leadership</h3>
            </div>
            {/* Slider Dots */}
            <div className="flex items-center gap-3">
              {operationalLeaders.map((leader, i) => (
                <button
                  key={leader.name}
                  onClick={() => setActiveLeader(i)}
                  className={`relative overflow-hidden h-2.5 rounded-full transition-all duration-500 ${
                    activeLeader === i ? "w-12 bg-cta" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide to ${leader.name}`}
                >
                  {activeLeader === i && (
                    <motion.div
                      key={`progress-${activeLeader}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="h-full bg-primary/60"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              {(() => {
                const person = operationalLeaders[activeLeader];
                return (
                  <motion.article
                    key={person.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="group relative grid min-h-[320px] overflow-hidden rounded-none md:rounded-sm border border-white/10 bg-white/[.06] backdrop-blur-sm lg:grid-cols-[.82fr_1.18fr]"
                  >
                    <QuraCornerBrackets color="lime" size="md" />
                    <div className="relative h-[260px] lg:h-full overflow-hidden bg-white">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className={`${
                          person.name === "Jigar Maniar" ? "object-cover object-[center_10%] scale-105" : "object-contain object-bottom"
                        } transition duration-700 group-hover:scale-[1.07]`}
                      />
                      <div className="absolute top-3 right-3 z-10 drop-shadow-xl">
                        <Image src="/logos/Colour Logomark.svg" alt="QURA Logomark" width={40} height={40} className="h-8 w-8 md:h-10 md:w-10" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-2xl bg-cta px-3 py-1.5 text-primary shadow-xl">
                        <div className="text-[11px] font-bold uppercase tracking-[.16em]">{person.role}</div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-5 md:p-6 lg:p-8">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[.2em] text-cta">{person.role}</div>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-.035em] md:text-3xl">{person.name}</h3>
                        <p className="mt-3 text-base leading-relaxed text-white/90">{person.intro}</p>
                        <p className="mt-2 text-xs leading-relaxed text-white/62">{person.detail}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {person.strengths.map((strength) => (
                          <span key={strength} className="rounded-full border border-white/15 bg-white/[.07] px-2.5 py-1 text-[11px] font-semibold text-white/80">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Mandatory IRDAI Licensing & Documents */}
        <motion.div {...reveal} className="mt-20 rounded-[2rem] border border-white/10 bg-white/[.04] p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-cta">Regulatory Compliance</span>
              <h3 className="mt-2 text-2xl font-semibold">Necessary IRDAI Certificates & Documentation</h3>
              <p className="mt-2 text-sm text-white/65">Full regulatory compliance in accordance with IRDAI guidelines.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-cta/40 bg-cta/15 px-5 py-2.5 text-xs font-bold text-cta shrink-0">
              <ShieldCheck size={18} /> Verified Intermediary
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {certificates.map((cert) => (
              <div key={cert.title} className="rounded-2xl border border-white/10 bg-primary/60 p-5">
                <div className="text-sm font-bold text-white">{cert.title}</div>
                <div className="mt-2 text-xs text-white/60">{cert.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

