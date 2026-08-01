import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                PANACEA<span className="text-cyan-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified Medical Deep Learning API for non-invasive hemoglobin quantification and automated retinal vascular screening.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 font-mono text-xs hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 font-mono text-xs hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
              >
                X / Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 font-mono text-xs hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Overview & Hero
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diagnostics')} className="hover:text-white transition-colors">
                  Anemia Scanner (VBOSNetDinoV2)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diagnostics')} className="hover:text-white transition-colors">
                  Retinopathy Scanner (EfficientNetB6)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Clinical Contact & Research
                </button>
              </li>
            </ul>
          </div>

          {/* Live Endpoints */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Live API Endpoints
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-bold text-[10px]">POST</span>
                <span>/predict_anemia</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-bold text-[10px]">POST</span>
                <span>/predict_dr</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold text-[10px]">GET</span>
                <span>/ (Health Check)</span>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Regulatory Standards
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HIPAA & GDPR Ready</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Images processed in volatile memory with zero persistent patient data storage.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Panacea Medical AI Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Clinical Terms of Service</a>
            <a href="#security" className="hover:text-slate-400">Security Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
