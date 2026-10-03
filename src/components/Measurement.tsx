import { motion } from "motion/react";
import { BarChart3, Check, Database, Megaphone, X } from "lucide-react";
import { content } from "../content";

const c = content.measurement;
const SOURCE_ICONS = [Megaphone, Database, BarChart3];

export default function Measurement() {
  return (
    <section id="medicion" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14 md:mb-20 text-center md:text-left mx-auto md:mx-0">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-brand-secondary mb-5">
            {c.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">{c.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{c.sub}</p>
        </div>

        {/* Las tres fuentes que se cruzan, conectadas como un solo recorrido */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[42px] left-[16%] right-[16%] h-px bg-linear-to-r/srgb from-brand-primary via-brand-secondary to-brand-tertiary"
          />
          {c.sources.map((source, i) => {
            const Icon = SOURCE_ICONS[i];
            return (
              <motion.div
                key={source.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative bg-white rounded-3xl p-7 md:p-8 border border-slate-200 text-center md:text-left"
              >
                <div className="relative z-10 mx-auto md:mx-0 w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-md shadow-brand-primary/10 flex items-center justify-center text-brand-secondary">
                  <Icon size={24} />
                </div>
                <div className="mt-6 text-sm font-bold font-display text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
                  Fuente 0{i + 1}
                </div>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{source.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{source.d}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 bg-slate-950 rounded-3xl p-7 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div aria-hidden="true" className="absolute -right-24 -top-24 w-72 h-72 bg-brand-secondary/25 rounded-full blur-[90px]" />
          <div aria-hidden="true" className="absolute -left-24 -bottom-24 w-72 h-72 bg-brand-tertiary/15 rounded-full blur-[90px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">{c.metricsTitle}</h3>
              <ul className="space-y-3.5">
                {c.metrics.map((metric) => (
                  <li key={metric} className="flex items-center gap-3 text-slate-200 font-medium">
                    <span className="min-w-[24px] min-h-[24px] rounded-full bg-brand-tertiary flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={4} />
                    </span>
                    {metric}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-slate-400 font-medium">
                  <span className="min-w-[24px] min-h-[24px] rounded-full bg-white/10 flex items-center justify-center text-slate-400">
                    <X size={14} strokeWidth={3} />
                  </span>
                  {c.notMeasured}
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">{c.integrationsTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {c.integrations.map((name) => (
                    <span
                      key={name}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold font-display"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed border-t border-white/10 pt-6">{c.floorNote}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
