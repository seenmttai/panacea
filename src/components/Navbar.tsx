import React, { useState } from 'react';
import { Activity, Menu, X, Sparkles } from 'lucide-react';
import { ApiStatusBadge } from './ApiStatusBadge';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'diagnostics', label: 'Live AI Diagnostics' },
    { id: 'contact', label: 'Clinical Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              PANACEA<span className="text-cyan-400">.AI</span>
            </span>
            <span className="block text-[10px] uppercase font-semibold tracking-widest text-slate-400 -mt-1">
              Unified Medical AI
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-600'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Status */}
        <div className="hidden lg:flex items-center gap-4">
          <ApiStatusBadge />
          <button
            onClick={() => onNavigate('diagnostics')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            Launch Scanner
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="py-2">
            <ApiStatusBadge />
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('diagnostics');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 text-base font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] mt-2"
          >
            <Sparkles className="w-5 h-5 text-slate-900" />
            Start Medical AI Scanner
          </button>
        </div>
      )}
    </header>
  );
};
