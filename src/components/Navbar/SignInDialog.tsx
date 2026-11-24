"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Briefcase, User, X } from "lucide-react";

const OPTIONS = [
  {
    title: "Client login",
    description: "Your policies, claims and advisor in one place.",
    icon: User,
    href: "https://client.qurainsure.com",
  },
  {
    title: "Employee login",
    description: "For the Qura team.",
    icon: Briefcase,
    href: "https://crm.qurainsure.com/login",
  },
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
      className="fixed inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] max-w-none overflow-y-auto rounded-3xl border border-border-subtle bg-surface p-0 text-text-main shadow-[0_30px_80px_rgba(17,37,65,.28)] backdrop:bg-primary/45 backdrop:backdrop-blur-sm"
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

        <ul className="grid auto-rows-fr gap-3">
          {OPTIONS.map(({ title, description, icon: Icon, href }) => (
            <li key={title}>
              <a
                href={href}
                className="group flex h-full items-center gap-4 rounded-2xl border border-border-subtle p-4 text-primary transition-all hover:border-primary hover:bg-surface-sage"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-sm text-text-muted">{description}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
