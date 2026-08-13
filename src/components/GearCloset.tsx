import React, { useState } from 'react';
import { Package, Plus, Calendar, Trash2 } from 'lucide-react';
import { GearItem, GearCategory } from '../types/camping';

export interface GearClosetProps {
  gearList?: GearItem[];
  onAddGear?: (gear: Omit<GearItem, 'id'>) => void;
  onDeleteGear?: (id: string) => void;
}

const CATEGORIES: GearCategory[] = [
  '텐트/셸터',
  '침구/매트',
  '취사/화로',
  '조명/랜턴',
  '체어/테이블',
  '기타장비'
];

export const GearCloset: React.FC<GearClosetProps> = ({ gearList = [], onAddGear, onDeleteGear }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<GearCategory>('텐트/셸터');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [memo, setMemo] = useState('');

  const filteredGears = selectedCategory === '전체'
    ? gearList
    : gearList.filter((item) => item.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onAddGear) {
      onAddGear({
        name,
        category,
        purchaseDate: purchaseDate || undefined,
        price: price === '' ? undefined : Number(price),
        memo: memo || undefined
      });
    }

    setName('');
    setCategory('텐트/셸터');
    setPurchaseDate('');
    setPrice('');
    setMemo('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 장비를 삭제하시겠습니까?') && onDeleteGear) {
      onDeleteGear(id);
    }
  };

  return (
    <div className="space-y-4 text-white">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-300">
          내 장비 도감 <span className="text-orange-500">{gearList.length}</span>
        </h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-xl font-semibold transition-all active:scale-95"
        >
          <Plus size={14} />
          <span>장비 등록</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          type="button"
          onClick={() => setSelectedCategory('전체')}
          className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all ${
            selectedCategory === '전체'
              ? 'bg-orange-500 text-white border-orange-500 font-bold'
              : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          전체
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white border-orange-500 font-bold'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gear Grid / List */}
      <div className="grid gap-3">
        {filteredGears.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/40 rounded-2xl border border-gray-800/80 p-6">
            <Package size={32} className="mx-auto text-gray-600 mb-2" />
            <p className="text-xs text-gray-400">등록된 장비가 없습니다.</p>
          </div>
        ) : (
          filteredGears.map((item) => (
            <div
              key={item.id}
              className="bg-[#18181B] border border-gray-800 p-4 rounded-2xl space-y-2 shadow-md hover:border-gray-700 transition-all relative"
            >
              <div className="flex items-start justify-between pr-8">
                <div>
                  <span className="inline-block bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-orange-500/20 mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                </div>
                {item.price !== undefined && item.price > 0 && (
                  <span className="text-xs font-semibold text-gray-300">
                    ₩{item.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* 장비 삭제 버튼 */}
              {onDeleteGear && (
                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1 transition-colors"
                  title="장비 삭제"
                >
                  <Trash2 size={15} />
                </button>
              )}

              {(item.purchaseDate || item.memo) && (
                <div className="pt-2 border-t border-gray-800/60 text-xs text-gray-400 space-y-1">
                  {item.purchaseDate && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Calendar size={12} />
                      <span>구매일: {item.purchaseDate}</span>
                    </div>
                  )}
                  {item.memo && (
                    <p className="text-xs text-gray-300 bg-gray-900/60 p-2 rounded-lg border border-gray-800/60 mt-1">
                      {item.memo}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Gear Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121212] border border-gray-800 text-white w-full max-w-sm rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm">새 장비 추가</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-xs"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">장비명</label>
                <input
                  type="text"
                  placeholder="예: 힐레베르그 남마치 3 GT"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GearCategory)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-400 mb-1">구매일</label>
                  <input
                    type="text"
                    placeholder="2026. 05"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">가격 (원)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">메모</label>
                <textarea
                  rows={2}
                  placeholder="상세 규격, 사용 팁 등"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all active:scale-[0.99] mt-2"
              >
                장비 등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
