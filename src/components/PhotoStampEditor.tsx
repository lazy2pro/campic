import React, { useState } from 'react';
import { CampingLog, PhotoStampConfig, StampStyle, PhotoFilter } from '../types/camping';
import { X, Download, Share2, Sparkles, Flame, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface PhotoStampEditorProps {
  log: CampingLog;
  onClose: () => void;
  onSaveStampedPhoto?: (stampedUrl: string) => void;
}

export const PhotoStampEditor: React.FC<PhotoStampEditorProps> = ({
  log,
  onClose,
  onSaveStampedPhoto
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [config, setConfig] = useState<PhotoStampConfig>({
    style: 'firelight',
    showWeather: true,
    showDate: true,
    showLocation: true,
    showFireCount: true,
    showGearTags: false,
    filter: 'firelight',
    customText: log.campsite
  });

  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentPhoto = log.originalPhotos[selectedPhotoIndex] || log.originalPhotos[0];

  // Helper to trigger canvas download for a specific photo mode
  const exportPhoto = async (mode: 'stamped' | 'original' | 'both') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentPhoto;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = img.width || 1200;
    canvas.height = img.height || 900;

    // 1. Draw base photo
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Apply CSS-like canvas filters if needed for stamped version
    if (mode === 'stamped' || mode === 'both') {
      if (config.filter === 'firelight') {
        ctx.fillStyle = 'rgba(243, 113, 33, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (config.filter === 'pine') {
        ctx.fillStyle = 'rgba(20, 37, 29, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (config.filter === 'starlight') {
        ctx.fillStyle = 'rgba(10, 15, 30, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw Overlay Stamp Badges based on config.style
      const pad = canvas.width * 0.04;
      const fontSize = Math.max(16, Math.floor(canvas.width * 0.028));

      ctx.save();

      if (config.style === 'firelight' || config.style === 'badge') {
        // Firelight Badge Box at bottom left
        const badgeWidth = canvas.width * 0.45;
        const badgeHeight = canvas.height * 0.18;
        const bx = pad;
        const by = canvas.height - pad - badgeHeight;

        // Glass overlay box
        ctx.fillStyle = 'rgba(16, 18, 20, 0.82)';
        ctx.strokeStyle = 'rgba(243, 113, 33, 0.6)';
        ctx.lineWidth = Math.max(2, canvas.width * 0.003);

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bx, by, badgeWidth, badgeHeight, 16);
        } else {
          ctx.rect(bx, by, badgeWidth, badgeHeight);
        }
        ctx.fill();
        ctx.stroke();

        // Badge Text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fontSize * 1.1}px sans-serif`;
        ctx.fillText(log.campsite, bx + pad * 0.5, by + fontSize * 1.4);

        ctx.fillStyle = '#f37121';
        ctx.font = `semibold ${fontSize * 0.9}px sans-serif`;
        const fireText = log.fireLogCount ? `🔥 ${log.fireLogCount}번째 불멍` : `⛺ ${log.category}`;
        ctx.fillText(`${fireText}  |  ${log.weather.temp}°C ${log.weather.condition}`, bx + pad * 0.5, by + fontSize * 2.8);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `${fontSize * 0.8}px monospace`;
        ctx.fillText(`DATE: ${log.date} • ${log.nights}`, bx + pad * 0.5, by + fontSize * 4.0);
      } else if (config.style === 'minimal') {
        // Minimal watermark line at bottom
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - pad * 2, canvas.width, pad * 2);

        ctx.fillStyle = '#ffffff';
        ctx.font = `500 ${fontSize}px sans-serif`;
        ctx.fillText(`📍 ${log.campsite}  •  🗓️ ${log.date}  •  🌡️ ${log.weather.temp}°C (${log.weather.condition})`, pad, canvas.height - pad * 0.7);
      }

      ctx.restore();
    }

    const stampedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

    // Save to iPhone Photos / Download
    if (mode === 'stamped' || mode === 'both') {
      const link = document.createElement('a');
      link.download = `CampLog_Stamped_${log.campsite}_${log.date}.jpg`;
      link.href = stampedDataUrl;
      link.click();

      if (onSaveStampedPhoto) {
        onSaveStampedPhoto(stampedDataUrl);
      }
    }

    if (mode === 'original' || mode === 'both') {
      // Download original photo
      setTimeout(() => {
        const linkOrig = document.createElement('a');
        linkOrig.download = `CampLog_Original_${log.campsite}_${log.date}.jpg`;
        linkOrig.href = currentPhoto;
        linkOrig.click();
      }, mode === 'both' ? 400 : 0);
    }

    setDownloadSuccess(
      mode === 'both'
        ? '📸 원본 + 스탬프 사진 2장이 아이폰 사진첩(다운로드)에 저장되었습니다!'
        : mode === 'original'
        ? '🖼️ 원본 사진이 저장되었습니다.'
        : '✨ 스탬프 오버레이 사진이 저장되었습니다.'
    );

    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `[캠핑 로그] ${log.title}`,
          text: `${log.campsite}에서 남긴 캠핑 기록 - ${log.story}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled or not supported', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setDownloadSuccess('링크가 클립보드에 복사되었습니다!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between overflow-y-auto p-4 sm:p-6 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-campfire-500/20 text-campfire-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-100">캠핑 사진 스탬프 스튜디오</h2>
            <p className="text-xs text-slate-400">아이폰 사진첩 저장 & 감성 레이아웃 오버레이</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 my-4 flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Live Canvas Preview Card */}
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-charcoal-900 shadow-2xl group flex justify-center items-center">
          <img
            src={currentPhoto}
            alt="Camping memory"
            className={`w-full h-full object-cover transition-all ${
              config.filter === 'firelight'
                ? 'sepia-[0.25] contrast-[1.05] brightness-[0.95]'
                : config.filter === 'pine'
                ? 'hue-rotate-15 contrast-110 saturate-110'
                : config.filter === 'starlight'
                ? 'brightness-90 contrast-125 saturate-90'
                : config.filter === 'vintage'
                ? 'sepia-[0.35] brightness-95'
                : ''
            }`}
          />

          {/* Stamp Preview Overlay */}
          {config.style === 'firelight' && (
            <div className="absolute bottom-4 left-4 right-4 bg-charcoal-950/85 backdrop-blur-md border border-campfire-500/40 p-3.5 rounded-2xl shadow-glow-orange flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-campfire-400 font-bold text-sm">
                  <Flame className="w-4 h-4 text-campfire-500 animate-pulse" />
                  <span>{log.fireLogCount ? `${log.fireLogCount}번째 불멍` : log.category}</span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-300 text-xs">{log.weather.temp}°C {log.weather.condition}</span>
                </div>
                <div className="font-semibold text-slate-100 text-base mt-0.5">{log.campsite}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  {log.date} ({log.season}) • {log.location}
                </div>
              </div>
              <div className="bg-campfire-500/10 border border-campfire-500/30 p-2 rounded-xl text-center">
                <span className="block text-[10px] text-campfire-400 font-semibold uppercase">Outdoor Badge</span>
                <span className="text-sm font-bold text-white">{log.nights}</span>
              </div>
            </div>
          )}

          {config.style === 'badge' && (
            <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center shadow-lg font-mono">
              <div className="w-8 h-8 mx-auto rounded-full bg-campfire-500 flex items-center justify-center text-white font-bold text-xs mb-1">
                CAMP
              </div>
              <div className="text-xs font-bold text-amber-400">{log.campsite}</div>
              <div className="text-[10px] text-slate-300">{log.date}</div>
              <div className="text-[9px] text-slate-400 mt-1">ALT {log.altitude || 450}m</div>
            </div>
          )}

          {config.style === 'polaroid' && (
            <div className="absolute inset-x-4 bottom-4 bg-amber-50/90 text-charcoal-900 p-4 rounded-xl shadow-2xl font-emotional border border-amber-200">
              <div className="text-base font-bold text-amber-950 flex justify-between items-center">
                <span>🏕️ {log.title}</span>
                <span className="text-xs font-sans text-amber-800">{log.date}</span>
              </div>
              <p className="text-xs text-amber-900/80 mt-1 line-clamp-1 font-sans">{log.story}</p>
            </div>
          )}

          {config.style === 'minimal' && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs font-mono text-slate-200 flex justify-between items-end">
              <div>
                <div className="font-bold text-sm text-white">📍 {log.campsite}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{log.date} • {log.weather.temp}°C {log.weather.condition}</div>
              </div>
              <div className="text-right text-[10px] text-slate-400">
                CAMPIC #0{log.id.replace('log-', '')}
              </div>
            </div>
          )}

          {/* Photo Selector Thumbnails */}
          {log.originalPhotos.length > 1 && (
            <div className="absolute top-3 left-3 flex gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
              {log.originalPhotos.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedPhotoIndex === idx ? 'border-campfire-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Customization Controls Panel */}
        <div className="w-full max-w-md bg-charcoal-900 rounded-2xl p-4 border border-white/10 flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-2">스탬프 오버레이 스타일</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'firelight', label: '🔥 감성 불멍 라벨' },
                { id: 'badge', label: '🏷️ 아웃도어 패치' },
                { id: 'polaroid', label: '📷 클래식 폴라로이드' },
                { id: 'minimal', label: '✨ 미니멀 워터마크' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setConfig({ ...config, style: item.id as StampStyle })}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    config.style === item.id
                      ? 'bg-campfire-500/20 border-campfire-500 text-campfire-300'
                      : 'bg-charcoal-800 border-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">무드 필터</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { id: 'firelight', label: '불멍 아늑함' },
                { id: 'pine', label: '잣나무 숲속' },
                { id: 'starlight', label: '별빛 밤하늘' },
                { id: 'vintage', label: '빈티지 필름' },
                { id: 'none', label: '원본 그대로' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setConfig({ ...config, filter: f.id as PhotoFilter })}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap font-medium transition-all ${
                    config.filter === f.id
                      ? 'bg-campfire-500 text-white border-campfire-400'
                      : 'bg-charcoal-800 border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Request Highlight Box: Original + Stamped Photo Saving Options */}
          <div className="bg-campfire-500/10 border border-campfire-500/30 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-campfire-400 font-semibold mb-1 text-xs">
              <ImageIcon className="w-4 h-4" />
              <span>사진첩 저장 옵션 (아이폰 앨범 연동)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              요청하신대로 스탬프가 합성된 이미지와 <strong className="text-white">원본 사진</strong>을 각각 또는 <strong className="text-campfire-400">한 번에 모두 저장</strong>할 수 있습니다.
            </p>

            <div className="flex flex-col gap-2">
              {/* PRIMARY ACTION: Save BOTH Original + Stamped */}
              <button
                onClick={() => exportPhoto('both')}
                className="w-full py-3 bg-gradient-to-r from-campfire-600 to-campfire-500 text-white font-bold rounded-xl shadow-glow-orange flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>📸 원본 + 스탬프 사진 모두 저장 (추천)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => exportPhoto('stamped')}
                  className="py-2 px-3 bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 rounded-xl text-slate-200 font-medium flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-campfire-400" />
                  <span>스탬프 사진만 저장</span>
                </button>
                <button
                  onClick={() => exportPhoto('original')}
                  className="py-2 px-3 bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 rounded-xl text-slate-200 font-medium flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>원본 사진만 저장</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-slate-300 font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>SNS / 인스타그램 / 카카오톡으로 공유하기</span>
          </button>

          {/* Success Toast */}
          {downloadSuccess && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in text-xs">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
