"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Car, ChevronDown, ChevronRight, HeartPulse, LogIn, Menu, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_URL, INSURANCE_MENU, NAV_LINKS, TOOLS_MENU } from "@/data/content";
import { cn } from "@/lib/utils";
import SignInDialog from "./SignInDialog";

const INSURANCE_ICONS = { ShieldCheck, HeartPulse, Building2, Car };

const planHref = (slug: string) => `/insurance/${slug}`;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [mobileInsuranceOpen, setMobileInsuranceOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openInsurance = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setInsuranceOpen(true);
  };
  const closeInsuranceSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setInsuranceOpen(false), 120);
  };

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 20;
        if (isScrolled !== shouldBeScrolled) {
          setIsScrolled(shouldBeScrolled);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (!insuranceOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInsuranceOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [insuranceOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-4 md:top-6 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "py-0" : "py-0"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className={cn("relative flex items-center justify-between rounded-full border px-4 md:px-6 transition-all duration-300", isScrolled ? "bg-white/92 backdrop-blur-xl border-white/80 shadow-[0_16px_45px_rgba(17,37,65,.14)] py-2.5" : "bg-white/90 backdrop-blur-md border-white/80 shadow-[0_10px_35px_rgba(17,37,65,.10)] py-3")}>
          <Link href="/" className="relative z-50 flex shrink-0 items-center ml-0 sm:ml-2 p-2 sm:p-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95">
            <Image
              src="/logos/Colour Primary Logo.svg"
              alt="Qura Insure Horizontal Logo"
              width={160}
              height={46}
              className="h-9 lg:h-10 w-auto transition-all duration-300"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5 lg:gap-7">
            <div onMouseEnter={openInsurance} onMouseLeave={closeInsuranceSoon}>
              <button
                type="button"
                aria-expanded={insuranceOpen}
                aria-controls="insurance-menu"
                onClick={() => setInsuranceOpen((open) => !open)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  insuranceOpen ? "bg-bg-main text-text-main" : "text-text-muted hover:text-text-main"
                )}
              >
                Insurance
                <ChevronDown size={15} className={cn("transition-transform duration-200", insuranceOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {insuranceOpen && (
                  <motion.div
                    id="insurance-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 right-0 top-full mx-auto w-full max-w-[820px] pt-3"
                  >
                    <div className="grid grid-cols-[1fr_260px] gap-3 rounded-3xl border border-border-subtle bg-white p-3 shadow-[0_24px_60px_rgba(17,37,65,.16)]">
                      <ul className="grid content-start gap-1 p-2">
                        {INSURANCE_MENU.map((item) => {
                          const Icon = INSURANCE_ICONS[item.icon];
                          return (
                            <li key={item.slug}>
                              <Link
                                href={planHref(item.slug)}
                                onClick={() => setInsuranceOpen(false)}
                                className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-bg-main"
                              >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-sage text-primary transition-colors group-hover:bg-cta">
                                  <Icon size={20} />
                                </span>
                                <span>
                                  <span className="block text-[15px] font-semibold text-text-main">{item.title}</span>
                                  <span className="mt-0.5 block text-sm leading-snug text-text-muted">{item.description}</span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="rounded-2xl bg-primary p-5 text-white">
                        <div className="text-xs font-bold uppercase tracking-[.18em] text-cta">Tools</div>
                        <ul className="mt-3 divide-y divide-white/10">
                          {TOOLS_MENU.map((tool) => (
                            <li key={tool.name}>
                              <Link
                                href={tool.href}
                                onClick={() => setInsuranceOpen(false)}
                                className="group flex items-center justify-between py-3 text-[15px] text-white/85 transition-colors hover:text-cta"
                              >
                                {tool.name}
                                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-medium text-text-muted hover:text-text-main transition-colors py-1"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <Link
              href={BOOKING_URL ?? "/#contact"}
              className="px-6 py-3 bg-primary text-white hover:bg-dark text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary/15 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Talk to an advisor
            </Link>
            <button
              type="button"
              onClick={() => setSignInOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-primary hover:bg-accent-hover text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <LogIn size={16} />
              Sign in
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden relative z-50 p-2 -mr-2 text-primary rounded-lg hover:bg-bg-main transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 bg-surface rounded-3xl border border-border-subtle shadow-2xl px-6 py-8 flex flex-col gap-6 xl:hidden max-h-[calc(100dvh-100px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              <div>
                <button
                  type="button"
                  aria-expanded={mobileInsuranceOpen}
                  onClick={() => setMobileInsuranceOpen((open) => !open)}
                  className="flex w-full items-center justify-between text-lg font-medium text-primary"
                >
                  Insurance
                  <ChevronDown size={20} className={cn("transition-transform duration-200", mobileInsuranceOpen && "rotate-180")} />
                </button>
                {mobileInsuranceOpen && (
                  <div className="mt-4 flex flex-col gap-4">
                    <ul className="flex flex-col gap-1">
                      {INSURANCE_MENU.map((item) => {
                        const Icon = INSURANCE_ICONS[item.icon];
                        return (
                          <li key={item.slug}>
                            <Link
                              href={planHref(item.slug)}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-bg-main"
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-sage text-primary">
                                <Icon size={18} />
                              </span>
                              <span>
                                <span className="block font-semibold text-primary">{item.title}</span>
                                <span className="block text-sm text-text-muted">{item.description}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="rounded-2xl bg-primary p-4 text-white">
                      <div className="text-xs font-bold uppercase tracking-[.18em] text-cta">Tools</div>
                      <ul className="mt-2 divide-y divide-white/10">
                        {TOOLS_MENU.map((tool) => (
                          <li key={tool.name}>
                            <Link
                              href={tool.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between py-3 text-white/85 hover:text-cta"
                            >
                              {tool.name}
                              <ChevronRight size={16} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-primary hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="h-px w-full bg-border-subtle my-2" />
            <div className="flex flex-col gap-4">
              <button
                type="button"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-2 py-3 text-base font-medium text-primary bg-bg-main hover:bg-surface-sage transition-colors rounded-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInOpen(true);
                }}
              >
                <LogIn size={18} />
                Sign in
              </button>
              <Link
                href={BOOKING_URL ?? "/#contact"}
                className="text-center py-3 text-base font-medium text-text-inverse bg-cta hover:bg-cta-hover text-primary transition-colors rounded-lg shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Talk to an advisor
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignInDialog open={signInOpen} onClose={() => setSignInOpen(false)} />
    </motion.header>
  );
}
