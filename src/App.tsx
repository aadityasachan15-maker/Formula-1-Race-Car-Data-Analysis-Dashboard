import React, { useState, useMemo } from 'react';
import { 
  CIRCUITS, 
  CHAMPIONSHIP_STANDINGS, 
  ALL_RACE_RESULTS 
} from './data/f1-dataset';
import { 
  GlobalFilters, 
  Circuit, 
  CircuitType, 
  DNFAttribution,
  TyreCompound 
} from './types/f1';
import {
  filterRaceResults,
  calculateKPIs,
  calculateDriverLeaderboard,
  calculateDriverReliability,
  calculateTeamPerformance,
  calculateTyreUsageDistribution,
  calculateCountryParticipation,
  calculatePodiumAchievements,
} from './utils/f1-analytics';

import { Navbar, ActiveTab } from './components/Navbar';
import { KPICards } from './components/KPICards';
import { GlobalFilterBar } from './components/GlobalFilterBar';
import { GlobalDriverMap } from './components/charts/GlobalDriverMap';
import { DriverReliabilityChart } from './components/charts/DriverReliabilityChart';
import { DriverLeaderboardChart } from './components/charts/DriverLeaderboardChart';
import { TeamPerformanceChart } from './components/charts/TeamPerformanceChart';
import { TeamChampionshipChart } from './components/charts/TeamChampionshipChart';
import { TyreCompoundChart } from './components/charts/TyreCompoundChart';
import { CountryTreemapChart } from './components/charts/CountryTreemapChart';
import { PodiumBubbleChart } from './components/charts/PodiumBubbleChart';
import { TelemetryLapChart } from './components/charts/TelemetryLapChart';

import { ArnoldStrategyWorkspace } from './components/personas/ArnoldStrategyWorkspace';
import { LisaBroadcastWorkspace } from './components/personas/LisaBroadcastWorkspace';
import { GilchristComplianceWorkspace } from './components/personas/GilchristComplianceWorkspace';

import { DataStoryViewer } from './components/story/DataStoryViewer';
import { ProjectDocumentationView } from './components/docs/ProjectDocumentationView';
import { DataExplorerModal } from './components/data/DataExplorerModal';
import { TableauPublishModal } from './components/modals/TableauPublishModal';

import { Users, Info, ShieldCheck, Flag, Sparkles, Trophy, Sliders } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activePersona, setActivePersona] = useState<'arnold' | 'lisa' | 'gilchrist'>('arnold');
  const [isDataExplorerOpen, setIsDataExplorerOpen] = useState<boolean>(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);

  // Global Filter State matching Tableau Spec
  const [filters, setFilters] = useState<GlobalFilters>({
    dnfReason: 'ALL',
    year: 'ALL',
    topN: 10,
    selectedTeam: 'ALL',
    selectedCircuitType: 'ALL',
    searchQuery: '',
  });

  const [selectedDriver, setSelectedDriver] = useState<string | undefined>(undefined);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>(undefined);

  // Map circuits by ID for fast lookup
  const circuitMap = useMemo(() => {
    const map = new Map<string, Circuit>();
    for (const c of CIRCUITS) {
      map.set(c.circuit_id, c);
    }
    return map;
  }, []);

  // Filtered Race Results
  const filteredResults = useMemo(() => {
    return filterRaceResults(ALL_RACE_RESULTS, filters, circuitMap);
  }, [filters, circuitMap]);

  // Derived Analytics
  const kpis = useMemo(() => {
    return calculateKPIs(filteredResults, CIRCUITS, CHAMPIONSHIP_STANDINGS);
  }, [filteredResults]);

  const driverLeaderboard = useMemo(() => {
    return calculateDriverLeaderboard(filteredResults, filters.topN);
  }, [filteredResults, filters.topN]);

  const driverReliability = useMemo(() => {
    return calculateDriverReliability(filteredResults);
  }, [filteredResults]);

  const teamPerformance = useMemo(() => {
    return calculateTeamPerformance(filteredResults);
  }, [filteredResults]);

  const tyreDistribution = useMemo(() => {
    return calculateTyreUsageDistribution(filteredResults);
  }, [filteredResults]);

  const countryParticipation = useMemo(() => {
    return calculateCountryParticipation(filteredResults, CIRCUITS);
  }, [filteredResults]);

  const podiumAchievements = useMemo(() => {
    return calculatePodiumAchievements(filteredResults);
  }, [filteredResults]);

  const handleUpdateFilters = (partial: Partial<GlobalFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({
      dnfReason: 'ALL',
      year: 'ALL',
      topN: 10,
      selectedTeam: 'ALL',
      selectedCircuitType: 'ALL',
      searchQuery: '',
    });
    setSelectedDriver(undefined);
    setSelectedCircuit(undefined);
  };

  const handleSelectDriver = (driver: string) => {
    if (selectedDriver === driver) {
      setSelectedDriver(undefined);
      handleUpdateFilters({ searchQuery: '' });
    } else {
      setSelectedDriver(driver);
      handleUpdateFilters({ searchQuery: driver });
    }
  };

  const handleSelectCircuit = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    handleUpdateFilters({ searchQuery: circuit.grand_prix });
  };

  const handleSelectTeam = (team: string) => {
    if (filters.selectedTeam === team) {
      handleUpdateFilters({ selectedTeam: 'ALL' });
    } else {
      handleUpdateFilters({ selectedTeam: team });
    }
  };

  const isFiltered =
    filters.dnfReason !== 'ALL' ||
    filters.year !== 'ALL' ||
    filters.topN !== 10 ||
    filters.selectedTeam !== 'ALL' ||
    filters.selectedCircuitType !== 'ALL' ||
    filters.searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#090b10] text-gray-100 font-sans selection:bg-[#e10600] selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDataExplorer={() => setIsDataExplorerOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        filteredCount={isFiltered ? filteredResults.length : 6464}
        totalCount={6464}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* EXECUTIVE DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Dashboard Title & Scenario Shortcut Badges */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-[#1b2230] gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-sans tracking-tight">
                    Formula 1 Race Intelligence Dashboard
                  </h1>
                  <span className="text-[10px] font-mono bg-[#e10600]/20 text-[#ff4c47] px-2 py-0.5 rounded border border-[#e10600]/40 font-bold">
                    Tableau Unified Grid
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">
                  Interactive multi-season visual telemetry, driver reliability, and constructor benchmarks
                </p>
              </div>

              {/* Persona Quick Switches */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-gray-400 text-[11px] hidden lg:inline">Scenarios:</span>
                <button
                  onClick={() => {
                    setActivePersona('arnold');
                    setActiveTab('personas');
                  }}
                  className="bg-[#181e2b] hover:bg-[#232b3d] text-blue-400 border border-[#273247] px-2.5 py-1 rounded transition-colors text-[11px]"
                >
                  Mr. Arnold (Strategy)
                </button>
                <button
                  onClick={() => {
                    setActivePersona('lisa');
                    setActiveTab('personas');
                  }}
                  className="bg-[#181e2b] hover:bg-[#232b3d] text-purple-400 border border-[#273247] px-2.5 py-1 rounded transition-colors text-[11px]"
                >
                  Ms. Lisa (Broadcast)
                </button>
                <button
                  onClick={() => {
                    setActivePersona('gilchrist');
                    setActiveTab('personas');
                  }}
                  className="bg-[#181e2b] hover:bg-[#232b3d] text-emerald-400 border border-[#273247] px-2.5 py-1 rounded transition-colors text-[11px]"
                >
                  Mr. Gilchrist (FIA)
                </button>
              </div>
            </div>

            {/* Row 1: 4 KPI Cards */}
            <KPICards stats={kpis} isFiltered={isFiltered} />

            {/* Row 2: 3 Global Interactive Controls (DNF Reason, Year, Top N Parameter) */}
            <GlobalFilterBar
              filters={filters}
              onChangeFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
            />

            {/* Grid Row 1: Geographic Map & Driver Reliability Stacked Bar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 min-h-[420px]">
                <GlobalDriverMap
                  circuits={CIRCUITS}
                  selectedCircuitId={selectedCircuit?.circuit_id}
                  onSelectCircuit={handleSelectCircuit}
                />
              </div>

              <div className="lg:col-span-6 min-h-[420px]">
                <DriverReliabilityChart
                  reliabilityStats={driverReliability}
                  selectedDriver={selectedDriver}
                  onSelectDriver={handleSelectDriver}
                />
              </div>
            </div>

            {/* Grid Row 2: Driver Leaderboard & Team Performance Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 min-h-[420px]">
                <DriverLeaderboardChart
                  leaderboard={driverLeaderboard}
                  topN={filters.topN}
                  selectedDriver={selectedDriver}
                  onSelectDriver={handleSelectDriver}
                />
              </div>

              <div className="lg:col-span-6 min-h-[420px]">
                <TeamPerformanceChart
                  teams={teamPerformance}
                  selectedTeam={filters.selectedTeam !== 'ALL' ? filters.selectedTeam : undefined}
                  onSelectTeam={handleSelectTeam}
                />
              </div>
            </div>

            {/* Grid Row 3: Team Championship, Tyre Compound, Country Treemap & Bubble Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 min-h-[400px]">
                <TeamChampionshipChart
                  standings={CHAMPIONSHIP_STANDINGS}
                  selectedSeason={filters.year}
                />
              </div>

              <div className="lg:col-span-6 min-h-[400px]">
                <TyreCompoundChart distribution={tyreDistribution} />
              </div>
            </div>

            {/* Grid Row 4: Country-Wise Participation & Packed Bubble Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 min-h-[400px]">
                <CountryTreemapChart
                  countryData={countryParticipation}
                  onSelectCountry={(country) => handleUpdateFilters({ searchQuery: country })}
                />
              </div>

              <div className="lg:col-span-6 min-h-[400px]">
                <PodiumBubbleChart
                  podiumItems={podiumAchievements}
                  selectedDriver={selectedDriver}
                  onSelectDriver={handleSelectDriver}
                />
              </div>
            </div>
          </div>
        )}

        {/* 9-SCENE STORY VIEW */}
        {activeTab === 'story' && <DataStoryViewer />}

        {/* PERSONA SCENARIOS VIEW */}
        {activeTab === 'personas' && (
          <div className="space-y-6">
            {/* Persona Switcher Tabs */}
            <div className="flex border-b border-[#222a3b] bg-[#121620] rounded-xl p-1.5 gap-2">
              <button
                onClick={() => setActivePersona('arnold')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold font-mono transition-all flex items-center justify-center space-x-2 ${
                  activePersona === 'arnold'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#181e2b]'
                }`}
              >
                <span>Scenario 1: Mr. Arnold (Performance Strategist)</span>
              </button>

              <button
                onClick={() => setActivePersona('lisa')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold font-mono transition-all flex items-center justify-center space-x-2 ${
                  activePersona === 'lisa'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#181e2b]'
                }`}
              >
                <span>Scenario 2: Ms. Lisa / Divya (Broadcast Analyst)</span>
              </button>

              <button
                onClick={() => setActivePersona('gilchrist')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold font-mono transition-all flex items-center justify-center space-x-2 ${
                  activePersona === 'gilchrist'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#181e2b]'
                }`}
              >
                <span>Scenario 3: Mr. Gilchrist / Arvind (FIA Regulation)</span>
              </button>
            </div>

            {/* Persona Content */}
            {activePersona === 'arnold' && <ArnoldStrategyWorkspace />}
            {activePersona === 'lisa' && <LisaBroadcastWorkspace />}
            {activePersona === 'gilchrist' && <GilchristComplianceWorkspace />}
          </div>
        )}

        {/* TELEMETRY & LAPS VIEW */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <TelemetryLapChart />
          </div>
        )}

        {/* PROJECT DOCUMENTATION VIEW */}
        {activeTab === 'docs' && (
          <ProjectDocumentationView
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#0c0e14] border-t border-[#1b2230] text-gray-400 py-6 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e10600] text-white font-black italic px-2 py-0.5 rounded text-xs">
              F1
            </span>
            <span className="text-gray-300 font-sans font-bold">
              Formula 1 Race Intelligence Tableau Architecture
            </span>
            <span className="text-gray-400">• 17 Seasons (2010–2026)</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDataExplorerOpen(true)}
              className="hover:text-white transition-colors"
            >
              5 Sheets Schema
            </button>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Tableau Public Guide
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className="hover:text-rose-400 transition-colors"
            >
              Project Documentation
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DataExplorerModal
        isOpen={isDataExplorerOpen}
        onClose={() => setIsDataExplorerOpen(false)}
      />

      <TableauPublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
}
