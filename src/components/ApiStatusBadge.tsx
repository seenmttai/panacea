import React, { useEffect, useState } from 'react';
import { checkApiHealth } from '../services/api';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';

export const ApiStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const isOnline = await checkApiHealth();
      if (mounted) {
        setStatus(isOnline ? 'online' : 'offline');
      }
    };
    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/80 backdrop-blur-md shadow-sm transition-all"
         style={{ borderColor: status === 'online' ? '#10B981' : status === 'offline' ? '#F59E0B' : '#E2E8F0' }}>
      {status === 'checking' && (
        <>
          <Activity className="w-3.5 h-3.5 text-slate-500 animate-spin" />
          <span className="text-slate-600">Connecting to Unified AI API...</span>
        </>
      )}
      {status === 'online' && (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-slate-800 font-semibold">Live AI API Connected</span>
          <span className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </>
      )}
      {status === 'offline' && (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-slate-700 font-medium">API Offline (Demo Mode Ready)</span>
        </>
      )}
    </div>
  );
};
