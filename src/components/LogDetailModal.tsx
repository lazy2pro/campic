import React, { useState } from 'react';
import { X, MapPin, Calendar, Flame, Sparkles, Tent } from 'lucide-react';
import { CampingLog } from '../types/camping';

export interface LogDetailModalProps {
  log: CampingLog;
  onClose: () => void;
  onOpenStampStudio?: () => void;
}

export const LogDetailModal: React.FC<LogDetailModalProps> = ({ log, onClose, onOpenStampStudio }) => {
  const images = log.images && log.images.length > 0 
    ? log.images 
    : ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const campingType = log.campingType || log.type || '오토캠핑';
  const locationName = log.location || '캠핑장';
  const gearList = log.gearUsed || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#121212] text-white w-full max-w-lg rounded-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-800 shadow-2xl">
        
        {/* Header Image Area */}
        <div className="relative h-64 bg-gray-900 w-full shrink-0">
          <img 
            src={images[activePhotoIdx]} 
            alt={log.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/50" />
          
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
          >
            <X size={18} />
          </button>

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {log.season}
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
              {campingType}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">{log.title}</h2>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-gray-900/50 border-b border-gray-800 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  activePhotoIdx === idx ? 'border-orange-500' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">캠핑장</p>
                <p className="text-xs font-semibold text-gray-200">{locationName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">날짜 / 숙박</p>
                <p className="text-xs font-semibold text-gray-200">{log.date} ({log.duration})</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-500 font-medium">불멍 회차</p>
                <p className="text-xs font-semibold text-gray-200">{log.fireCount}회차 불멍</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">☀️</span>
              <div>
                <p className="text-[10px] text-gray-500 font-medium">날씨 & 기온</p>
                <p className="text-xs font-semibold text-gray-200">
                  {log.weather?.condition || '맑음'} ({log.weather?.temp ?? 22}°C)
                </p>
              </div>
            </div>
          </div>

          {/* Story / Diary */}
          {log.content && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">캠핑 일기 & 추억</h3>
              <p className="bg-gray-900/40 p-3.5 rounded-xl border border-gray-800/60 text-gray-300 leading-relaxed text-xs whitespace-pre-wrap">
                {log.content}
              </p>
            </div>
          )}

          {/* Gear Used */}
          {gearList.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">사용한 장비</h3>
              <div className="flex flex-wrap gap-1.5">
                {gearList.map((gear, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-lg border border-gray-700"
                  >
                    <Tent size={12} className="text-orange-400" />
                    {gear}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {onOpenStampStudio && (
            <button
              type="button"
              onClick={onOpenStampStudio}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
            >
              <Sparkles size={16} />
              <span>포토 스탬프 꾸미러 가기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
