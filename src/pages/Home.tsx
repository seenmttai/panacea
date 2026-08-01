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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50/50">
        <ParticleCanvas />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest shadow-lg animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Unified Medical AI Vision Engine</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.1] max-w-5xl mx-auto">
            Non-Invasive Hemoglobin & Retinal Screening via AI
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Panacea deploys deep temporal vision backbones (<span className="text-slate-900 font-semibold font-mono">VBOSNetDinoV2</span> and <span className="text-slate-900 font-semibold font-mono">EfficientNetB6</span>) to turn standard mobile devices into clinical-grade diagnostic instruments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('diagnostics')}
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-display font-semibold text-base transition-all shadow-xl shadow-slate-900/15 flex items-center gap-3 group"
            >
              <span>Launch AI Diagnostic Suite</span>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('technology')}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-display font-semibold text-base transition-all border border-slate-300 shadow-sm flex items-center gap-2"
            >
              <Cpu className="w-5 h-5 text-slate-600" />
              <span>Explore API Documentation</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto border-t border-slate-200/80">
            <div>
              <div className="text-3xl font-extrabold font-display text-slate-900">5-Frame</div>
              <div className="text-xs text-slate-500 font-medium">Video Temporal Slicing</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-slate-900">98.2%</div>
              <div className="text-xs text-slate-500 font-medium">DR Baseline Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-slate-900">&lt; 1.2s</div>
              <div className="text-xs text-slate-500 font-medium">Cloud Inference Latency</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-slate-900">0.85</div>
              <div className="text-xs text-slate-500 font-medium">JPEG Frame Compression</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Diagnostic Models Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-semibold">
            Clinical Vision Models
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900">
            Dual High-Precision Neural Architectures
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Choose a non-invasive screening module powered by our live cloud deep learning backend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Anemia */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shadow-inner">
                <Droplet className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  VBOSNetDinoV2 Model • Endpoint: /predict_anemia
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                  Continuous Hemoglobin Quantification
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Extracts 5 evenly-spaced JPEG frames (224x224) from a 5-second video of an illuminated fingertip nailbed to accurately measure Hemoglobin levels in g/dL.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Biological Sex Baseline Adjustment (Female 12.0 / Male 13.0 g/dL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>HTML5 Canvas 5-Frame Auto Extractor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Torch Flashlight Tissue Illumination</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('diagnostics')}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Test Anemia Scanner</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Card 2: Retinopathy */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold shadow-inner">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  EfficientNetB6 Model • Endpoint: /predict_dr
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                  Diabetic Retinopathy Screening
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Evaluates macro fundus images for microaneurysms, hemorrhages, and cotton wool spots with 98% baseline accuracy.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Continuous Probability Score (0.0 to 1.0)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Binary Triage Cutoff at 0.5 Threshold</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Instant PNG/JPG Retinal Scan Analysis</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('diagnostics')}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Test Retinopathy Scanner</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
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
          <h2 className="text-3xl font-bold font-display text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about our non-invasive AI technology.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-display font-semibold text-base text-slate-900">
              How does fingertip video estimate Hemoglobin without blood sampling?
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              When illuminated by a smartphone LED flash, capillary pulsation in the fingertip nailbed alters light absorption across the spectrum. VBOSNetDinoV2 processes 5 extracted frames to compute light attenuation curves correlated directly with Hemoglobin (g/dL).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-display font-semibold text-base text-slate-900">
              Why is the custom header required for API calls?
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              All client requests include the header <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-mono">"ngrok-skip-browser-warning": "69420"</code> to bypass the Ngrok warning landing page during cross-origin fetch requests.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-display font-semibold text-base text-slate-900">
              Can I host Panacea on Cloudflare Pages?
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Yes! Panacea is built as a zero-dependency static React application via Vite. Simply connect your GitHub repository to Cloudflare Pages or run <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-mono">npx wrangler pages deploy dist</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
