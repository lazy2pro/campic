import React, { useState } from 'react';
import { Smartphone, Monitor, Battery, Wifi, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isMobileMode, setIsMobileMode] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-start relative text-slate-100 font-sans">
      {/* Top Floating View Toggle Control */}
      <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between z-50 text-xs text-slate-400 border-b border-white/5 bg-[#0a0b0d]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-campfire-500 animate-pulse shadow-glow-orange" />
          <span className="font-semibold text-slate-200 tracking-wide text-sm">Campic</span>
          <span className="bg-campfire-500/10 text-campfire-400 text-[10px] px-2 py-0.5 rounded-full border border-campfire-500/20 font-mono">iOS Edition</span>
        </div>

        <div className="flex items-center gap-1 bg-charcoal-800 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setIsMobileMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isMobileMode
                ? 'bg-campfire-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>아이폰 프레임</span>
          </button>
          <button
            onClick={() => setIsMobileMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              !isMobileMode
                ? 'bg-campfire-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>전체 화면</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex justify-center items-start py-2 sm:py-6 px-2 sm:px-4">
        {isMobileMode ? (
          /* iPhone 16 Pro Outer Frame */
          <div className="relative w-full max-w-[420px] h-[860px] bg-charcoal-900 rounded-[52px] border-[10px] border-[#22252a] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
            
            {/* iPhone Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <div className="w-3 h-3 rounded-full bg-[#0d1b2a] ring-1 ring-blue-900/50 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-400/80" />
              </div>
            </div>

            {/* iOS Status Bar */}
            <div className="w-full pt-3 px-7 pb-1 flex justify-between items-center z-40 bg-charcoal-950 text-slate-200 text-xs font-semibold select-none">
              <span>16:09</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <div className="flex items-center gap-0.5 border border-slate-400/60 rounded-sm px-1 py-0.2">
                  <span className="text-[9px]">100%</span>
                  <Battery className="w-3 h-3 fill-slate-200" />
                </div>
              </div>
            </div>

            {/* App Screen Content */}
            <div className="flex-1 w-full overflow-y-auto relative flex flex-col bg-charcoal-950">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="w-full py-2 bg-charcoal-950 flex justify-center items-center z-50">
              <div className="w-32 h-1 bg-slate-500/50 rounded-full" />
            </div>
          </div>
        ) : (
          /* Full Desktop View Container */
          <div className="w-full max-w-4xl bg-charcoal-950 rounded-3xl border border-white/10 shadow-2xl min-h-[820px] flex flex-col overflow-hidden">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
