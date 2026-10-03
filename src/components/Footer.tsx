import { content } from "../content";
import { CONTACT_EMAIL, LEGAL_LINKS, LOGO_URL } from "../config";

const c = content.footer;

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg shadow-white/5">
            <img src={LOGO_URL} alt="" width={1080} height={1080} loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight font-display">MediSimple</span>
        </div>
        <p className="max-w-md mb-8 text-slate-400 text-lg leading-relaxed">{c.tagline}</p>
        <div className="mb-8 flex flex-col items-center gap-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            {CONTACT_EMAIL}
          </a>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm font-medium">
            {LEGAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-slate-400 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="h-px w-24 bg-slate-800 mb-8" />
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} MediSimple. {c.rights}
        </p>
      </div>
    </footer>
  );
}
