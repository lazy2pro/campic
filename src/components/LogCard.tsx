import React from 'react';
import { MapPin, Calendar, Flame, Trash2 } from 'lucide-react';
import { CampingLog } from '../types/camping';

export interface LogCardProps {
  log: CampingLog;
  onClick?: () => void;
  onSelect?: (log: CampingLog) => void;
  onDelete?: (id: string) => void;
}

export const LogCard: React.FC<LogCardProps> = ({ log, onClick, onSelect, onDelete }) => {
  const handleClick = () => {
    if (onClick) onClick();
    if (onSelect) onSelect(log);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 상세 모달 열림 방지
    if (window.confirm('이 캠핑 기록을 삭제하시겠습니까?') && onDelete) {
      onDelete(log.id);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[#18181B] border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-orange-500/50 transition-all cursor-pointer active:scale-[0.98] relative group"
    >
      <div className="relative h-48 w-full bg-gray-900">
        <img 
          src={log.images && log.images.length > 0 ? log.images[0] : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"} 
          alt={log.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
            {log.campingType || log.type || '캠핑'}
          </span>
          <span className="bg-orange-500/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {log.season}
          </span>
        </div>

        {/* 삭제 버튼 추가 */}
        {onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-500/80 backdrop-blur-md text-white rounded-full transition-all border border-white/10"
            title="기록 삭제"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-base text-white tracking-tight line-clamp-1">{log.title}</h3>
        
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-orange-400" />
            <span className="line-clamp-1">{log.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={13} className="text-gray-500" />
            <span>{log.date}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-gray-800/60 text-xs">
          <span className="text-gray-400">{log.weather?.condition} ({log.weather?.temp}°C)</span>
          <div className="flex items-center gap-1 text-orange-400 font-semibold">
            <Flame size={14} />
            <span>{log.fireCount}회차 불멍</span>
          </div>
        </div>
      </div>
    </div>
  );
};
