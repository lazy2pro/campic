import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { LogCard } from './components/LogCard';
import { LogDetailModal } from './components/LogDetailModal';
import { PhotoStampEditor } from './components/PhotoStampEditor';
import { AddLogModal } from './components/AddLogModal';
import { CampingMapStats } from './components/CampingMapStats';
import { GearCloset } from './components/GearCloset';

import { CampingLog, GearItem } from './types/camping';
import { INITIAL_CAMPING_LOGS, INITIAL_GEAR_ITEMS } from './data/mockData';
import { Flame, Plus, Compass, Package, Search, Image as ImageIcon } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'feed' | 'map' | 'gear'>('feed');

  // Logs and Gear State with localStorage
  const [logs, setLogs] = useState<CampingLog[]>(() => {
    const saved = localStorage.getItem('camplog_logs');
    return saved ? JSON.parse(saved) : INITIAL_CAMPING_LOGS;
  });

  const [gearList, setGearList] = useState<GearItem[]>(() => {
    const saved = localStorage.getItem('camplog_gear');
    return saved ? JSON.parse(saved) : INITIAL_GEAR_ITEMS;
  });

  // Filter & Search state
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<CampingLog | null>(null);
  const [selectedLogForStamp, setSelectedLogForStamp] = useState<CampingLog | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('camplog_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('camplog_gear', JSON.stringify(gearList));
  }, [gearList]);

  // Handlers
  const handleAddLog = (newLog: CampingLog) => {
    setLogs([newLog, ...logs]);
  };

  const handleAddGear = (newGear: GearItem) => {
    setGearList([...gearList, newGear]);
  };

  const handleSaveStampedPhoto = (stampedUrl: string) => {
    if (!selectedLogForStamp) return;

    setLogs((prevLogs) =>
      prevLogs.map((item) =>
        item.id === selectedLogForStamp.id
          ? {
              ...item,
              stampedPhotos: [stampedUrl, ...(item.stampedPhotos || [])],
            }
          : item
      )
    );
  };

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    const matchesCat = selectedCategory === '전체' || log.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      log.campsite.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.gearUsed.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between h-full bg-charcoal-950 text-slate-100">
        
        {/* App Top Navigation Header */}
        <div className="sticky top-0 z-30 bg-charcoal-950/85 backdrop-blur-md px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-campfire-600 to-campfire-400 flex items-center justify-center shadow-glow-orange">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                <span>Campic</span>
                <span className="text-[10px] bg-campfire-500/20 text-campfire-400 font-mono px-1.5 py-0.5 rounded border border-campfire-500/30">
                  v1.0
                </span>
              </h1>
              <p className="text-[10px] text-slate-400">캠핑 사진 로그 & 원본/스탬프 아이폰 저장</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 bg-campfire-500 hover:bg-campfire-600 font-bold text-xs rounded-xl text-white shadow-glow-orange flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>로그 남기기</span>
          </button>
        </div>

        {/* Dynamic Tab Body Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          
          {/* TAB 1: Photo Log Feed */}
          {activeTab === 'feed' && (
            <div className="p-3 sm:p-4 flex flex-col gap-4">
              
              {/* Search Bar & Category Pills */}
              <div className="flex flex-col gap-2.5">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="캠핑장, 불멍, 장비 이름 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-charcoal-900 border border-white/10 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-campfire-500"
                  />
                </div>

                {/* Category Horizontal Filter Bar */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {['전체', '오토캠핑', '차박', '백패킹', '글램핑', '캠닉/불멍'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-campfire-500 text-white border-campfire-400 shadow-glow-orange'
                          : 'bg-charcoal-900 border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Grid */}
              {filteredLogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredLogs.map((log) => (
                    <LogCard
                      key={log.id}
                      log={log}
                      onOpenDetail={(item) => setSelectedLogForDetail(item)}
                      onOpenStampStudio={(item) => setSelectedLogForStamp(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-slate-600 mb-2" />
                  <p className="text-sm font-semibold">검색 조건에 해당되는 캠핑 로그가 없습니다.</p>
                  <p className="text-xs text-slate-500 mt-1">상단의 '+ 로그 남기기'를 눌러 새 사진을 등록해 보세요!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Map & Stats */}
          {activeTab === 'map' && <CampingMapStats logs={logs} />}

          {/* TAB 3: Gear Closet */}
          {activeTab === 'gear' && (
            <GearCloset gearList={gearList} onAddGear={handleAddGear} />
          )}
        </div>

        {/* iOS Glass Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto glass-nav py-2 px-6 flex justify-around items-center z-40">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'feed' ? 'text-campfire-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-[10px]">사진로그</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-11 h-11 -mt-4 rounded-full bg-gradient-to-tr from-campfire-600 to-campfire-500 text-white flex items-center justify-center shadow-glow-orange hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'map' ? 'text-campfire-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">지도/통계</span>
          </button>

          <button
            onClick={() => setActiveTab('gear')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'gear' ? 'text-campfire-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px]">장비보관함</span>
          </button>
        </nav>

        {/* Modals */}
        {selectedLogForDetail && (
          <LogDetailModal
            log={selectedLogForDetail}
            onClose={() => setSelectedLogForDetail(null)}
            onOpenStampStudio={(log) => {
              setSelectedLogForDetail(null);
              setSelectedLogForStamp(log);
            }}
          />
        )}

        {selectedLogForStamp && (
          <PhotoStampEditor
            log={selectedLogForStamp}
            onClose={() => setSelectedLogForStamp(null)}
            onSaveStampedPhoto={handleSaveStampedPhoto}
          />
        )}

        {isAddModalOpen && (
          <AddLogModal
            onClose={() => setIsAddModalOpen(false)}
            onAddLog={handleAddLog}
            availableGear={gearList}
            existingLogCount={logs.length}
          />
        )}

      </div>
    </MobileFrame>
  );
};
