import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Clinical Integration',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid professional email is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 border border-slate-800 animate-fade-in shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-2xl font-bold font-display text-white">Inquiry Transmitted</h3>
          <p className="text-sm text-slate-300">
            Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our clinical engineering team will review your inquiry regarding <span className="text-cyan-400 font-mono">{formData.inquiryType}</span> within 24 hours.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', organization: '', inquiryType: 'Clinical Integration', message: '' });
          }}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Partnership & Integration
        </div>
        <h3 className="text-2xl font-bold font-display text-slate-900">
          Connect with Medical AI Engineers
        </h3>
        <p className="text-xs text-slate-500">
          Schedule API sandbox access, enterprise hospital deployment, or trial partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Dr. Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
              errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
            }`}
          />
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Professional Email *
          </label>
          <input
            type="email"
            placeholder="s.jenkins@hospital.org"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
              errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
            }`}
          />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Institution / Health Network
          </label>
          <input
            type="text"
            placeholder="Mayo Clinic / Johns Hopkins"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Inquiry Category
          </label>
          <select
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900 bg-white"
          >
            <option value="Clinical Integration">Clinical Integration</option>
            <option value="API Enterprise Key">API Enterprise Key</option>
            <option value="Research Collaboration">Research Collaboration</option>
            <option value="Regulatory & HIPAA">Regulatory & HIPAA Compliance</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Project Scope / Medical Requirements *
        </label>
        <textarea
          rows={4}
          placeholder="Describe your target deployment environment, patient volume, or vision model needs..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
            errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
          }`}
        />
        {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
      >
        {submitting ? (
          <span>Encrypting & Sending Inquiry...</span>
        ) : (
          <>
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Transmit Clinical Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
};
