import React, { useState } from 'react';
import { X, Download, Flame, MapPin, Calendar, Sun, Sparkles, ChevronLeft } from 'lucide-react';
import { CampingLog } from '../types/camping';

export interface PhotoStampEditorProps {
  log?: CampingLog;
  onClose?: () => void;
}

export const PhotoStampEditor: React.FC<PhotoStampEditorProps> = ({ log, onClose }) => {
  // 로그가 없거나 사진이 없을 경우 사용할 기본 썸네일
  const defaultImage = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80";
  
  const photoList = log?.images && log.images.length > 0 ? log.images : [defaultImage];
  const [selectedPhoto, setSelectedPhoto] = useState<string>(photoList[0]);
  const [stampStyle, setStampStyle] = useState<'minimal' | 'badge' | 'journal' | 'ticket'>('minimal');

  const locationName = log?.location || '영월 잣나무 캠핑장';
  const fireCountVal = log?.fireCount ?? 1;
  const campTypeVal = log?.campingType || log?.type || '오토캠핑';
  const durationVal = log?.duration || '1박 2일';
  const contentVal = log?.content || '즐거운 캠핑의 추억';
  const dateVal = log?.date || '2026. 08. 13.';
  const weatherVal = log?.weather?.condition ? `${log.weather.condition} (${log.weather.temp}°C)` : '맑음 (22°C)';

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] text-white p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          {onClose && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <ChevronLeft size={20} />
            </button>
          )}
          <Sparkles className="text-orange-500" size={18} />
          <h2 className="font-bold text-base">포토 스탬프 스튜디오</h2>
        </div>
        <button 
          onClick={() => alert('스탬프가 적용된 사진이 저장되었습니다!')} 
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
        >
          <Download size={14} />
          저장
        </button>
      </div>

      {/* Main Image Viewport with Stamp Overlay */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl flex items-center justify-center">
        <img 
          src={selectedPhoto} 
          alt="Camping Memory" 
          className="w-full h-full object-cover" 
        />

        {/* STAMP OVERLAYS */}
        {stampStyle === 'minimal' && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-sm text-white">{locationName}</p>
              <p className="text-gray-300 text-[11px]">{dateVal} • {weatherVal}</p>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
              <Flame size={14} />
              <span>#{fireCountVal} 불멍</span>
            </div>
          </div>
        )}

        {stampStyle === 'badge' && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-2xl shadow-xl text-center border border-white/20">
            <Flame size={22} className="mx-auto text-white mb-1" />
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-100">{campTypeVal}</div>
            <div className="text-xs font-black text-white">{locationName}</div>
            <div className="text-[10px] text-amber-200 mt-0.5">{durationVal}</div>
          </div>
        )}

        {stampStyle === 'journal' && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 p-3.5 rounded-xl shadow-2xl space-y-1">
            <div className="flex justify-between items-center text-[11px] text-gray-500 font-bold border-b border-gray-200 pb-1">
              <span>{dateVal}</span>
              <span>{locationName}</span>
            </div>
            <p className="text-xs font-medium text-gray-800 line-clamp-2 pt-0.5">"{contentVal}"</p>
          </div>
        )}

        {stampStyle === 'ticket' && (
          <div className="absolute bottom-4 left-4 bg-gray-950/80 backdrop-blur-lg border border-gray-800 p-3 rounded-xl space-y-1 text-xs">
            <div className="text-orange-400 font-bold text-[10px] tracking-wider uppercase">CAMPING PASS</div>
            <div className="font-extrabold text-sm text-white">{locationName}</div>
            <div className="text-[11px] text-gray-400">{dateVal} ({durationVal})</div>
          </div>
        )}
      </div>

      {/* Style Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400">스탬프 스타일 선택</label>
        <div className="grid grid-cols-4 gap-2">
          {(['minimal', 'badge', 'journal', 'ticket'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setStampStyle(style)}
              className={`py-2 text-xs font-medium rounded-xl border transition-all capitalize ${
                stampStyle === style 
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-bold' 
                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Selector Thumbnails */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400">원본 사진 선택</label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photoList.map((imgUrl: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedPhoto(imgUrl)}
              className={`relative w-16 h-16 min-w-[4rem] rounded-xl overflow-hidden border-2 transition-all ${
                selectedPhoto === imgUrl ? 'border-orange-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
