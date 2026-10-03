import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { content } from "../content";
import { LOGO_URL } from "../config";

const c = content.problem;

type Point = [number, number];
type NodeDef = {
  id: keyof typeof c.nodes;
  label: string;
  desktop: { start: Point; end: Point };
  mobile: { start: Point; end: Point };
};

const NODES: NodeDef[] = [
  { id: "ads", label: c.nodes.ads, desktop: { start: [55, 8], end: [40, 32] }, mobile: { start: [50, 22], end: [50, 28] } },
  { id: "crm", label: c.nodes.crm, desktop: { start: [92, 15], end: [65, 30] }, mobile: { start: [85, 25], end: [82, 35] } },
  { id: "social", label: c.nodes.social, desktop: { start: [8, 85], end: [28, 65] }, mobile: { start: [15, 78], end: [20, 64] } },
  { id: "whatsapp", label: c.nodes.whatsapp, desktop: { start: [50, 92], end: [45, 76] }, mobile: { start: [80, 86], end: [80, 72] } },
  { id: "reception", label: c.nodes.reception, desktop: { start: [5, 55], end: [25, 48] }, mobile: { start: [10, 45], end: [20, 36] } },
  { id: "clinical", label: c.nodes.clinical, desktop: { start: [95, 70], end: [75, 46] }, mobile: { start: [90, 60], end: [82, 62] } },
];

const ease = (p: number) => {
  const t = Math.min(1, Math.max(0, (p - 0.15) / 0.5));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

function FloatingNode({
  node,
  progress,
  opacity,
}: {
  node: { label: string; start: Point; end: Point };
  progress: MotionValue<number>;
  opacity: MotionValue<number> | number;
}) {
  const left = useTransform(progress, (p) => `${node.start[0] + (node.end[0] - node.start[0]) * ease(p)}%`);
  const top = useTransform(progress, (p) => `${node.start[1] + (node.end[1] - node.start[1]) * ease(p)}%`);
  return (
    <motion.div
      style={{ left, top, opacity }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div className="bg-white border border-brand-primary/10 shadow-md shadow-brand-primary/5 rounded-xl text-center px-5 py-3 min-w-[140px] max-w-[200px]">
        <span className="font-bold text-slate-700 leading-tight text-sm">{node.label}</span>
      </div>
    </motion.div>
  );
}

function ConvergenceScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18, mass: 0.22, restDelta: 5e-4 });

  const realityOpacity = useTransform(smooth, [0.18, 0.38], [1, 0]);
  const realityY = useTransform(smooth, [0.18, 0.38], [0, -30]);
  const solutionOpacity = useTransform(smooth, [0.28, 0.5], [0, 1]);
  const solutionY = useTransform(smooth, [0.28, 0.5], [28, 0]);
  const logoScale = useTransform(smooth, [0.2, 0.6], [0.8, 1.1]);
  const logoOpacity = useTransform(smooth, [0.18, 0.5], [0.5, 1]);

  const nodes = useMemo(() => NODES.map((n) => ({ ...n, start: n.desktop.start, end: n.desktop.end })), []);

  // Líneas y partículas que conectan cada herramienta con MediSimple.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = () => {
      const p = smooth.get();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const now = performance.now();

      const glow = Math.max(0, (p - 0.3) * 1.5);
      if (glow > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        g.addColorStop(0, `rgba(100, 178, 255, ${Math.min(0.4, glow)})`);
        g.addColorStop(1, "rgba(100, 178, 255, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      nodes.forEach((node, i) => {
        const e = ease(p);
        const x = ((node.start[0] + (node.end[0] - node.start[0]) * e) / 100) * w;
        const y = ((node.start[1] + (node.end[1] - node.start[1]) * e) / 100) * h;
        const reach = Math.min(1, Math.max(0, (p - 0.3) / 0.3));
        if (reach <= 0) return;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (cx - x) * reach, y + (cy - y) * reach);
        ctx.strokeStyle = `rgba(100, 178, 255, ${0.2 + reach * 0.5})`;
        ctx.lineWidth = 1 + reach;
        ctx.stroke();

        if (p > 0.4) {
          for (let k = 0; k < 2; k++) {
            const phase = (now * (55e-5 + k * 25e-5) + i * 0.22 + k * 0.33) % 2;
            const t = phase <= 1 ? phase : 2 - phase;
            ctx.beginPath();
            ctx.arc(x + (cx - x) * t, y + (cy - y) * t, 2, 0, Math.PI * 2);
            ctx.fillStyle = k === 0 ? "#02b9cd" : "rgba(100, 178, 255, 0.9)";
            ctx.fill();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    measure();
    window.addEventListener("resize", measure);
    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      io.disconnect();
    };
  }, [smooth, nodes]);

  return (
    <div ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
          <div className="max-w-7xl mx-auto px-6 relative h-full flex flex-col justify-center">
            <motion.div
              style={{ opacity: realityOpacity, y: realityY }}
              className="absolute top-[20%] left-12 lg:left-6 max-w-sm will-change-transform"
            >
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-[1.2]">{c.realityTitle}</h2>
              <p className="text-xl font-medium text-slate-500 leading-relaxed">
                {c.realityPre}{" "}
                <span className="text-rose-500 underline decoration-rose-300/50 decoration-2 underline-offset-4">
                  {c.realityAccent}
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: solutionOpacity, y: solutionY }}
              className="absolute top-[60%] right-12 lg:-right-4 text-left max-w-[450px] lg:max-w-xl z-40 will-change-transform"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
                  {c.solutionAccent}
                </span>{" "}
                <br />
                <span className="text-slate-900">{c.solutionRest}</span>
              </h2>
              <p className="text-lg lg:text-xl font-medium text-slate-600">{c.solutionSub}</p>
            </motion.div>
          </div>
        </div>

        <div className="relative w-full h-full max-w-[1400px] mx-auto pointer-events-none">
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
          <motion.div
            style={{ scale: logoScale, opacity: logoOpacity, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
            className="absolute z-20 w-40 h-40 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl border border-slate-100 will-change-transform"
          >
            <img src={LOGO_URL} alt="MediSimple" width={1080} height={1080} loading="lazy" decoding="async" className="w-24 h-auto" />
          </motion.div>
          {nodes.map((node) => (
            <FloatingNode key={node.id} node={node} progress={smooth} opacity={1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileScene() {
  const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
  return (
    <div className="px-6 py-20 text-center overflow-hidden">
      <motion.div {...fade} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-[1.15]">{c.realityTitle}</h2>
        <p className="text-lg font-medium text-slate-500 leading-relaxed max-w-sm mx-auto">
          {c.realityPre}{" "}
          <span className="text-rose-500 underline decoration-rose-300/50 decoration-2 underline-offset-4">
            {c.realityAccent}
          </span>
          .
        </p>
      </motion.div>
      <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
        {NODES.map((n) => (
          <span
            key={n.id}
            className="px-3 py-1.5 rounded-xl bg-white border border-brand-primary/10 shadow-md shadow-brand-primary/5 text-xs font-bold text-slate-600"
          >
            {n.label}
          </span>
        ))}
      </motion.div>
      <motion.div {...fade} transition={{ duration: 0.5, delay: 0.2 }}>
        <div aria-hidden="true" className="mx-auto mt-7 h-10 w-px bg-linear-to-b/srgb from-slate-200 to-brand-primary" />
        <div className="mx-auto mt-4 w-24 h-24 bg-white rounded-[1.5rem] flex items-center justify-center shadow-2xl border border-slate-100">
          <img src={LOGO_URL} alt="MediSimple" width={1080} height={1080} loading="lazy" decoding="async" className="w-14 h-auto" />
        </div>
        <h2 className="mt-8 text-3xl font-bold leading-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-secondary to-brand-tertiary">
            {c.solutionAccent}
          </span>
          <br />
          <span className="text-slate-900">{c.solutionRest}</span>
        </h2>
        <p className="mt-3 text-base font-medium text-slate-600 max-w-sm mx-auto">{c.solutionSub}</p>
      </motion.div>
    </div>
  );
}

export default function ProblemSection() {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div id="problem" className="bg-slate-50 relative">
      {isMobile ? <MobileScene /> : <ConvergenceScene />}

      <div className="relative py-20 md:py-32 px-6 bg-white z-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14 md:mb-20 text-center md:text-left mx-auto md:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]"
            >
              {c.problemsTitle}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-24">
            {c.cards.map((card, i) => (
              <motion.div
                key={card.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="border-t-2 border-slate-900/10 pt-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{card.t}</h3>
                <p className="mt-2.5 text-base text-slate-600 leading-relaxed">{card.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-slate-900 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 relative z-10">{c.familiar}</h3>
            <p className="text-lg md:text-xl text-slate-300 font-medium relative z-10">{c.familiarSub}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
