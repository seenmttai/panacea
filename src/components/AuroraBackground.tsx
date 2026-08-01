import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      {/* Aurora Glow 1 - Cyan Top Left */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse" />
      
      {/* Aurora Glow 2 - Emerald Middle Right */}
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px]" />
      
      {/* Aurora Glow 3 - Deep Blue/Indigo Bottom */}
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[160px]" />

      {/* Grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
