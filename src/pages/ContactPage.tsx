import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { Mail, Phone, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
          <HeartHandshake className="w-4 h-4 text-cyan-400" />
          <span>Clinical Contact & Research</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
          Partner with Panacea Engineering
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Get in touch with our clinical AI team for institutional partnerships, HIPAA integration, or custom vision models.
        </p>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right: Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="dark-glass-panel rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Direct Communication Channels</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Clinical Inquiries</span>
                  <a href="mailto:kritagya.singh.dev@gmail.com" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    kritagya.singh.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Enterprise Support Hotline</span>
                  <span className="font-semibold text-white">+1 (800) 555-PANACEA</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Innovation Center</span>
                  <span className="font-semibold text-white">700 Tech Plaza Way, Palo Alto, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dark-glass-panel rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-display font-bold text-white text-base">Regulatory & Security Notice</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All video frames, endoscopy imagery, and retinal fundus uploads are executed in volatile ephemeral sandbox memory. No patient Identifiable Health Information (PHI) is retained.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Google Maps */}
      <GoogleMapEmbed />
    </div>
  );
};
