import React from 'react';
import { MapPin, Compass, Flame, TrendingUp } from 'lucide-react';
import { CampingLog } from '../types/camping';

interface CampingMapStatsProps {
  logs: CampingLog[];
}

export const CampingMapStats: React.FC<CampingMapStatsProps> = ({ logs }) => {
  const totalVisits = logs.length;
  
  // duration 필드에서 박 수 추출 (기본 1박)
  const totalNights = logs.reduce((acc, log) => {
    const match = log.duration?.match(/(\d+)박/);
    return acc + (match ? parseInt(match[1], 10) : 1);
  }, 0);

  // 총 불멍 회차
  const totalFireCount = logs.reduce((acc, log) => acc + (log.fireCount || 0), 0);

  // 캠핑 스타일 분포
  const typeDistribution = logs.reduce((acc: Record<string, number>, log) => {
    const typeKey = log.campingType || log.type || '오토캠핑';
    acc[typeKey] = (acc[typeKey] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-5 text-white">
      {/* 통계 요약 카드리스트 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#18181B] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 text-orange-500 rounded-xl">
            <Compass size={22} />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-medium">총 캠핑 횟수</p>
            <p className="text-lg font-bold text-white">{totalVisits}회 <span className="text-xs text-orange-400">({totalNights}박)</span></p>
          </div>
        </div>

        <div className="bg-[#18181B] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <Flame size={22} />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-medium">누적 불멍 회차</p>
            <p className="text-lg font-bold text-white">{totalFireCount}회</p>
          </div>
        </div>
      </div>

      {/* 캠핑 스타일 분포 */}
      <div className="bg-[#18181B] border border-gray-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <TrendingUp size={16} className="text-orange-400" />
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">선호 캠핑 스타일</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(typeDistribution).map(([type, count]) => {
            const percentage = Math.round((count / (totalVisits || 1)) * 100);
            return (
              <div key={type} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">{type}</span>
                  <span className="text-orange-400 font-bold">{count}회 ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 최근 방문한 캠핑지 목록 */}
      <div className="bg-[#18181B] border border-gray-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <MapPin size={16} className="text-orange-400" />
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">방문한 캠핑장</h3>
        </div>
        <div className="space-y-2.5">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-2.5 bg-gray-900/60 rounded-xl border border-gray-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="font-semibold text-gray-200">{log.location}</span>
              </div>
              <span className="text-gray-400 text-[11px]">{log.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
