import React from 'react';
import { 
  Trophy, 
  BarChart3, 
  BookOpen, 
  Users, 
  Database, 
  Share2, 
  Gauge, 
  Flag,
  FileSpreadsheet
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'story' | 'personas' | 'telemetry' | 'docs';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDataExplorer: () => void;
  onOpenPublishModal: () => void;
  filteredCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDataExplorer,
  onOpenPublishModal,
  filteredCount,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0d0f14]/95 backdrop-blur-md border-b border-[#252a36] text-white">
      {/* Top F1 Red Racing Stripe */}
      <div className="h-1 bg-gradient-to-r from-[#e10600] via-[#ff4742] to-[#e10600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer flex-shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-[#e10600] text-white font-black italic tracking-tighter px-2.5 py-1 rounded text-xl flex items-center shadow-lg shadow-red-900/30 flex-shrink-0">
              <span>F1</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-wide text-base sm:text-lg text-white font-sans uppercase whitespace-nowrap">
                  Race Intelligence
                </span>
                <span className="text-xs bg-[#e10600]/20 text-[#ff615c] border border-[#e10600]/40 px-2 py-0.5 rounded-full font-mono font-medium hidden sm:inline whitespace-nowrap">
                  Tableau Analytics
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block font-mono whitespace-nowrap">
                17 SEASONS (2010–2026) • 6,464 RACE LOGS • 29 CIRCUITS
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 md:space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#e10600] text-white shadow-md shadow-red-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1f2c]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Executive Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'story'
                  ? 'bg-[#e10600] text-white shadow-md shadow-red-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1f2c]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">9-Scene Story</span>
              <span className="sm:hidden">Story</span>
            </button>

            <button
              onClick={() => setActiveTab('personas')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'personas'
                  ? 'bg-[#e10600] text-white shadow-md shadow-red-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1f2c]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Persona Scenarios</span>
              <span className="sm:hidden">Personas</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-[#e10600] text-white shadow-md shadow-red-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1f2c]'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span className="hidden md:inline">Telemetry & Laps</span>
              <span className="md:hidden">Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'docs'
                  ? 'bg-[#e10600] text-white shadow-md shadow-red-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1f2c]'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden lg:inline">Project Docs</span>
              <span className="lg:hidden">Docs</span>
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenDataExplorer}
              className="hidden md:flex items-center space-x-1.5 bg-[#171c26] hover:bg-[#202737] text-gray-200 border border-[#2b3345] px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors"
              title="Inspect 5 Sheets & Raw Race Records"
            >
              <Database className="w-3.5 h-3.5 text-[#00d2be]" />
              <span>5 Sheets Data</span>
              <span className="bg-[#242b3b] text-gray-300 px-1.5 py-0.2 rounded text-[10px]">
                {filteredCount === totalCount ? `${totalCount}` : `${filteredCount}/${totalCount}`}
              </span>
            </button>

            <button
              onClick={onOpenPublishModal}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all"
              title="Tableau Public Publishing Workflow"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tableau Public</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
