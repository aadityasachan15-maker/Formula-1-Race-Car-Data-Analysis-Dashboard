import React from 'react';
import { DriverLeaderboardItem } from '../../utils/f1-analytics';
import { Trophy, Award, Medal, Flag } from 'lucide-react';

interface DriverLeaderboardChartProps {
  leaderboard: DriverLeaderboardItem[];
  topN: number;
  onSelectDriver?: (driver: string) => void;
  selectedDriver?: string;
}

export const DriverLeaderboardChart: React.FC<DriverLeaderboardChartProps> = ({
  leaderboard,
  topN,
  onSelectDriver,
  selectedDriver,
}) => {
  const maxPoints = Math.max(...leaderboard.map((d) => d.totalPoints), 1);

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Driver Performance Leaderboard
            </h3>
            <span className="text-[10px] bg-cyan-950/60 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-800">
              Top {topN} Parameter
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Cumulative championship points, Grand Prix victories, and podium finishes
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
          <span className="flex items-center space-x-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Wins</span>
          </span>
          <span className="flex items-center space-x-1">
            <Medal className="w-3.5 h-3.5 text-blue-400" />
            <span>Podiums</span>
          </span>
        </div>
      </div>

      {/* Vertical / Column Bar Chart (Tableau Styled) */}
      <div className="mt-4 flex-1 flex flex-col justify-end">
        {/* Bars Container */}
        <div className="h-64 flex items-end justify-between gap-1.5 sm:gap-2 px-1 border-b border-[#222a3b]">
          {leaderboard.map((item, index) => {
            const heightPct = (item.totalPoints / maxPoints) * 100;
            const isSelected = selectedDriver === item.driver;
            const isPodiumRank = index < 3;

            return (
              <div
                key={item.driver}
                onClick={() => onSelectDriver && onSelectDriver(item.driver)}
                className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end"
                title={`${item.driver} (${item.team}) - ${item.totalPoints.toLocaleString()} Pts, ${item.wins} Wins, ${item.podiums} Podiums`}
              >
                {/* Points label on top of bar */}
                <span className="text-[9px] font-mono text-gray-400 group-hover:text-cyan-300 transition-colors mb-1 truncate">
                  {item.totalPoints > 999
                    ? `${(item.totalPoints / 1000).toFixed(1)}k`
                    : item.totalPoints}
                </span>

                {/* The Bar */}
                <div
                  style={{ height: `${Math.max(8, heightPct)}%` }}
                  className={`w-full max-w-[36px] rounded-t-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between p-0.5 ${
                    isSelected
                      ? 'bg-gradient-to-t from-cyan-600 to-cyan-300 ring-2 ring-cyan-400 shadow-lg shadow-cyan-900/50'
                      : isPodiumRank
                      ? 'bg-gradient-to-t from-[#c41400] via-[#e10600] to-[#ff6660] group-hover:brightness-125'
                      : 'bg-gradient-to-t from-[#1e293b] via-[#334155] to-[#475569] group-hover:bg-[#38bdf8]/60'
                  }`}
                >
                  {/* Wins badge inside top if tall enough */}
                  {heightPct > 35 && item.wins > 0 && (
                    <div className="text-[8px] font-mono font-bold text-white text-center leading-tight">
                      {item.wins}W
                    </div>
                  )}
                  {/* Podiums badge inside bottom if tall enough */}
                  {heightPct > 55 && (
                    <div className="text-[8px] font-mono text-white/80 text-center pb-0.5">
                      {item.podiums}P
                    </div>
                  )}
                </div>

                {/* Driver Code / Rank underneath */}
                <div className="mt-2 text-center">
                  <span
                    className={`block text-[10px] font-mono font-bold uppercase transition-colors ${
                      isSelected
                        ? 'text-cyan-300'
                        : isPodiumRank
                        ? 'text-red-400 font-extrabold'
                        : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {item.driverCode || item.driver.slice(0, 3)}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono block">
                    #{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 3 Quick Spotlight */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#1a2130]">
        {leaderboard.slice(0, 3).map((d, i) => (
          <div
            key={d.driver}
            className="bg-[#151a26] border border-[#222a3b] p-2 rounded-lg text-center"
          >
            <div className="flex items-center justify-center space-x-1 text-[10px] text-amber-400 font-mono mb-0.5">
              <Trophy className="w-3 h-3" />
              <span>Rank #{i + 1}</span>
            </div>
            <div className="text-xs font-bold text-white truncate font-sans">{d.driver}</div>
            <div className="text-[11px] font-mono font-bold text-cyan-400">
              {d.totalPoints.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
