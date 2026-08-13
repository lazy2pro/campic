import React, { useState } from 'react';
import { GearItem } from '../types/camping';
import { Plus, CheckSquare, Square } from 'lucide-react';

interface GearClosetProps {
  gearList: GearItem[];
  onAddGear: (gear: GearItem) => void;
}

export const GearCloset: React.FC<GearClosetProps> = ({ gearList, onAddGear }) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'gear-1': true,
    'gear-2': true,
    'gear-3': false,
  });

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newGearName, setNewGearName] = useState('');
  const [newGearBrand, setNewGearBrand] = useState('');
  const [newGearCategory, setNewGearCategory] = useState<GearItem['category']>('텐트/셸터');

  const filteredGear = activeCategory === '전체'
    ? gearList
    : gearList.filter((g) => g.category === activeCategory);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateGear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGearName) return;

    const gear: GearItem = {
      id: `gear-${Date.now()}`,
      name: newGearName,
      brand: newGearBrand || 'Custom',
      category: newGearCategory,
      usageCount: 1,
      notes: '새로 보관함에 등록된 장비입니다.'
    };

    onAddGear(gear);
    setNewGearName('');
    setNewGearBrand('');
    setShowAddForm(false);
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg text-slate-100">나의 캠핑 장비 보관함</h2>
          <p className="text-xs text-slate-400">캠핑 로그와 연동되는 장비 및 출정 패킹 체크리스트</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 bg-campfire-500 hover:bg-campfire-600 font-bold text-xs rounded-xl text-white shadow-glow-orange flex items-center gap-1 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>장비 등록</span>
        </button>
      </div>

      {/* Add Gear Form */}
      {showAddForm && (
        <form onSubmit={handleCreateGear} className="bg-charcoal-900 border border-white/10 p-4 rounded-2xl flex flex-col gap-3 text-xs">
          <h3 className="font-bold text-slate-200">새 캠핑 장비 추가</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="장비 이름 (예: 노나돔 텐트)"
              value={newGearName}
              onChange={(e) => setNewGearName(e.target.value)}
              className="px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-white"
              required
            />
            <input
              type="text"
              placeholder="브랜드 (예: Helinox)"
              value={newGearBrand}
              onChange={(e) => setNewGearBrand(e.target.value)}
              className="px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-white"
            />
          </div>
          <select
            value={newGearCategory}
            onChange={(e) => setNewGearCategory(e.target.value as GearItem['category'])}
            className="px-3 py-2 bg-charcoal-800 border border-white/10 rounded-xl text-white"
          >
            <option value="텐트/셸터">텐트/셸터</option>
            <option value="체어/테이블">체어/테이블</option>
            <option value="취사/화로">취사/화로</option>
            <option value="조명/랜턴">조명/랜턴</option>
            <option value="침구/매트">침구/매트</option>
            <option value="기타장비">기타장비</option>
          </select>
          <button type="submit" className="py-2 bg-campfire-500 font-bold rounded-xl text-white">
            보관함에 저장하기
          </button>
        </form>
      )}

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {['전체', '텐트/셸터', '체어/테이블', '취사/화로', '조명/랜턴', '침구/매트'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-campfire-500 border-campfire-400 text-white'
                : 'bg-charcoal-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gear List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredGear.map((gear) => (
          <div key={gear.id} className="bg-charcoal-900 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => toggleChecklist(gear.id)} className="text-campfire-400">
                {checklist[gear.id] ? (
                  <CheckSquare className="w-5 h-5 text-campfire-500 fill-campfire-500/20" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-100">{gear.name}</span>
                  <span className="text-[10px] bg-charcoal-800 text-slate-400 px-1.5 py-0.5 rounded border border-white/5 font-mono">
                    {gear.brand}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{gear.notes}</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">누적 사용</span>
              <span className="text-xs font-bold text-campfire-400">{gear.usageCount}회 출정</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
