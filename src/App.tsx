import React, { useState } from 'react';
import { Plus, Tent, Compass, Camera, Package } from 'lucide-react';
import { CampingLog, GearItem } from './types/camping';
import { mockLogs, mockGears } from './data/mockData';
import { LogCard } from './components/LogCard';
import { LogDetailModal } from './components/LogDetailModal';
import { AddLogModal } from './components/AddLogModal';
import { CampingMapStats } from './components/CampingMapStats';
import { PhotoStampEditor } from './components/PhotoStampEditor';
import { GearCloset } from './components/GearCloset';
import { MobileFrame } from './components/MobileFrame';

export function App() {
  const [activeTab, setActiveTab] = useState<'logs' | 'map' | 'editor' | 'gear'>('logs');
  const [logs, setLogs] = useState<CampingLog[]>(mockLogs);
  const [gears, setGears] = useState<GearItem[]>(mockGears);
  
  const [selectedLog, setSelectedLog] = useState<CampingLog | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddLog = (newLogData: Omit<CampingLog, 'id'>) => {
    const newLog: CampingLog = {
      ...newLogData,
      id: `log-${Date.now()}`
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const handleOpenStampStudioFromDetail = () => {
    setSelectedLog(null);
    setActiveTab('editor');
  };

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-800/60 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl shadow-lg shadow-orange-500/20">
              <Tent size={20} className="text-white" />
            </span>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Campic
              </h1>
              <p className="text-[10px] text-orange-400 font-medium tracking-wide uppercase">
                Camping Log & Gear
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus size={16} />
            <span>기록하기</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="p-4 max-w-md mx-auto">
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-gray-300">
                  나의 캠핑 기록 <span className="text-orange-500">{logs.length}</span>
                </h2>
              </div>
              <div className="grid gap-4">
                {logs.map((log) => (
                  <LogCard key={log.id} log={log} onSelect={(selected) => setSelectedLog(selected)} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'map' && <CampingMapStats logs={logs} />}

          {activeTab === 'editor' && <PhotoStampEditor log={logs[0]} />}

          {activeTab === 'gear' && <GearCloset />}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-lg border-t border-gray-800/80 max-w-md mx-auto px-6 py-2">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'logs' ? 'text-orange-500 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Tent size={20} />
              <span className="text-[10px]">로그</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'map' ? 'text-orange-500 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Compass size={20} />
              <span className="text-[10px]">지적/통계</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'editor' ? 'text-orange-500 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Camera size={20} />
              <span className="text-[10px]">스탬프</span>
            </button>

            <button
              onClick={() => setActiveTab('gear')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'gear' ? 'text-orange-500 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Package size={20} />
              <span className="text-[10px]">장비도감</span>
            </button>
          </div>
        </nav>

        {/* Modals */}
        {selectedLog && (
          <LogDetailModal 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)} 
            onOpenStampStudio={handleOpenStampStudioFromDetail}
          />
        )}

        <AddLogModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddLog={handleAddLog}
        />
      </div>
    </MobileFrame>
  );
}

export default App;
