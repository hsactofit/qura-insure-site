"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={cn("flex items-center justify-between rounded-full border px-4 md:px-6 transition-all duration-300", isScrolled ? "bg-white/92 backdrop-blur-xl border-white/80 shadow-[0_16px_45px_rgba(11,36,66,.14)] py-2.5" : "bg-white/90 backdrop-blur-md border-white/80 shadow-[0_10px_35px_rgba(11,36,66,.10)] py-3")}>
          <Link href="/" className="relative z-50 flex items-center ml-2 md:ml-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95">
            <Image
              src="/logos/Colour Secondary Logo.svg"
              alt="Qura Insure Horizontal Logo"
              width={160}
              height={46}
              className="h-8 md:h-9 lg:h-10 w-auto transition-all duration-300"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
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

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#login"
              className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors"
            >
              Log in
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 bg-primary text-white hover:bg-dark text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary/15 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Book a free call
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 -mr-2 text-primary rounded-lg hover:bg-bg-main transition-colors"
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
            className="absolute top-[calc(100%+12px)] left-6 right-6 bg-surface rounded-3xl border border-border-subtle shadow-2xl px-6 py-8 flex flex-col gap-6 md:hidden max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
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
              <Link
                href="#login"
                className="text-center py-3 text-base font-medium text-primary bg-surface-mint hover:bg-bg-main transition-colors rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="#contact"
                className="text-center py-3 text-base font-medium text-text-inverse bg-cta hover:bg-cta-hover text-primary transition-colors rounded-lg shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a free call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
