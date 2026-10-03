import { motion } from "motion/react";
import { Check } from "lucide-react";
import { content } from "../content";

const c = content.acr;

export default function AcrSection() {
  return (
    <section id="acr" className="py-20 md:py-32 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14 md:mb-20 text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">{c.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-12">
          {c.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="border-t-2 border-slate-900/10 pt-8"
            >
              <div className="text-6xl font-bold font-display text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
                {"ACR"[i]}
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">{pillar.title}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-500">{pillar.subtitle}</p>
              <p className="mt-4 text-slate-600 leading-relaxed">{pillar.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-slate-700">
                    <Check size={15} strokeWidth={3} className="shrink-0 mt-1 text-brand-tertiary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-16 md:mt-24 max-w-3xl text-2xl md:text-3xl font-bold leading-snug text-slate-900 text-center md:text-left mx-auto md:mx-0 font-display"
        >
          {c.quoteA}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
            {c.quoteB}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
