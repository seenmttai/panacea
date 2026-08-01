import React, { useState } from 'react';
import { Terminal, Copy, Check, Cpu, Code } from 'lucide-react';
import { BASE_API_URL, NGROK_HEADER_KEY, NGROK_HEADER_VAL } from '../services/api';

export const Technology: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const curlAnemiaSnippet = `curl -X POST "${BASE_API_URL}/predict_anemia" \\
  -H "${NGROK_HEADER_KEY}: ${NGROK_HEADER_VAL}" \\
  -F "images=@frame0.jpg" \\
  -F "images=@frame1.jpg" \\
  -F "images=@frame2.jpg" \\
  -F "images=@frame3.jpg" \\
  -F "images=@frame4.jpg" \\
  -F "sex=1.0"`;

  const curlDrSnippet = `curl -X POST "${BASE_API_URL}/predict_dr" \\
  -H "${NGROK_HEADER_KEY}: ${NGROK_HEADER_VAL}" \\
  -F "image=@retina_scan.png"`;

  const jsAnemiaSnippet = `async function analyzeAnemia(videoFile, userSex) {
  const imageBlobs = await extract5FramesFromVideo(videoFile);
  const formData = new FormData();
  
  imageBlobs.forEach((blob, i) => {
    formData.append('images', blob, \`frame_\${i}.jpg\`);
  });
  formData.append('sex', userSex === 'female' ? "1.0" : "0.0");

  const res = await fetch("${BASE_API_URL}/predict_anemia", {
    method: "POST",
    headers: { "${NGROK_HEADER_KEY}": "${NGROK_HEADER_VAL}" },
    body: formData
  });
  return await res.json();
}`;

  const jsGastroSnippet = `import { Client } from "@gradio/client";

// Connect to GastroVision Gradio Space (maxiu-uzumaki/gastroVision)
const client = await Client.connect("maxiu-uzumaki/gastroVision", {
  hf_token: process.env.HF_TOKEN // Optional Hugging Face Token secret
});

const result = await client.predict("/predict", {
  image: endoscopicImageBlob
});

console.log("GastroVision Pathology Result:", result.data);`;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Architectural Blueprint</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
          Unified Medical AI Specifications
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive documentation for integration with our non-invasive computer vision inference backbones & GastroVision Gradio client.
        </p>
      </div>

      {/* Cloudflare Pages Hosting Banner */}
      <div className="p-8 rounded-3xl dark-glass-panel space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Hosting on Cloudflare Pages (Step-by-Step Guide)
              </h3>
              <p className="text-xs text-slate-400">
                Panacea is 100% static React + Vite code hostable for free on Cloudflare Pages.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            Zero Server Setup
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-cyan-400 font-display">
              Option 1: Cloudflare Dashboard (GitHub Integration)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-slate-300">
              <li>Push your code repo to GitHub (e.g. branch <code className="text-amber-300 font-mono">master</code>).</li>
              <li>In Cloudflare Dashboard → <strong>Workers & Pages</strong> → <strong>Create Application</strong> → <strong>Pages</strong> → <strong>Connect to Git</strong>.</li>
              <li>Select your <code className="text-amber-300 font-mono">panacea</code> repository.</li>
              <li>For <strong>Framework preset</strong>: Select <strong>None</strong> (or VitePress/React if Vite is not listed).</li>
              <li>Set <strong>Build command</strong>: <code className="text-amber-300 font-mono">npm run build</code></li>
              <li>Set <strong>Build output directory</strong>: <code className="text-amber-300 font-mono">dist</code></li>
              <li>Add Environment Secret (optional): <code className="text-amber-300 font-mono">VITE_HF_TOKEN</code> / <code className="text-amber-300 font-mono">HF_TOKEN</code></li>
              <li>Click <strong>Save and Deploy</strong>.</li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-cyan-400 font-display">
              Option 2: Direct Wrangler CLI Deployment
            </h4>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] space-y-1 text-slate-300 border border-slate-800">
              <p><span className="text-slate-500"># 1. Install Wrangler</span></p>
              <p className="text-emerald-400">npm install -g wrangler</p>
              <p><span className="text-slate-500"># 2. Build production assets</span></p>
              <p className="text-emerald-400">npm run build</p>
              <p><span className="text-slate-500"># 3. Deploy dist folder</span></p>
              <p className="text-cyan-400">npx wrangler pages deploy dist --project-name=panacea</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippets Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold font-display text-white">
          Live Endpoint Playground & Examples
        </h2>

        {/* Snippet 1: GastroVision Gradio JS */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>GastroVision Gradio Client JS Integration (maxiu-uzumaki/gastroVision)</span>
            </div>
            <button
              onClick={() => copyToClipboard(jsGastroSnippet, 4)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === 4 ? 'Copied' : 'Copy JS Code'}
            </button>
          </div>
          <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            {jsGastroSnippet}
          </pre>
        </div>

        {/* Snippet 2: Anemia cURL */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Anemia Endpoint cURL Request (/predict_anemia)</span>
            </div>
            <button
              onClick={() => copyToClipboard(curlAnemiaSnippet, 1)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === 1 ? 'Copied' : 'Copy cURL'}
            </button>
          </div>
          <pre className="p-5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
            {curlAnemiaSnippet}
          </pre>
        </div>

        {/* Snippet 3: DR cURL */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Diabetic Retinopathy cURL Request (/predict_dr)</span>
            </div>
            <button
              onClick={() => copyToClipboard(curlDrSnippet, 2)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === 2 ? 'Copied' : 'Copy cURL'}
            </button>
          </div>
          <pre className="p-5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
            {curlDrSnippet}
          </pre>
        </div>

        {/* Snippet 4: JS Anemia Fetch */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Anemia 5-Frame Extractor & Fetch Client Function</span>
            </div>
            <button
              onClick={() => copyToClipboard(jsAnemiaSnippet, 3)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === 3 ? 'Copied' : 'Copy JS Code'}
            </button>
          </div>
          <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            {jsAnemiaSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
