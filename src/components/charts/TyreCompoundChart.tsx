import React, { useState } from 'react';
import { TyreDistributionItem } from '../../utils/f1-analytics';
import { Disc, Activity, Thermometer, Clock } from 'lucide-react';

interface TyreCompoundChartProps {
  distribution: TyreDistributionItem[];
  onSelectCompound?: (compound: string) => void;
  selectedCompound?: string;
}

export const TyreCompoundChart: React.FC<TyreCompoundChartProps> = ({
  distribution,
  onSelectCompound,
  selectedCompound,
}) => {
  const [hoveredCompound, setHoveredCompound] = useState<TyreDistributionItem | null>(null);

  const activeCompound = hoveredCompound || distribution.find((d) => d.compound === selectedCompound) || distribution[0];

  // SVG Donut calculation
  const totalCount = distribution.reduce((sum, d) => sum + d.count, 0) || 1;
  let cumulativeAngle = 0;

  const slices = distribution.map((item) => {
    const fraction = item.count / totalCount;
    const startAngle = cumulativeAngle;
    const angle = fraction * 360;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((startAngle + angle - 90) * Math.PI) / 180;

    const radius = 80;
    const innerRadius = 48;
    const cx = 100;
    const cy = 100;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(endRad);
    const iy1 = cy + innerRadius * Math.sin(endRad);
    const ix2 = cx + innerRadius * Math.cos(startRad);
    const iy2 = cy + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix1} ${iy1}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      pathData,
      fraction,
    };
  });

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Tyre Compound Usage Distribution
            </h3>
            <span className="text-[10px] bg-rose-950/60 text-rose-300 font-mono px-2 py-0.5 rounded border border-rose-800">
              Pirelli Compounds
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Soft (C3-C5), Medium (C2-C3), Hard (C1), Intermediate & Wet stint dynamics
          </p>
        </div>
        <Disc className="w-5 h-5 text-gray-400" />
      </div>

      {/* Donut Chart & Telemetry Inspection */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-3 flex-1">
        {/* SVG Donut */}
        <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-45">
            {slices.map((slice) => {
              const isHovered = hoveredCompound?.compound === slice.compound;
              const isSelected = selectedCompound === slice.compound;

              return (
                <path
                  key={slice.compound}
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="#121620"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105 origin-center"
                  onMouseEnter={() => setHoveredCompound(slice)}
                  onMouseLeave={() => setHoveredCompound(null)}
                  onClick={() => onSelectCompound && onSelectCompound(slice.compound)}
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs font-mono uppercase text-gray-400">Selected</span>
            <span
              className="text-sm font-bold font-mono tracking-tight"
              style={{ color: activeCompound.color }}
            >
              {activeCompound.compound}
            </span>
            <span className="text-xs font-mono text-white font-extrabold">
              {activeCompound.percentage}%
            </span>
          </div>
        </div>

        {/* Selected Compound Strategic Telemetry Specs */}
        <div className="flex-1 w-full bg-[#151a26] border border-[#222a3b] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between border-b border-[#222a3b] pb-2">
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: activeCompound.color }}
              />
              <span className="text-xs font-bold text-white font-sans uppercase">
                {activeCompound.compound} Compound Telemetry
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-gray-300">
              {activeCompound.count.toLocaleString()} stints
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
            <div className="bg-[#10141f] p-2 rounded border border-[#1d2433]">
              <span className="text-gray-400 text-[10px] block flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Optimal Window</span>
              </span>
              <span className="text-xs font-bold text-white">
                {activeCompound.avgLapsDegradation} Laps
              </span>
            </div>
            <div className="bg-[#10141f] p-2 rounded border border-[#1d2433]">
              <span className="text-gray-400 text-[10px] block flex items-center space-x-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>Pace Delta / Lap</span>
              </span>
              <span
                className={`text-xs font-bold ${
                  activeCompound.speedDeltaSec <= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {activeCompound.speedDeltaSec > 0 ? `+${activeCompound.speedDeltaSec}s` : `${activeCompound.speedDeltaSec}s`}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed font-sans pt-1">
            {activeCompound.compound === 'Soft' &&
              'Used for explosive qualifying runs and final undercut sprints; rapid thermal cliff beyond lap 16.'}
            {activeCompound.compound === 'Medium' &&
              'The baseline race tire for flexible 1-stop and 2-stop strategies, balancing grip with thermal durability.'}
            {activeCompound.compound === 'Hard' &&
              'Maximum tire longevity; resistant to blistering on high vertical load circuits like Silverstone and Suzuka.'}
            {activeCompound.compound === 'Intermediate' &&
              'Green-banded wet tire channeling 30 liters/second; essential when track moisture exceeds damp threshold.'}
            {activeCompound.compound === 'Wet' &&
              'Blue-banded monsoon tire displacing 85 liters/second at 300 km/h; deploys during red-flag standing water.'}
          </p>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mt-3 pt-3 border-t border-[#1a2130] text-[10px] font-mono text-gray-400">
        {distribution.map((d) => (
          <button
            key={d.compound}
            onClick={() => onSelectCompound && onSelectCompound(d.compound)}
            className="flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span>{d.compound} ({d.percentage}%)</span>
          </button>
        ))}
      </div>
    </div>
  );
};
