import React, { useState } from 'react';
import { CampingLog } from '../types/camping';
import { X, Sparkles, Download, Flame, MapPin, Star, ChevronLeft, ChevronRight, ShieldCheck, Image as ImageIcon } from 'lucide-react';

interface LogDetailModalProps {
  log: CampingLog;
  onClose: () => void;
  onOpenStampStudio: (log: CampingLog) => void;
}

export const LogDetailModal: React.FC<LogDetailModalProps> = ({
  log,
  onClose,
  onOpenStampStudio
}) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const activePhoto = showOriginal
    ? log.originalPhotos[photoIndex] || log.originalPhotos[0]
    : log.stampedPhotos?.[photoIndex] || log.originalPhotos[photoIndex] || log.originalPhotos[0];

  const handleDownloadPhoto = (photoUrl: string, isOrig: boolean) => {
    const link = document.createElement('a');
    link.download = isOrig ? `CampLog_Original_${log.campsite}.jpg` : `CampLog_Stamped_${log.campsite}.jpg`;
    link.href = photoUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-2xl bg-charcoal-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-slate-100">
        
        {/* Header Bar */}
        <div className="p-4 bg-charcoal-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-campfire-500/20 text-campfire-400 font-bold text-xs px-2.5 py-1 rounded-full border border-campfire-500/30">
              {log.category}
            </span>
            <span className="text-slate-400 text-xs font-mono">{log.date} ({log.season})</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-5">
          
          {/* Photo Carousel Viewer */}
          <div className="relative w-full aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
            <img
              src={activePhoto}
              alt={log.title}
              className="w-full h-full object-cover"
            />

            {/* Photo Toggle: Original vs Stamped */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/15 flex items-center gap-1">
              <button
                onClick={() => setShowOriginal(false)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  !showOriginal ? 'bg-campfire-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                스탬프 뷰
              </button>
              <button
                onClick={() => setShowOriginal(true)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  showOriginal ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                원본 뷰
              </button>
            </div>

            {/* Navigation Arrows */}
            {log.originalPhotos.length > 1 && (
              <>
                <button
                  onClick={() => setPhotoIndex((prev) => (prev > 0 ? prev - 1 : log.originalPhotos.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPhotoIndex((prev) => (prev < log.originalPhotos.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Stamp Studio Button Overlay */}
            <button
              onClick={() => onOpenStampStudio(log)}
              className="absolute bottom-3 right-3 bg-campfire-500 hover:bg-campfire-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-glow-orange flex items-center gap-1.5 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>사진 스탬프 꾸미기 & 저장</span>
            </button>
          </div>

          {/* Quick Download Buttons: Original + Stamped */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDownloadPhoto(log.originalPhotos[photoIndex] || log.originalPhotos[0], true)}
              className="py-2.5 px-3 bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 rounded-xl text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>📷 원본 사진 다운로드</span>
            </button>
            <button
              onClick={() => handleDownloadPhoto(log.stampedPhotos?.[photoIndex] || log.originalPhotos[photoIndex], false)}
              className="py-2.5 px-3 bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 rounded-xl text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-campfire-400" />
              <span>✨ 스탬프 사진 다운로드</span>
            </button>
          </div>

          {/* Title & Location details */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-100">{log.title}</h2>
              <div className="flex items-center text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span>{log.rating}.0</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-campfire-500" />
                <span>{log.campsite} ({log.location})</span>
              </div>
              {log.altitude && (
                <span className="bg-charcoal-800 px-2 py-0.5 rounded text-[11px] font-mono border border-white/5">
                  고도 {log.altitude}m
                </span>
              )}
            </div>
          </div>

          {/* Weather & Fire Badges */}
          <div className="grid grid-cols-2 gap-3 bg-charcoal-950 p-3.5 rounded-2xl border border-white/5 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-campfire-500/20 text-campfire-400 flex items-center justify-center">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">불멍 기록</span>
                <span className="font-bold text-campfire-400 text-sm">{log.fireLogCount ? `${log.fireLogCount}번째 불멍` : '자연 힐링'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <span className="text-base font-bold">🌡️</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">날씨 / 기온</span>
                <span className="font-bold text-slate-200 text-sm">{log.weather.temp}°C ({log.weather.condition})</span>
              </div>
            </div>
          </div>

          {/* Story Notes */}
          <div>
            <h3 className="font-semibold text-xs text-slate-300 mb-1.5 uppercase font-mono">Camping Story</h3>
            <p className="text-xs text-slate-200 leading-relaxed bg-charcoal-950 p-3.5 rounded-2xl border border-white/5 whitespace-pre-line">
              {log.story}
            </p>
          </div>

          {/* Gear Used List */}
          {log.gearUsed.length > 0 && (
            <div>
              <h3 className="font-semibold text-xs text-slate-300 mb-1.5 uppercase font-mono">Tagging Gear</h3>
              <div className="flex flex-wrap gap-1.5">
                {log.gearUsed.map((gear, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-charcoal-800 border border-white/10 text-slate-300 text-xs font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-campfire-400" />
                    <span>{gear}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
