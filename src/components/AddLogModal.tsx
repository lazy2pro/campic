import React, { useState } from 'react';
import { X, Upload, Flame } from 'lucide-react';
import { CampingLog, CampingSeason, WeatherInfo } from '../types/camping';

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLog: (log: Omit<CampingLog, 'id'>) => void;
}

export const AddLogModal: React.FC<AddLogModalProps> = ({ isOpen, onClose, onAddLog }) => {
  if (!isOpen) return null;

  // 엑박 방지용 기본 예제 이미지
  const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80";

  const [images, setImages] = useState<string[]>([SAMPLE_IMAGE]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [campingType, setCampingType] = useState('오토캠핑');
  const [season, setSeason] = useState<CampingSeason>('여름 🌿');
  const [date, setDate] = useState('2026-08-13');
  const [duration, setDuration] = useState('1박 2일');
  const [temp, setTemp] = useState(22);
  const [fireCount, setFireCount] = useState(1);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weatherObj: WeatherInfo = {
      condition: '맑음',
      temp: temp
    };

    onAddLog({
      title: title || '즐거운 캠핑',
      location: location || '캠핑장',
      date,
      campingType,
      season,
      duration,
      weather: weatherObj,
      fireCount: Number(fireCount),
      images: images.length > 0 ? images : [SAMPLE_IMAGE],
      content,
      gearUsed: []
    });
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages([event.target.result as string, ...images]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
      {/* 상단 짤림 방지 (pt-10 / safe-area 대응) 및 레이아웃 정리 */}
      <div className="bg-[#121212] text-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col pt-10 pb-6 px-5 sm:p-6 overflow-y-auto border border-gray-800 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-500/10 text-orange-500 rounded-xl">
              <Flame size={20} />
            </span>
            <h2 className="text-lg font-bold">새 캠핑 로그 남기기</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          {/* 캠핑 사진 업로드 영역 */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">
              캠핑 사진 (원본 업로드)
            </label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {/* 업로드 버튼 */}
              <label className="flex flex-col items-center justify-center w-24 h-24 min-w-[6rem] rounded-xl border-2 border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 cursor-pointer transition-colors shrink-0">
                <Upload size={20} className="text-orange-500 mb-1" />
                <span className="text-[11px] text-gray-400">사진 추가</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* 이미지 목록 및 썸네일 */}
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 min-w-[6rem] rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shrink-0">
                  <img src={img} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-orange-500 text-[10px] font-bold px-1.5 py-0.5 rounded text-white shadow">
                      대표
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">제목</label>
            <input 
              type="text" 
              placeholder="예: 영월 잣나무 숲속 불멍 힐링" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* 캠핑장 이름 */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">캠핑장 이름</label>
            <input 
              type="text" 
              placeholder="예: 영월 잣나무 캠핑장" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* 캠핑 종류 & 계절 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">캠핑 종류</label>
              <select 
                value={campingType} 
                onChange={(e) => setCampingType(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="오토캠핑">오토캠핑</option>
                <option value="백패킹">백패킹</option>
                <option value="차박">차박</option>
                <option value="글램핑">글램핑</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">계절</label>
              <select 
                value={season} 
                onChange={(e) => setSeason(e.target.value as CampingSeason)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="여름 🌿">여름 🌿</option>
                <option value="봄 🌸">봄 🌸</option>
                <option value="가을 🍁">가을 🍁</option>
                <option value="겨울 ❄️">겨울 ❄️</option>
              </select>
            </div>
          </div>

          {/* 날짜 & 숙박 정보 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">날짜</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">숙박 정보</label>
              <input 
                type="text" 
                placeholder="1박 2일" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* 날씨 & 불멍 회차 */}
          <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800/80 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-300">날씨 & 기온 ({temp}°C)</span>
              <span className="text-xs text-orange-400 font-bold">{temp}°C</span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="40" 
              value={temp} 
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-gray-300">불멍 회차 태그</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={fireCount} 
                  onChange={(e) => setFireCount(Number(e.target.value))}
                  className="w-16 bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-center text-white focus:outline-none focus:border-orange-500"
                />
                <span className="text-xs text-gray-400">번째 불멍</span>
              </div>
            </div>
          </div>

          {/* 캠핑 일기 & 추억 */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">캠핑 일기 & 추억</label>
            <textarea 
              rows={3}
              placeholder="이번 캠핑에서의 특별했던 기억, 감성 이야기, 불멍 소회 등을 적어주세요." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.99]"
          >
            <Flame size={18} />
            캠핑 사진 로그 기록 완료하기
          </button>
        </form>
      </div>
    </div>
  );
};
