import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Check } from "lucide-react";
import { content } from "../content";

const c = content.process;
const STEPS = c.steps.map((step, i) => ({ ...step, id: `0${i + 1}` }));

export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.62", "end 0.5"] });
  const line = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.3 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length + 0.2))));
  });

  return (
    <section id="process" className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-secondary/15 blur-[130px]"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24 text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">{c.title}</h2>
          <p className="mt-5 text-lg text-slate-400">{c.sub}</p>
        </div>

        <div ref={listRef} className="relative max-w-3xl">
          <div aria-hidden="true" className="absolute left-[8px] md:left-[10px] top-2 bottom-2 w-px bg-white/10">
            <motion.div
              style={{ scaleY: line }}
              className="absolute inset-0 origin-top bg-linear-to-b/srgb from-brand-primary to-brand-tertiary shadow-[0_0_14px_rgba(100,178,255,0.6)]"
            />
          </div>

          <ol className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => {
              const on = i <= active;
              return (
                <li key={step.id} className="relative pl-12 md:pl-20">
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-2 w-[17px] h-[17px] md:w-[21px] md:h-[21px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 ${
                      on
                        ? "bg-brand-primary border-brand-primary shadow-[0_0_18px_rgba(100,178,255,0.6)]"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                  >
                    <div
                      className={`text-5xl md:text-6xl font-bold font-display transition-colors duration-500 ${
                        on
                          ? "text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-primary to-brand-tertiary"
                          : "text-slate-700"
                      }`}
                    >
                      {step.id}
                    </div>
                    <h3
                      className={`mt-4 text-2xl md:text-3xl font-bold transition-colors duration-500 ${
                        on ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base md:text-lg text-slate-400 leading-relaxed">{step.content}</p>
                    <ul className="mt-6 space-y-2.5">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-slate-200">
                          <Check
                            size={15}
                            strokeWidth={3}
                            className={`shrink-0 transition-colors duration-500 ${
                              on ? "text-brand-tertiary" : "text-slate-600"
                            }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
