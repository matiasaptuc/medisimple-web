import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { content } from "../content";
import { LOGO_URL } from "../config";
import { bookingHref } from "../lib/links";

const c = content.nav;

function scrollToSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4">
      <div
        className={`mx-auto max-w-5xl flex justify-between items-center rounded-full border pl-5 pr-2.5 py-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-md border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            : "bg-white/60 backdrop-blur-sm border-slate-200/60"
        }`}
      >
        <button type="button" onClick={() => go("home")} aria-label={c.goHome} className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="" width={1080} height={1080} className="h-9 w-auto" />
          <span className="font-display font-bold tracking-[0.025em] text-slate-900 hidden sm:inline">MediSimple</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {c.links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a
            href={bookingHref()}
            className="px-5 py-2.5 rounded-full bg-brand-secondary text-white text-sm font-bold hover:bg-brand-deep transition-[background-color,box-shadow] duration-300 shadow-sm hover:shadow-md flex items-center justify-center"
          >
            {c.cta}
          </a>
        </div>

        <button
          className="md:hidden text-slate-700 p-2"
          aria-label={open ? c.closeMenu : c.openMenu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-auto max-w-5xl mt-2 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl py-5 px-6 flex flex-col gap-4">
          {c.links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="text-base font-medium text-slate-700 text-left"
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a
            href={bookingHref()}
            className="w-full py-3.5 rounded-full bg-brand-secondary text-white font-bold text-base text-center"
            onClick={() => setOpen(false)}
          >
            {c.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
