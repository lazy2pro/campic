import React from 'react';
import { CampingLog } from '../types/camping';
import { Award, Compass } from 'lucide-react';

interface CampingMapStatsProps {
  logs: CampingLog[];
}

export const CampingMapStats: React.FC<CampingMapStatsProps> = ({ logs }) => {
  const totalTrips = logs.length;
  const totalNights = logs.reduce((acc, log) => {
    const match = log.nights.match(/(\d+)박/);
    return acc + (match ? parseInt(match[1]) : 1);
  }, 0);

  const maxFireLog = Math.max(...logs.map((l) => l.fireLogCount || 0), 0);

  const categoryCounts = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 flex flex-col gap-5 text-slate-100">
      
      {/* Top Banner Stats Card */}
      <div className="relative bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-campfire-500/30 p-5 rounded-3xl shadow-glow-orange overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-campfire-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-campfire-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>2026 캠핑 스태티스틱</span>
          </div>

          <h2 className="text-2xl font-black text-white">
            올해 총 <span className="text-campfire-400">{totalNights}박 {totalNights + totalTrips}일</span> 달성! 🎉
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            총 {totalTrips}번의 캠핑과 {maxFireLog}번의 불멍을 사진 로그로 기록했습니다.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/10 text-center">
            <div className="bg-charcoal-950/60 p-2.5 rounded-2xl border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">총 출정에 간 수</span>
              <span className="text-base font-bold text-slate-100">{totalTrips}회</span>
            </div>
            <div className="bg-charcoal-950/60 p-2.5 rounded-2xl border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">누적 불멍 횟수</span>
              <span className="text-base font-bold text-campfire-400">🔥 {maxFireLog}회</span>
            </div>
            <div className="bg-charcoal-950/60 p-2.5 rounded-2xl border border-white/5">
              <span className="text-[10px] text-slate-400 block font-mono">평균 만족도</span>
              <span className="text-base font-bold text-amber-400">★ 4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campsite Map Pin Visualization */}
      <div className="bg-charcoal-900 border border-white/10 p-4 rounded-3xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-campfire-400" />
            <h3 className="font-bold text-sm text-slate-100">전국 캠핑지도 핀 뷰어</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">{logs.length}개 캠핑장</span>
        </div>

        {/* Visual Map Area */}
        <div className="relative w-full h-56 bg-forest-900 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-[radial-gradient(#1e3a2b_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Map Topographic Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />

          {/* Korea Map Pins Mockup */}
          {logs.map((log, idx) => {
            const posX = 30 + (idx * 25) % 55;
            const posY = 25 + (idx * 28) % 50;
            return (
              <div
                key={log.id}
                style={{ top: `${posY}%`, left: `${posX}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-campfire-500 border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-glow-orange group-hover:scale-110 transition-all">
                    🔥
                  </div>
                  <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-semibold text-slate-200 mt-1 whitespace-nowrap border border-white/10 shadow-md">
                    {log.campsite}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Camping Style Breakdown */}
      <div className="bg-charcoal-900 border border-white/10 p-4 rounded-3xl">
        <h3 className="font-bold text-sm text-slate-100 mb-3">선호하는 캠핑 스타일</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div key={cat} className="bg-charcoal-950 p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <span className="font-medium text-slate-300">{cat}</span>
              <span className="font-bold text-campfire-400 bg-campfire-500/10 px-2 py-0.5 rounded-lg border border-campfire-500/20">
                {count}회
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
