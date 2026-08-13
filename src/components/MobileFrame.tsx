import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0a0b0d] text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden antialiased">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col relative min-h-screen bg-charcoal-950 shadow-2xl border-x border-white/5">
        {children}
      </div>
    </div>
  );
};
