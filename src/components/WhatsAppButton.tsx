import { motion } from "motion/react";
import { content } from "../content";
import { whatsappHref } from "../lib/links";

const c = content.whatsapp;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.004 3C8.832 3 3 8.83 3 16c0 2.293.6 4.533 1.74 6.507L3 29l6.66-1.707A12.95 12.95 0 0 0 16.004 29C23.172 29 29 23.17 29 16S23.172 3 16.004 3Zm0 23.64c-1.96 0-3.88-.527-5.553-1.52l-.4-.24-3.953 1.013 1.053-3.853-.26-.4A10.6 10.6 0 0 1 5.36 16c0-5.867 4.773-10.64 10.644-10.64 5.866 0 10.64 4.773 10.64 10.64 0 5.866-4.774 10.64-10.64 10.64Zm5.84-7.973c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.214-.374.24-.694.08-.32-.16-1.353-.5-2.573-1.586-.953-.847-1.6-1.894-1.786-2.214-.187-.32-.02-.493.14-.653.146-.146.32-.373.48-.56.16-.187.213-.32.32-.533.106-.214.053-.4-.027-.56-.08-.16-.72-1.734-.987-2.374-.26-.626-.526-.54-.72-.546l-.613-.014a1.18 1.18 0 0 0-.853.4c-.294.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.254 3.44 5.46 4.826.764.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.134-.293-.214-.613-.374Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const onClick = () => {
    window.fbq?.("track", "Contact", { content_name: "WhatsApp flotante" });
  };

  return (
    <motion.a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.aria}
      onClick={onClick}
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] flex items-center gap-3"
    >
      <span className="hidden md:block pointer-events-none rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.12)] opacity-0 translate-x-2 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
        {c.label}
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-[background-color,transform] duration-200 group-hover:bg-whatsapp-deep group-hover:-translate-y-0.5">
        <span aria-hidden="true" className="wa-pulse absolute inset-0 rounded-full bg-whatsapp" />
        <WhatsAppIcon className="relative w-7 h-7 md:w-8 md:h-8" />
      </span>
    </motion.a>
  );
}
