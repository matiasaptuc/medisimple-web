import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { content } from "../content";
import { LOGO_URL } from "../config";

const c = content.comparison;

export default function Comparison() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16 text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">{c.title}</h2>
          <p className="mt-5 text-slate-600 text-lg">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-slate-50 rounded-3xl p-7 md:p-10 border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-400 mb-8">{c.agenciesTitle}</h3>
            <ul className="space-y-6">
              {c.agencies.map((item) => (
                <li key={item.t} className="flex items-start gap-4 text-slate-500">
                  <div className="mt-1 min-w-[24px] min-h-[24px] rounded-full bg-slate-200/70 flex items-center justify-center text-slate-400">
                    <X size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <strong className="block text-slate-700 font-semibold">{item.t}</strong>
                    <span className="text-base">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-slate-950 rounded-3xl p-7 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div aria-hidden="true" className="absolute -right-24 -top-24 w-72 h-72 bg-brand-secondary/25 rounded-full blur-[90px]" />
            <div aria-hidden="true" className="absolute -left-24 -bottom-24 w-72 h-72 bg-brand-tertiary/15 rounded-full blur-[90px]" />
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-white rounded-xl p-1.5">
                <img src={LOGO_URL} alt="" width={1080} height={1080} loading="lazy" decoding="async" className="h-7 w-auto" />
              </div>
              <h3 className="text-xl font-bold text-white">MediSimple</h3>
            </div>
            <ul className="space-y-6 relative z-10">
              {c.medisimple.map((item) => (
                <li key={item.t} className="flex items-start gap-4">
                  <div className="mt-1 min-w-[24px] min-h-[24px] rounded-full bg-brand-tertiary flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <div>
                    <strong className="block text-white font-bold">{item.t}</strong>
                    <span className="text-base text-slate-300">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-lg font-medium text-slate-600"
        >
          {c.note}
        </motion.p>
      </div>
    </section>
  );
}
