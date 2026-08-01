import React, { useState } from 'react';
import { AnemiaScanner } from '../components/AnemiaScanner';
import { RetinopathyScanner } from '../components/RetinopathyScanner';
import { ApiStatusBadge } from '../components/ApiStatusBadge';
import { Droplet, Eye } from 'lucide-react';

export const Diagnostics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anemia' | 'dr'>('anemia');

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              Live Medical AI Diagnostics
            </h1>
            <ApiStatusBadge />
          </div>
          <p className="text-slate-600 text-sm max-w-2xl">
            Execute real-time non-invasive diagnostic inference on fingertip video clips or retinal fundus scans.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('anemia')}
            className={`px-5 py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'anemia'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplet className="w-4 h-4 text-rose-400" />
            <span>Anemia (5-Frame Video)</span>
          </button>
          <button
            onClick={() => setActiveTab('dr')}
            className={`px-5 py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'dr'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Diabetic Retinopathy</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="animate-fade-in">
        {activeTab === 'anemia' ? <AnemiaScanner /> : <RetinopathyScanner />}
      </div>
    </div>
  );
};
