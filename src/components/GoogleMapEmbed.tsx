import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const GoogleMapEmbed: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
      <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Headquarters & Innovation Hub
          </span>
          <h3 className="text-xl font-bold font-display text-white mt-0.5">
            Panacea Medical AI Center
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            700 Tech Plaza Way, Palo Alto, CA 94301
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>+1 (800) 555-PANACEA</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>ai-research@panacea.med</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-80 bg-slate-100">
        <iframe
          title="Panacea Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.423984712853!2d-122.16278!3d37.44188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbabb6208a0d9%3A0xb3671a539c3e41df!2sPalo%20Alto%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="filter grayscale contrast-125 opacity-90"
        />
      </div>
    </div>
  );
};
