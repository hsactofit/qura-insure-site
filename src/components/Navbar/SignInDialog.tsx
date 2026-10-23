"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Briefcase, Building2, Handshake, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENT_APP_URL = process.env.NEXT_PUBLIC_CLIENT_APP_URL ?? "https://app.qurainsure.com";
const CRM_APP_URL = process.env.NEXT_PUBLIC_CRM_APP_URL ?? "https://qura-crrm-panel.vercel.app";

const OPTIONS = [
  {
    title: "Client login",
    description: "Your policies, claims and advisor in one place.",
    icon: User,
    href: `${CLIENT_APP_URL}/auth/login`,
  },
  { title: "Corporate login", description: "Group cover for your employees.", icon: Building2, href: null },
  { title: "Partner login", description: "For agents and distribution partners.", icon: Handshake, href: null },
];

/** Sign-in chooser. Uses the native <dialog> (focus containment, Escape to close, inert page). */
export default function SignInDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="signin-title"
      className="fixed inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] max-w-none overflow-y-auto rounded-3xl border border-border-subtle bg-surface p-0 text-text-main shadow-[0_30px_80px_rgba(10,35,66,.28)] backdrop:bg-primary/45 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="signin-title" className="text-xl font-semibold text-primary sm:text-2xl">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-text-muted">Choose how you use Qura Insure.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-full p-2 text-text-muted transition-colors hover:bg-bg-main hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {OPTIONS.map(({ title, description, icon: Icon, href }) => {
            const body = (
              <>
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    href ? "bg-accent text-primary" : "bg-bg-main text-navy-50"
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-semibold">
                    {title}
                    {!href && (
                      <span className="rounded-full bg-bg-main px-2 py-0.5 text-[11px] font-medium text-text-muted">Coming soon</span>
                    )}
                  </span>
                  <span className="block text-sm text-text-muted">{description}</span>
                </span>
                {href && <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />}
              </>
            );
            return (
              <li key={title}>
                {href ? (
                  <a
                    href={href}
                    className="group flex items-center gap-4 rounded-2xl border border-border-subtle p-4 text-primary transition-all hover:border-primary hover:bg-surface-sage"
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-4 rounded-2xl border border-dashed border-border-subtle p-4 text-navy-50"
                  >
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-text-muted">
          <Briefcase size={13} />
          Qura team?
          <a href={`${CRM_APP_URL}/login`} className="font-semibold text-primary underline-offset-2 hover:underline">
            Employee login
          </a>
        </p>
      </div>
    </dialog>
  );
}
