import React, { useState } from 'react';
import { TeamPerformanceStats } from '../../types/f1';
import { Trophy, Award, ShieldAlert, ArrowUpDown } from 'lucide-react';

interface TeamPerformanceChartProps {
  teams: TeamPerformanceStats[];
  onSelectTeam?: (team: string) => void;
  selectedTeam?: string;
}

export const TeamPerformanceChart: React.FC<TeamPerformanceChartProps> = ({
  teams,
  onSelectTeam,
  selectedTeam,
}) => {
  const [metric, setMetric] = useState<'points' | 'wins' | 'podiums'>('points');

  const sortedTeams = [...teams].sort((a, b) => {
    if (metric === 'points') return b.totalPoints - a.totalPoints;
    if (metric === 'wins') return b.totalWins - a.totalWins;
    return b.totalPodiums - a.totalPodiums;
  });

  const maxValue = Math.max(
    ...sortedTeams.map((t) =>
      metric === 'points' ? t.totalPoints : metric === 'wins' ? t.totalWins : t.totalPodiums
    ),
    1
  );

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f2637] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Team Performance Ranking
            </h3>
            <span className="text-[10px] bg-emerald-950/60 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
              Horizontal Constructor Bars
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Constructors' Championship dominance across points, victories, and podium conversions
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex bg-[#181e2b] rounded-lg p-0.5 border border-[#273247] text-xs font-mono">
          <button
            onClick={() => setMetric('points')}
            className={`px-2 py-1 rounded transition-colors ${
              metric === 'points' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Points
          </button>
          <button
            onClick={() => setMetric('wins')}
            className={`px-2 py-1 rounded transition-colors ${
              metric === 'wins' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Wins
          </button>
          <button
            onClick={() => setMetric('podiums')}
            className={`px-2 py-1 rounded transition-colors ${
              metric === 'podiums' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Podiums
          </button>
        </div>
      </div>

      {/* Horizontal Bars Container */}
      <div className="space-y-2 mt-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {sortedTeams.map((t, index) => {
          const val = metric === 'points' ? t.totalPoints : metric === 'wins' ? t.totalWins : t.totalPodiums;
          const widthPct = (val / maxValue) * 100;
          const isSelected = selectedTeam === t.team;

          return (
            <div
              key={t.team}
              onClick={() => onSelectTeam && onSelectTeam(t.team)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1c2436] border-emerald-400 shadow-md shadow-emerald-950/40'
                  : 'bg-[#151a26] border-[#222a3b] hover:border-gray-500'
              }`}
            >
              {/* Top row: Team Name & Stat value */}
              <div className="flex items-center justify-between text-xs mb-1 font-sans">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-gray-400 text-[11px]">#{index + 1}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="font-bold text-white tracking-wide">{t.team}</span>
                  {t.championshipTitles > 0 && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono font-semibold flex items-center space-x-1">
                      <Trophy className="w-2.5 h-2.5" />
                      <span>{t.championshipTitles} Titles</span>
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs font-bold text-emerald-400">
                  {val.toLocaleString()} {metric}
                </div>
              </div>

              {/* Horizontal Bar */}
              <div className="w-full h-3 bg-[#0d1017] rounded-full overflow-hidden border border-[#1f2638]">
                <div
                  style={{
                    width: `${Math.max(4, widthPct)}%`,
                    backgroundColor: t.color,
                  }}
                  className="h-full rounded-full transition-all duration-300 relative group"
                />
              </div>

              {/* Sub-metrics: Points / Wins / Podiums / DNF Rate */}
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-gray-400">
                <span>
                  Wins: <strong className="text-gray-200">{t.totalWins}</strong> • Podiums: <strong className="text-gray-200">{t.totalPodiums}</strong>
                </span>
                <span className="flex items-center space-x-1">
                  <span>DNF Rate:</span>
                  <strong className={t.dnfRate > 15 ? 'text-rose-400' : 'text-emerald-400'}>
                    {t.dnfRate}%
                  </strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
