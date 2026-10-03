import { createElement, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { content } from "../content";
import { WISTIA_MEDIA_ID } from "../config";

const c = content.video;

function loadWistia() {
  if (document.querySelector('script[src="https://fast.wistia.com/player.js"]')) return;
  const player = document.createElement("script");
  player.src = "https://fast.wistia.com/player.js";
  player.async = true;
  document.head.appendChild(player);
  const embed = document.createElement("script");
  embed.src = `https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`;
  embed.async = true;
  embed.type = "module";
  document.head.appendChild(embed);
}

export default function VideoSection() {
  const ref = useRef<HTMLElement>(null);

  // Carga el reproductor solo cuando la sección está cerca de la vista.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      loadWistia();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadWistia();
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="video-section" className="bg-slate-950 py-24 md:py-32 relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{c.sub}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
        >
          <style>{`wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`}</style>
          <div className="w-full relative aspect-video">
            {createElement("wistia-player", { "media-id": WISTIA_MEDIA_ID, aspect: "1.7777777777777777" })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
