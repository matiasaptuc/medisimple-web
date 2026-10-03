import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { content } from "../content";
import { bookingHref } from "../lib/links";

const c = content.plans;

export default function Plans() {
  return (
    <section id="planes" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16 text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">{c.title}</h2>
          <p className="mt-5 text-slate-600 text-lg">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {c.options.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 md:p-10 border bg-white flex flex-col ${
                plan.featured
                  ? "border-brand-secondary/30 shadow-[0_24px_80px_rgb(59_117_192/0.12)]"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary"
                />
              )}
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{plan.audience}</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                {plan.featured ? (
                  <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
                    {plan.name}
                  </span>
                ) : (
                  plan.name
                )}
              </h3>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">{plan.desc}</p>
              <ul className="mt-8 space-y-3.5 border-t border-slate-100 pt-8">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="mt-0.5 min-w-[22px] min-h-[22px] rounded-full bg-brand-tertiary/10 flex items-center justify-center text-brand-tertiary">
                      <Check size={13} strokeWidth={4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-6 md:mt-8 bg-white rounded-3xl p-7 md:p-10 border border-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">{c.includesTitle}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3.5">
            {c.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-slate-700">
                <Check size={15} strokeWidth={3} className="shrink-0 mt-1 text-brand-tertiary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">{c.specialtiesTitle}</p>
              <div className="flex flex-wrap gap-2">
                {c.specialties.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={bookingHref()}
              className="shrink-0 flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-secondary text-white font-semibold hover:bg-brand-deep transition-[background-color,box-shadow] duration-300 shadow-lg shadow-brand-secondary/25 group"
            >
              {c.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
