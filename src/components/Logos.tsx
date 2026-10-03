import { content } from "../content";
import { CLIENT_LOGOS } from "../config";

const c = content.logos;
const MASK = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

export default function Logos() {
  return (
    <section id="results" className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{c.title}</h2>
      </div>
      <div className="relative" style={{ maskImage: MASK, WebkitMaskImage: MASK }}>
        <div className="marquee-track flex w-max items-center gap-10 md:gap-20 pr-10 md:pr-20">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={c.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              aria-hidden={i >= CLIENT_LOGOS.length}
              className="h-12 md:h-16 w-auto object-contain grayscale opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
