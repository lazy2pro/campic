import React, { useState } from 'react';
import { CampingLog, CampingCategory, CampingSeason, WeatherInfo, GearItem } from '../types/camping';
import { X, Upload, Flame, Check } from 'lucide-react';

interface AddLogModalProps {
  onClose: () => void;
  onAddLog: (newLog: CampingLog) => void;
  availableGear: GearItem[];
  existingLogCount: number;
}

export const AddLogModal: React.FC<AddLogModalProps> = ({
  onClose,
  onAddLog,
  availableGear,
  existingLogCount
}) => {
  const [title, setTitle] = useState('');
  const [campsite, setCampsite] = useState('');
  const [location] = useState('대한민국 캠핑장');
  const [category, setCategory] = useState<CampingCategory>('오토캠핑');
  const [season, setSeason] = useState<CampingSeason>('여름');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [nights, setNights] = useState('1박 2일');
  const [temp, setTemp] = useState(22);
  const [weatherCond] = useState<WeatherInfo['condition']>('별빛가득');
  const [fireCount, setFireCount] = useState(existingLogCount + 1);
  const [rating] = useState(5);
  const [story, setStory] = useState('');
  const [selectedGear, setSelectedGear] = useState<string[]>([]);
  const [tags] = useState<string[]>(['불멍', '힐링']);
  const [photoUrls, setPhotoUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop'
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newUrls.push(event.target.result as string);
          if (newUrls.length === files.length) {
            setPhotoUrls((prev) => [...newUrls, ...prev]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleGear = (gearName: string) => {
    if (selectedGear.includes(gearName)) {
      setSelectedGear(selectedGear.filter((g) => g !== gearName));
    } else {
      setSelectedGear([...selectedGear, gearName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !campsite) return;

    const newLog: CampingLog = {
      id: `log-${Date.now()}`,
      title,
      campsite,
      location: location || '대한민국 캠핑장',
      date,
      nights,
      category,
      season,
      originalPhotos: photoUrls,
      stampedPhotos: photoUrls,
      weather: {
        condition: weatherCond,
        temp,
        icon: 'flame'
      },
      fireLogCount: fireCount,
      rating,
      story: story || '행복했던 캠핑의 추억입니다.',
      gearUsed: selectedGear,
      tags,
      altitude: 450,
      createdTime: Date.now()
    };

    onAddLog(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-lg bg-charcoal-900 border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-campfire-500/20 text-campfire-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-base">새 캠핑 로그 남기기</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:bg-white/20">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 text-xs">
          
          {/* Photo Uploader */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">캠핑 사진 (원본 업로드)</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-white/20 bg-charcoal-800 hover:border-campfire-500 flex flex-col items-center justify-center cursor-pointer transition-all shrink-0">
                <Upload className="w-5 h-5 text-campfire-400 mb-1" />
                <span className="text-[10px] text-slate-400">사진 추가</span>
                <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
              </label>

              {photoUrls.map((url, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                  <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-campfire-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      대표
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Title & Campsite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">제목</label>
              <input
                type="text"
                placeholder="예: 영월 잣나무 숲속 불멍 힐링"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-campfire-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">캠핑장 이름</label>
              <input
                type="text"
                placeholder="예: 영월 잣나무 캠핑장"
                value={campsite}
                onChange={(e) => setCampsite(e.target.value)}
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-campfire-500"
                required
              />
            </div>
          </div>

          {/* Category & Season */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">캠핑 종류</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CampingCategory)}
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-campfire-500"
              >
                <option value="오토캠핑">오토캠핑</option>
                <option value="차박">차박</option>
                <option value="백패킹">백패킹</option>
                <option value="글램핑">글램핑</option>
                <option value="캠닉/불멍">캠닉/불멍</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">계절</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as CampingSeason)}
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-campfire-500"
              >
                <option value="봄">봄 🌸</option>
                <option value="여름">여름 🌿</option>
                <option value="가을">가을 🍁</option>
                <option value="겨울">겨울 ❄️</option>
              </select>
            </div>
          </div>

          {/* Date & Nights */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-campfire-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">숙박 정보</label>
              <input
                type="text"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                placeholder="1박 2일"
                className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-campfire-500"
              />
            </div>
          </div>

          {/* Weather & Fire Count */}
          <div className="grid grid-cols-2 gap-3 bg-charcoal-800/60 p-3 rounded-2xl border border-white/5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">날씨 & 기온 ({temp}°C)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="-15"
                  max="38"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-campfire-500"
                />
                <span className="font-bold text-campfire-400 text-xs whitespace-nowrap">{temp}°C</span>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">불멍 회차 태그</label>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-campfire-500" />
                <input
                  type="number"
                  value={fireCount}
                  onChange={(e) => setFireCount(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-charcoal-900 border border-white/10 rounded-lg text-slate-100 font-bold text-xs"
                />
                <span className="text-slate-400 text-[11px] whitespace-nowrap">번째 불멍</span>
              </div>
            </div>
          </div>

          {/* Gear Selection Tagging */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">이번 캠핑에 사용한 장비 태그</label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-charcoal-800/80 rounded-xl border border-white/5">
              {availableGear.map((gear) => {
                const isSelected = selectedGear.includes(gear.name);
                return (
                  <button
                    key={gear.id}
                    type="button"
                    onClick={() => toggleGear(gear.name)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] border font-medium transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-campfire-500/20 border-campfire-500 text-campfire-300'
                        : 'bg-charcoal-900 border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-campfire-400" />}
                    <span>{gear.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story Notes */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">캠핑 일기 & 추억</label>
            <textarea
              rows={3}
              placeholder="이번 캠핑에서의 특별했던 기억, 감성 이야기, 불멍 소회 등을 적어주세요."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-campfire-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-campfire-500 hover:bg-campfire-600 font-bold rounded-2xl text-white shadow-glow-orange text-sm transition-all"
          >
            🔥 캠핑 사진 로그 기록 완료하기
          </button>
        </form>

      </div>
    </div>
  );
};
