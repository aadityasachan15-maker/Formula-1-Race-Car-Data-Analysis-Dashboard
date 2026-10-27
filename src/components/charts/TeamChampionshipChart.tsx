import React, { useState } from 'react';
import { ChampionshipStanding } from '../../types/f1';
import { Trophy, TrendingUp, Flag } from 'lucide-react';

interface TeamChampionshipChartProps {
  standings: ChampionshipStanding[];
  selectedSeason?: 'ALL' | number;
}

export const TeamChampionshipChart: React.FC<TeamChampionshipChartProps> = ({
  standings,
  selectedSeason,
}) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([
    'Red Bull Racing',
    'Mercedes-AMG Petronas',
    'Scuderia Ferrari',
    'McLaren F1 Team',
  ]);

  const allSeasons = Array.from({ length: 17 }, (_, i) => 2010 + i);

  // Filter standings based on selected teams
  const filteredStandings = standings.filter((s) => selectedTeams.includes(s.team));

  const toggleTeam = (teamName: string) => {
    if (selectedTeams.includes(teamName)) {
      if (selectedTeams.length > 1) {
        setSelectedTeams(selectedTeams.filter((t) => t !== teamName));
      }
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  const maxPoints = Math.max(...standings.map((s) => s.points), 860);

  const teamColors: Record<string, string> = {
    'Red Bull Racing': '#1434CB',
    'Mercedes-AMG Petronas': '#00D2BE',
    'Scuderia Ferrari': '#E10600',
    'McLaren F1 Team': '#FF8000',
    'Aston Martin Aramco': '#229971',
    'Alpine F1 Team': '#0090FF',
  };

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f2637] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Team Championship Performance Analysis
            </h3>
            <span className="text-[10px] bg-amber-950/60 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
              17 Seasons Trajectory
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Season-by-season championship point trajectories & regulatory dominance shifts
          </p>
        </div>

        {/* Team Toggles for Benchmarking */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.keys(teamColors).map((t) => {
            const active = selectedTeams.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTeam(t)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-all flex items-center space-x-1 border ${
                  active
                    ? 'bg-[#1e2638] text-white border-gray-400 font-bold'
                    : 'bg-[#141822] text-gray-400 border-[#222a3b] opacity-60'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: teamColors[t] }}
                />
                <span className="truncate max-w-[90px]">{t.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Vertical Bar Chart */}
      <div className="mt-4 flex-1 flex flex-col justify-end">
        <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 px-1 border-b border-[#222a3b] overflow-x-auto pb-1">
          {allSeasons.map((year) => {
            const seasonRows = standings.filter(
              (s) => s.year === year && selectedTeams.includes(s.team)
            );
            const isHighlightYear = selectedSeason === year;

            return (
              <div
                key={year}
                className={`flex-1 min-w-[32px] sm:min-w-[42px] flex flex-col items-center group ${
                  isHighlightYear ? 'bg-[#182030] rounded-t-lg p-0.5' : ''
                }`}
              >
                {/* Grouped Bars Container */}
                <div className="w-full flex items-end justify-center space-x-0.5 h-56">
                  {seasonRows.map((entry) => {
                    const heightPct = (entry.points / maxPoints) * 100;
                    return (
                      <div
                        key={entry.team}
                        style={{
                          height: `${Math.max(4, heightPct)}%`,
                          backgroundColor: entry.color,
                        }}
                        className="w-1.5 sm:w-2 rounded-t-sm transition-all duration-300 hover:brightness-125"
                        title={`${year} - ${entry.team}: ${entry.points} pts, Rank #${entry.rank}, ${entry.wins} wins`}
                      />
                    );
                  })}
                </div>

                {/* Season Year Label */}
                <span
                  className={`mt-1.5 text-[10px] font-mono tracking-tight transition-colors ${
                    isHighlightYear
                      ? 'text-amber-400 font-bold'
                      : year === 2014 || year === 2022 || year === 2026
                      ? 'text-cyan-400 font-bold'
                      : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  '{year.toString().slice(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Eras Footnote */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#1a2130] text-[10px] font-mono text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-gray-300">
            <span className="w-2 h-2 rounded bg-blue-500" />
            <span>2010-13: V8 Era (Red Bull)</span>
          </span>
          <span className="flex items-center space-x-1 text-gray-300">
            <span className="w-2 h-2 rounded bg-teal-400" />
            <span>2014-21: Turbo Hybrid (Mercedes)</span>
          </span>
          <span className="flex items-center space-x-1 text-gray-300">
            <span className="w-2 h-2 rounded bg-amber-500" />
            <span>2022-26: Ground Effect (Red Bull / McLaren)</span>
          </span>
        </div>
        <span className="text-gray-400">
          Hover any bar for constructor points & wins
        </span>
      </div>
    </div>
  );
};
