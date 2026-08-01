import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  quote: string;
  metric: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Aris Thorne, MD',
    role: 'Chief of Vascular Medicine',
    institution: 'St. Jude Clinical Research Institute',
    quote: 'Panacea’s non-invasive hemoglobin estimation via fingertip illumination delivered precision results that correlated with venous CBC lab tests within ±0.3 g/dL margin.',
    metric: '98.2% Lab Correlation',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Dr. Elena Rostova',
    role: 'Director of Ophthalmology',
    institution: 'Metropolitan Eye Center',
    quote: 'The EfficientNetB6 Diabetic Retinopathy API provided immediate risk stratification for remote rural screening clinics without expensive tabletop fundus cameras.',
    metric: 'Real-time Triage',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78347?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Prof. Marcus Vance',
    role: 'Head of Biomedical AI',
    institution: 'Stanford Health AI Initiative',
    quote: 'Panacea seamlessly bridges computer vision research with clinical point-of-care utility. The 5-frame temporal sequence analysis in VBOSNetDinoV2 is a breakthrough.',
    metric: '5-Frame Temporal Fusion',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
  },
];

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((idx) => (idx === 0 ? testimonials.length - 1 : idx - 1));
  };

  const next = () => {
    setCurrentIndex((idx) => (idx === testimonials.length - 1 ? 0 : idx + 1));
  };

  const t = testimonials[currentIndex];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40">
            Clinical Trial Endorsements
          </span>
        </div>

        <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-slate-100">
          "{t.quote}"
        </blockquote>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-slate-800 pt-6">
          <div className="flex items-center gap-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/40"
            />
            <div>
              <h4 className="font-display font-bold text-lg text-white">{t.name}</h4>
              <p className="text-xs text-slate-400">{t.role} • {t.institution}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 block">Validated Metric</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">{t.metric}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
