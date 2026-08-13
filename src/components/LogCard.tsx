import React from 'react';
import { CampingLog } from '../types/camping';
import { Flame, MapPin, Calendar, Sparkles, Star, Layers } from 'lucide-react';

interface LogCardProps {
  log: CampingLog;
  onOpenDetail: (log: CampingLog) => void;
  onOpenStampStudio: (log: CampingLog) => void;
}

export const LogCard: React.FC<LogCardProps> = ({
  log,
  onOpenDetail,
  onOpenStampStudio
}) => {
  const displayPhoto = log.stampedPhotos?.[0] || log.originalPhotos[0];

  return (
    <div className="bg-charcoal-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg group hover:border-white/20 transition-all duration-300 flex flex-col">
      {/* Image Banner Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-950 cursor-pointer" onClick={() => onOpenDetail(log)}>
        <img
          src={displayPhoto}
          alt={log.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-black/30" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-charcoal-950/80 backdrop-blur-md border border-white/15 text-campfire-400 text-[11px] font-bold px-2.5 py-1 rounded-full">
            {log.category}
          </span>
          <span className="bg-white/15 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full">
            {log.nights}
          </span>
        </div>

        {/* Stamp Studio Quick Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenStampStudio(log);
          }}
          className="absolute top-3 right-3 bg-campfire-500/90 hover:bg-campfire-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-glow-orange flex items-center gap-1 backdrop-blur-md transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>스탬프</span>
        </button>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-1 text-campfire-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>{log.fireLogCount ? `${log.fireLogCount}번째 불멍` : log.campsite}</span>
              <span className="text-slate-400 text-[10px]">•</span>
              <span className="text-slate-200 text-[11px]">{log.weather.temp}°C {log.weather.condition}</span>
            </div>
            <h3 className="font-bold text-sm sm:text-base line-clamp-1 text-white mt-0.5">
              {log.campsite}
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px] font-mono text-slate-300 shrink-0">
            <Layers className="w-3 h-3 text-campfire-400" />
            <span>사진 {log.originalPhotos.length}장</span>
          </div>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{log.date} ({log.season})</span>
            </div>
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="ml-0.5 font-bold text-xs">{log.rating}.0</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {log.story}
          </p>
        </div>

        {/* Gear Used Tags & Location */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-1 text-slate-400 truncate">
            <MapPin className="w-3 h-3 text-campfire-500 shrink-0" />
            <span className="truncate">{log.location}</span>
          </div>

          {log.gearUsed.length > 0 && (
            <span className="bg-charcoal-800 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-mono shrink-0">
              🏷️ {log.gearUsed[0]} {log.gearUsed.length > 1 ? `외 ${log.gearUsed.length - 1}개` : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
