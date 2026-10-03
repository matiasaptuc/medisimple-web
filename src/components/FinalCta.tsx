import { ArrowRight } from "lucide-react";
import { content } from "../content";
import { bookingHref } from "../lib/links";

const c = content.cta;

export default function FinalCta() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-secondary/20 blur-[140px]"
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          {c.h1a} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-primary to-brand-tertiary">{c.h1b}</span>
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">{c.sub}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={bookingHref()}
            className="flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-[background-color,box-shadow] duration-300 shadow-xl shadow-black/20"
          >
            {c.button}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500">{c.note}</p>
      </div>
    </section>
  );
}
