import { motion } from "motion/react";
import { Activity, ArrowRight, Layers, Play, TrendingUp } from "lucide-react";
import GradientWave, { type WaveOptions } from "./GradientWave";
import { content } from "../content";
import { bookingHref } from "../lib/links";

const c = content.hero;

const WAVE_COLORS = ["#4da8ff", "#2f6fd0", "#66d9e8", "#a9d4ff"];

const DESKTOP_WAVE: WaveOptions = {
  incline: 1.15,
  offsetTop: 0.98,
  offsetBottom: 0.68,
  noiseAmp: 380,
  edgeDamp: 0.3,
  thickness: 0.42,
  noiseFlow: 5,
  noiseFreq: [4.5, 4],
  fiber: { freq: 90, bend: 6, strength: 0.3 },
};

const MOBILE_WAVE: WaveOptions = {
  incline: 0.15,
  offsetTop: 6,
  offsetBottom: 5,
  noiseAmp: 170,
  edgeDamp: 0.35,
  noiseFlow: 4,
  fiber: { freq: 60, bend: 4, strength: 0.22 },
};

/** Texto con un destello que recorre las letras. */
function ShimmerText({ children }: { children: string }) {
  const spread = children.length * 2;
  return (
    <motion.span
      className="relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [background-repeat:no-repeat,padding-box]"
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${spread}px), #5fd6e8, transparent calc(50% + ${spread}px)), linear-gradient(#3b75c0, #3b75c0)`,
      }}
    >
      {children}
    </motion.span>
  );
}

const METRIC_ICONS = [Activity, Layers, TrendingUp];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-[280px] pb-16 md:pt-36 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="absolute inset-0 hidden md:block" style={{ filter: "saturate(1.1)" }}>
        <GradientWave colors={WAVE_COLORS} options={DESKTOP_WAVE} />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[240px] md:hidden [transform:scaleY(-1)]"
        style={{ filter: "saturate(1.1)" }}
      >
        <GradientWave colors={WAVE_COLORS} options={MOBILE_WAVE} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] mb-6"
          >
            <ShimmerText>{c.eyebrow}</ShimmerText>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight"
          >
            {c.h1a} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
              {c.h1b}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 mx-auto md:mx-0"
          >
            {c.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href={bookingHref()}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-brand-secondary text-white font-semibold text-base sm:text-lg whitespace-nowrap hover:bg-brand-deep transition-[background-color,box-shadow] duration-300 shadow-lg shadow-brand-secondary/25 hover:shadow-brand-secondary/40 group"
            >
              {c.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#video-section"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-base sm:text-lg hover:bg-slate-100 transition-[background-color,color] duration-300 hover:text-brand-secondary"
            >
              <Play className="w-4 h-4 fill-current" />
              {c.ctaVideo}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="mt-20 border-t border-slate-100 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.metrics.map((metric, i) => {
            const Icon = METRIC_ICONS[i];
            return (
              <div key={metric.t} className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-100 text-brand-secondary">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{metric.t}</h3>
                  <p className="text-slate-500 text-sm mt-1">{metric.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
