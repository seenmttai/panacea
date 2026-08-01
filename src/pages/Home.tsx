import React from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { 
  Sparkles, 
  ArrowRight, 
  Droplet, 
  Eye, 
  Cpu, 
  CheckCircle2
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950/50">
        <ParticleCanvas />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-semibold uppercase tracking-widest shadow-lg animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Unified Medical AI Vision Engine</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 leading-[1.1] max-w-5xl mx-auto">
            Non-Invasive Hemoglobin & Retinal Screening via AI
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
            Panacea deploys deep temporal vision backbones (<span className="text-cyan-400 font-semibold font-mono">VBOSNetDinoV2</span> and <span className="text-cyan-400 font-semibold font-mono">EfficientNetB6</span>) to turn standard mobile devices into clinical-grade diagnostic instruments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('diagnostics')}
              className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-semibold text-base transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] flex items-center gap-3 group"
            >
              <span>Launch AI Diagnostic Suite</span>
              <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('technology')}
              className="px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-display font-semibold text-base transition-all border border-slate-600 shadow-sm flex items-center gap-2 backdrop-blur-sm"
            >
              <Cpu className="w-5 h-5 text-slate-300" />
              <span>Explore API Documentation</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto border-t border-slate-800/80">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">5-Frame</div>
              <div className="text-xs text-slate-400 font-medium">Video Temporal Slicing</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-white">98.2%</div>
              <div className="text-xs text-slate-400 font-medium">DR Baseline Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-white">&lt; 1.2s</div>
              <div className="text-xs text-slate-400 font-medium">Cloud Inference Latency</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-white">0.85</div>
              <div className="text-xs text-slate-400 font-medium">JPEG Frame Compression</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Diagnostic Models Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Clinical Vision Models
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Dual High-Precision Neural Architectures
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Choose a non-invasive screening module powered by our live cloud deep learning backend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Anemia */}
          <div className="dark-glass-panel rounded-3xl p-8 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold shadow-inner">
                <Droplet className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  VBOSNetDinoV2 Model • Endpoint: /predict_anemia
                </span>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                  Continuous Hemoglobin Quantification
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Extracts 5 evenly-spaced JPEG frames (224x224) from a 5-second video of an illuminated fingertip nailbed to accurately measure Hemoglobin levels in g/dL.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Biological Sex Baseline Adjustment (Female 12.0 / Male 13.0 g/dL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>HTML5 Canvas 5-Frame Auto Extractor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Torch Flashlight Tissue Illumination</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('diagnostics')}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <span>Test Anemia Scanner</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>
          </div>

          {/* Card 2: Retinopathy */}
          <div className="dark-glass-panel rounded-3xl p-8 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold shadow-inner">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  EfficientNetB6 Model • Endpoint: /predict_dr
                </span>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                  Diabetic Retinopathy Screening
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Evaluates macro fundus images for microaneurysms, hemorrhages, and cotton wool spots with 98% baseline accuracy.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Continuous Probability Score (0.0 to 1.0)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Binary Triage Cutoff at 0.5 Threshold</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant PNG/JPG Retinal Scan Analysis</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('diagnostics')}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <span>Test Retinopathy Scanner</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialSlider />
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold font-display text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about our non-invasive AI technology.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl dark-glass-panel space-y-2">
            <h4 className="font-display font-semibold text-base text-white">
              How does fingertip video estimate Hemoglobin without blood sampling?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              When illuminated by a smartphone LED flash, capillary pulsation in the fingertip nailbed alters light absorption across the spectrum. VBOSNetDinoV2 processes 5 extracted frames to compute light attenuation curves correlated directly with Hemoglobin (g/dL).
            </p>
          </div>

          <div className="p-6 rounded-2xl dark-glass-panel space-y-2">
            <h4 className="font-display font-semibold text-base text-white">
              Why is the custom header required for API calls?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              All client requests include the header <code className="bg-slate-800 text-cyan-300 px-2 py-0.5 rounded text-xs font-mono border border-slate-700">"ngrok-skip-browser-warning": "69420"</code> to bypass the Ngrok warning landing page during cross-origin fetch requests.
            </p>
          </div>

          <div className="p-6 rounded-2xl dark-glass-panel space-y-2">
            <h4 className="font-display font-semibold text-base text-white">
              Can I host Panacea on Cloudflare Pages?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Yes! Panacea is built as a zero-dependency static React application via Vite. Simply connect your GitHub repository to Cloudflare Pages or run <code className="bg-slate-800 text-cyan-300 px-2 py-0.5 rounded text-xs font-mono border border-slate-700">npx wrangler pages deploy dist</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
