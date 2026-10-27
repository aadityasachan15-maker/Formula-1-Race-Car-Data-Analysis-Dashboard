import React from 'react';
import { KPIStats } from '../utils/f1-analytics';
import { ShieldCheck, Flag, Users, Calendar, AlertTriangle, Zap, Trophy, MapPin } from 'lucide-react';

interface KPICardsProps {
  stats: KPIStats;
  isFiltered: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats, isFiltered }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* KPI 1: Competing Teams */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#131722] to-[#181d2a] border border-[#232a3b] rounded-xl p-4 shadow-lg hover:border-[#e10600]/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
            Competing Teams
          </span>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {stats.competingTeams}
          </span>
          <span className="text-xs text-blue-400 font-semibold">Constructors</span>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">
          Red Bull, Ferrari, Mercedes, McLaren & midfield contenders
        </p>
      </div>

      {/* KPI 2: Seasons in Play */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#131722] to-[#181d2a] border border-[#232a3b] rounded-xl p-4 shadow-lg hover:border-[#e10600]/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
            Seasons in Play
          </span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {stats.seasonsInPlay}
          </span>
          <span className="text-xs text-amber-400 font-mono font-semibold">2010 – 2026</span>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">
          V8 era, Turbo-Hybrid, Ground Effect & Active Aero transitions
        </p>
      </div>

      {/* KPI 3: Race Outcomes Logged */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#131722] to-[#181d2a] border border-[#232a3b] rounded-xl p-4 shadow-lg hover:border-[#e10600]/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:bg-red-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
            Race Outcomes Logged
          </span>
          <div className="p-2 rounded-lg bg-[#e10600]/10 text-[#ff4d47] border border-[#e10600]/30">
            <Flag className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {stats.raceOutcomesLogged.toLocaleString()}
          </span>
          {isFiltered && (
            <span className="text-[10px] bg-red-950/80 text-red-300 border border-red-800 px-1.5 py-0.5 rounded">
              Filtered
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
          <span>Reliability: <strong className="text-emerald-400 font-mono">{stats.overallReliabilityRate}%</strong></span>
          <span>DNFs: <strong className="text-rose-400 font-mono">{stats.totalDnfs}</strong></span>
        </div>
      </div>

      {/* KPI 4: Circuits Showcased */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#131722] to-[#181d2a] border border-[#232a3b] rounded-xl p-4 shadow-lg hover:border-[#e10600]/50 transition-all group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
            Circuits Showcased
          </span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {stats.circuitsShowcased}
          </span>
          <span className="text-xs text-emerald-400 font-semibold">Global Tracks</span>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">
          Street circuits, high-speed temples, and technical venues
        </p>
      </div>
    </div>
  );
};
