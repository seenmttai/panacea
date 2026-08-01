import React, { useState } from 'react';
import { Waves, Sparkles, RefreshCw, FileImage, CheckCircle2, Trash2, X } from 'lucide-react';
import { analyzeUltrasound, generateMockUltrasoundResult, type UltrasoundResponse } from '../services/api';

export const UltrasoundScanner: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UltrasoundResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const loadSyntheticSample = () => {
    fetch('/ultrasound_scan.png')
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'synthetic_ultrasound.png', { type: 'image/png' });
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setResult(null);
        setError(null);
      })
      .catch(() => {
        // Fallback placeholder blob
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#020617';
          ctx.fillRect(0, 0, 400, 300);
          ctx.fillStyle = '#38bdf8';
          ctx.font = '16px monospace';
          ctx.fillText('SYNTHETIC ULTRASOUND SCAN', 60, 150);
        }
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'synthetic_ultrasound.png', { type: 'image/png' });
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(blob));
            setResult(null);
            setError(null);
          }
        });
      });
  };

  const clearSelectedImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);

    try {
      const res = await analyzeUltrasound(imageFile);
      setResult(res);
    } catch (err: any) {
      console.warn('Ultrasound API call failed, falling back to simulated inference:', err);
      const mockRes = generateMockUltrasoundResult();
      setResult(mockRes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Waves className="w-3.5 h-3.5" />
              Ultrasound AI Model (HuggingFace Space)
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
              Ultrasonic Tissue & Lesion AI Diagnostic
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Automated echogenicity analysis, tissue acoustic impedance, and lesion classification via Gradio Client API (<code className="text-cyan-300 font-mono">ProximAditya/Ultrasound-Analysis</code>).
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Upload Area */}
        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center text-center space-y-4">
          {previewUrl ? (
            <div className="w-full max-w-sm space-y-3">
              <div className="relative aspect-square max-h-72 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-md mx-auto group">
                <img src={previewUrl} alt="Ultrasound scan preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-rose-600 text-rose-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-lg backdrop-blur-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Image</span>
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-medium text-white truncate max-w-[200px]">
                  {imageFile?.name}
                </span>
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="text-rose-400 hover:text-rose-300 font-semibold underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <FileImage className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Upload Ultrasound Image / Sonogram</p>
                <p className="text-xs text-slate-400 mt-0.5">Supports PNG, JPG, or DICOM/JPEG ultrasound scans.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-all shadow-sm border border-slate-700">
                  Choose Ultrasound Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={loadSyntheticSample}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Load Sample Sonogram Image
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            onClick={handleAnalyze}
            disabled={!imageFile || loading}
            className={`w-full py-4 rounded-xl font-display font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
              !imageFile || loading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Ultrasonic AI Analysis via Gradio Client...</span>
              </>
            ) : (
              <>
                <Waves className="w-5 h-5" />
                <span>Run Ultrasound AI Classification</span>
              </>
            )}
          </button>
        </div>

        {/* Diagnostic Output Results */}
        {result && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Ultrasound Diagnostic Inference</h3>
                  <span className="text-xs font-mono text-cyan-400">Endpoint: /predict_ultrasound</span>
                </div>
              </div>
            </div>

            {/* Render Output Components */}
            <div className="space-y-4 text-slate-200 text-sm">
              <div 
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs sm:text-sm overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: result.summaryHtml }}
              />

              {result.detailedHtml && (
                <div 
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: result.detailedHtml }}
                />
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-slate-500">Backbone Model:</span> <span className="text-white font-mono">{result.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">API Source:</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                  result.model.includes('Simulated') 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {result.model.includes('Simulated') ? '⚠️ Offline Simulation Fallback' : '⚡ Live HuggingFace Gradio Space'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
