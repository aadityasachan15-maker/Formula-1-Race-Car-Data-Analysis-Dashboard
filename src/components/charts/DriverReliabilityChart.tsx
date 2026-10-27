import React, { useState } from 'react';
import { DriverReliabilityStats, DNFAttribution } from '../../types/f1';
import { AlertCircle, ShieldCheck, Wrench, Flame, Zap, HelpCircle } from 'lucide-react';

interface DriverReliabilityChartProps {
  reliabilityStats: DriverReliabilityStats[];
  onSelectDriver?: (driver: string) => void;
  selectedDriver?: string;
}

const FAILURE_COLORS: Record<Exclude<DNFAttribution, 'None'>, { color: string; label: string; icon: any }> = {
  'Engine failure': { color: '#E10600', label: 'Engine Failure', icon: Flame },
  'Brake failure': { color: '#F97316', label: 'Brake Failure', icon: Zap },
  'Collision': { color: '#EAB308', label: 'Collision / Incident', icon: AlertCircle },
  'Mechanical': { color: '#8B5CF6', label: 'Mechanical Failure', icon: Wrench },
  'Other': { color: '#64748B', label: 'Other / Hyd / Elec', icon: HelpCircle },
};

export const DriverReliabilityChart: React.FC<DriverReliabilityChartProps> = ({
  reliabilityStats,
  onSelectDriver,
  selectedDriver,
}) => {
  const [displayMode, setDisplayMode] = useState<'count' | 'percent'>('count');
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const displayedDrivers = reliabilityStats.slice(0, visibleCount);

  // Maximum DNF count for scale
  const maxDnf = Math.max(...displayedDrivers.map((d) => d.dnfCount), 1);

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f2637] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Driver Reliability Analysis
            </h3>
            <span className="text-[10px] bg-rose-950/60 text-rose-300 font-mono px-2 py-0.5 rounded border border-rose-800">
              Stacked Failure Stack
            </span>
          </div>
          <p className="text-xs text-gray-400">
            DNF breakdown across 5 failure categories (FIA Technical Compliance Analysis)
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#181e2b] rounded-lg p-0.5 border border-[#273247]">
            <button
              onClick={() => setDisplayMode('count')}
              className={`px-2 py-1 text-[11px] font-mono rounded ${
                displayMode === 'count'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              DNF Counts
            </button>
            <button
              onClick={() => setDisplayMode('percent')}
              className={`px-2 py-1 text-[11px] font-mono rounded ${
                displayMode === 'percent'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reliability %
            </button>
          </div>

          <select
            value={visibleCount}
            onChange={(e) => setVisibleCount(Number(e.target.value))}
            className="bg-[#181e2b] border border-[#273247] text-gray-300 text-[11px] font-mono rounded-lg px-2 py-1"
          >
            <option value={8}>Top 8</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
          </select>
        </div>
      </div>

      {/* Stacked Bar List */}
      <div className="space-y-2.5 mt-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {displayedDrivers.map((driver) => {
          const isSelected = selectedDriver === driver.driver;
          const reasons = Object.keys(FAILURE_COLORS) as Array<Exclude<DNFAttribution, 'None'>>;

          return (
            <div
              key={driver.driver}
              onClick={() => onSelectDriver && onSelectDriver(driver.driver)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1b2233] border-rose-500 shadow-md shadow-rose-950/40'
                  : 'bg-[#151a26] border-[#222a3b] hover:border-gray-500'
              }`}
            >
              {/* Top row: Driver, team, Reliability rate badge */}
              <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white tracking-wide">{driver.driver}</span>
                  <span className="text-[10px] text-gray-400 font-mono">({driver.team})</span>
                </div>
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-gray-400 text-[11px]">
                    DNFs: <strong className="text-rose-400">{driver.dnfCount}</strong> / {driver.totalRaces}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      driver.reliabilityScore >= 89
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                        : driver.reliabilityScore >= 85
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                        : 'bg-rose-950/70 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {driver.reliabilityScore}% Reliable
                  </span>
                </div>
              </div>

              {/* Stacked Bar visualization */}
              <div className="w-full h-3.5 bg-[#0e121a] rounded-full overflow-hidden flex border border-[#1f2738]">
                {displayMode === 'count' ? (
                  // Width proportional to max DNF count
                  reasons.map((reason) => {
                    const count = driver.dnfByReason[reason] || 0;
                    if (count === 0) return null;
                    const pctOfMax = (count / maxDnf) * 100;
                    return (
                      <div
                        key={reason}
                        style={{
                          width: `${pctOfMax}%`,
                          backgroundColor: FAILURE_COLORS[reason].color,
                        }}
                        className="h-full hover:brightness-125 transition-all"
                        title={`${driver.driver} - ${reason}: ${count} DNFs`}
                      />
                    );
                  })
                ) : (
                  // Full 100% normalized stack of failure breakdown
                  reasons.map((reason) => {
                    const count = driver.dnfByReason[reason] || 0;
                    if (count === 0 || driver.dnfCount === 0) return null;
                    const pctOfTotal = (count / driver.dnfCount) * 100;
                    return (
                      <div
                        key={reason}
                        style={{
                          width: `${pctOfTotal}%`,
                          backgroundColor: FAILURE_COLORS[reason].color,
                        }}
                        className="h-full hover:brightness-125 transition-all"
                        title={`${driver.driver} - ${reason}: ${count} (${pctOfTotal.toFixed(1)}%)`}
                      />
                    );
                  })
                )}
              </div>

              {/* Mini counts breakdown */}
              <div className="flex items-center space-x-3 mt-1.5 text-[10px] font-mono text-gray-400">
                {reasons.map((reason) => {
                  const c = driver.dnfByReason[reason] || 0;
                  if (c === 0) return null;
                  return (
                    <span key={reason} className="flex items-center space-x-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: FAILURE_COLORS[reason].color }}
                      />
                      <span>{reason.split(' ')[0]}: {c}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 pt-3 border-t border-[#1a2130] text-[11px] font-mono text-gray-400">
        {(Object.keys(FAILURE_COLORS) as Array<Exclude<DNFAttribution, 'None'>>).map((reason) => (
          <div key={reason} className="flex items-center space-x-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: FAILURE_COLORS[reason].color }}
            />
            <span className="truncate">{FAILURE_COLORS[reason].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
