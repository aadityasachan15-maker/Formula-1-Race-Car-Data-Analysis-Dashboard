import React from 'react';
import { GlobalFilters, CircuitType, DNFAttribution } from '../types/f1';
import { TEAMS_DATA } from '../data/f1-dataset';
import { Filter, RotateCcw, Search, Sliders, ShieldAlert, Calendar } from 'lucide-react';

interface GlobalFilterBarProps {
  filters: GlobalFilters;
  onChangeFilters: (updated: Partial<GlobalFilters>) => void;
  onResetFilters: () => void;
}

const DNF_REASONS: Array<'ALL' | DNFAttribution> = [
  'ALL',
  'Engine failure',
  'Brake failure',
  'Collision',
  'Mechanical',
  'Other',
];

const CIRCUIT_TYPES: Array<'ALL' | CircuitType> = ['ALL', 'Permanent', 'Street', 'Street/Park'];

const YEARS = ['ALL', ...Array.from({ length: 17 }, (_, i) => 2026 - i)];

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  const isFiltered =
    filters.dnfReason !== 'ALL' ||
    filters.year !== 'ALL' ||
    filters.topN !== 10 ||
    filters.selectedTeam !== 'ALL' ||
    filters.selectedCircuitType !== 'ALL' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 mb-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#1f2637]">
        {/* Title & Filter badge */}
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#e10600]/20 text-[#ff4c47] border border-[#e10600]/30">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                Global Interactive Controls
              </h3>
              <span className="text-[10px] bg-[#1d2332] text-gray-300 font-mono px-2 py-0.5 rounded border border-[#2a3449]">
                Tableau Parameters
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Cross-filter all 9 visualizations, driver statistics, and scenario benchmarks
            </p>
          </div>
        </div>

        {/* Reset & Quick Top N chips */}
        <div className="flex items-center space-x-2">
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/60 px-2.5 py-1.5 rounded-lg transition-colors font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search driver, GP, team..."
              value={filters.searchQuery}
              onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
              className="bg-[#181e2b] border border-[#263145] text-xs text-gray-200 pl-8 pr-3 py-1.5 rounded-lg w-44 sm:w-56 focus:outline-none focus:border-[#e10600] font-sans"
            />
          </div>
        </div>
      </div>

      {/* Main 3 Global Controls + Auxiliary Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
        {/* 1. DNF Reason Filter (Specified in Tableau Spec) */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1 font-mono flex items-center justify-between">
            <span className="flex items-center space-x-1 text-rose-400">
              <ShieldAlert className="w-3 h-3" />
              <span>DNF Reason Filter</span>
            </span>
            {filters.dnfReason !== 'ALL' && (
              <span className="text-[10px] text-amber-400">Active</span>
            )}
          </label>
          <select
            value={filters.dnfReason}
            onChange={(e) => onChangeFilters({ dnfReason: e.target.value as any })}
            className={`w-full bg-[#181e2b] border text-xs text-gray-100 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e10600] font-mono ${
              filters.dnfReason !== 'ALL' ? 'border-[#e10600] bg-red-950/20' : 'border-[#263145]'
            }`}
          >
            {DNF_REASONS.map((reason) => (
              <option key={reason} value={reason} className="bg-[#121620] text-gray-200">
                {reason === 'ALL' ? 'All Reasons (Finish + DNF)' : reason}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Year of Race Date Filter (Specified in Tableau Spec) */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1 font-mono flex items-center justify-between">
            <span className="flex items-center space-x-1 text-amber-400">
              <Calendar className="w-3 h-3" />
              <span>Year of Race Date</span>
            </span>
            {filters.year !== 'ALL' && (
              <span className="text-[10px] text-emerald-400">{filters.year} Season</span>
            )}
          </label>
          <select
            value={filters.year}
            onChange={(e) =>
              onChangeFilters({
                year: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value),
              })
            }
            className={`w-full bg-[#181e2b] border text-xs text-gray-100 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e10600] font-mono ${
              filters.year !== 'ALL' ? 'border-amber-500 bg-amber-950/20' : 'border-[#263145]'
            }`}
          >
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-[#121620] text-gray-200">
                {y === 'ALL' ? 'All 17 Seasons (2010–2026)' : `Season ${y}`}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Top N Parameter (Specified in Tableau Spec: default 10) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center space-x-1 text-cyan-400">
              <Sliders className="w-3 h-3" />
              <span>Top N Parameter</span>
            </label>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded">
              Top {filters.topN}
            </span>
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={filters.topN}
              onChange={(e) => onChangeFilters({ topN: Number(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-[#263145] rounded-lg cursor-pointer"
            />
            <div className="flex space-x-1">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => onChangeFilters({ topN: n })}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    filters.topN === n
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-[#181e2b] text-gray-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Team Selector & Circuit Type */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1 font-mono">
            Constructor Team Focus
          </label>
          <select
            value={filters.selectedTeam}
            onChange={(e) => onChangeFilters({ selectedTeam: e.target.value })}
            className={`w-full bg-[#181e2b] border text-xs text-gray-100 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e10600] font-sans ${
              filters.selectedTeam !== 'ALL' ? 'border-[#00d2be] bg-teal-950/20' : 'border-[#263145]'
            }`}
          >
            <option value="ALL">All 10 Constructors</option>
            {TEAMS_DATA.map((t) => (
              <option key={t.name} value={t.name} className="bg-[#121620] text-gray-200">
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Circuit Type Quick Filter Bar */}
      <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-[#1a2130] text-xs">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
          Circuit Type:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {CIRCUIT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onChangeFilters({ selectedCircuitType: type })}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                filters.selectedCircuitType === type
                  ? 'bg-[#e10600] text-white font-bold'
                  : 'bg-[#181e2b] text-gray-400 hover:text-gray-200 border border-[#273247]'
              }`}
            >
              {type === 'ALL' ? 'All Track Types' : type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
