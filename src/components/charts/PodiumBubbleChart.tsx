import React, { useState } from 'react';
import { PodiumBubbleItem } from '../../utils/f1-analytics';
import { Trophy, Medal, Sparkles, Filter } from 'lucide-react';

interface PodiumBubbleChartProps {
  podiumItems: PodiumBubbleItem[];
  onSelectDriver?: (driver: string) => void;
  selectedDriver?: string;
}

export const PodiumBubbleChart: React.FC<PodiumBubbleChartProps> = ({
  podiumItems,
  onSelectDriver,
  selectedDriver,
}) => {
  const [hoveredDriver, setHoveredDriver] = useState<PodiumBubbleItem | null>(null);

  // Take top drivers with podiums
  const drivers = podiumItems.slice(0, 16);
  const maxPodiums = Math.max(...drivers.map((d) => d.podiums), 1);

  // Compute packed bubble layout inside 600x340 coordinate space
  // We place bubbles using spiral circle packing approximation
  const bubbles = drivers.map((d, index) => {
    // Radius proportional to podiums (min 20, max 62)
    const r = Math.max(22, Math.min(64, Math.sqrt(d.podiums / maxPodiums) * 62));

    // Arrange in a pleasant organic cluster around center (300, 170)
    const angle = index * 0.95;
    const distance = index === 0 ? 0 : 38 + index * 17;
    const cx = 300 + Math.cos(angle) * distance * 0.9;
    const cy = 170 + Math.sin(angle) * distance * 0.65;

    return {
      ...d,
      r,
      cx: Math.max(r + 10, Math.min(590 - r, cx)),
      cy: Math.max(r + 10, Math.min(330 - r, cy)),
    };
  });

  const activeDriver = hoveredDriver || drivers.find((d) => d.driver === selectedDriver) || drivers[0];

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Podium Achievements by Driver & Team
            </h3>
            <span className="text-[10px] bg-amber-950/60 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
              Packed Bubble Chart
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Bubble size scaled to total podium finishes (P1 wins, P2, and P3 conversions)
          </p>
        </div>
        <Trophy className="w-5 h-5 text-amber-400" />
      </div>

      {/* Bubble Chart Canvas & Tooltip Panel */}
      <div className="relative flex-1 min-h-[300px] mt-3 bg-[#0b0e14] rounded-lg overflow-hidden border border-[#1b2230] flex items-center justify-center">
        <svg viewBox="0 0 600 340" className="w-full h-full object-contain">
          {bubbles.map((b) => {
            const isHovered = hoveredDriver?.driver === b.driver;
            const isSelected = selectedDriver === b.driver;

            return (
              <g
                key={b.driver}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectDriver && onSelectDriver(b.driver)}
                onMouseEnter={() => setHoveredDriver(b)}
                onMouseLeave={() => setHoveredDriver(null)}
              >
                {/* Bubble Outer Ring */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={b.cx}
                    cy={b.cy}
                    r={b.r + 5}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-spin"
                  />
                )}

                {/* Main Bubble */}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={b.r}
                  fill={b.color}
                  fillOpacity={isHovered || isSelected ? 0.95 : 0.75}
                  stroke="#ffffff"
                  strokeWidth={isHovered || isSelected ? 2.5 : 1}
                  className="transition-all hover:scale-105 origin-center"
                />

                {/* Inner Text Label */}
                <text
                  x={b.cx}
                  y={b.cy - (b.r > 35 ? 4 : 0)}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={b.r > 45 ? '11' : b.r > 30 ? '9' : '8'}
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {b.driver.split(' ').pop()}
                </text>

                {/* Podiums Count */}
                {b.r > 28 && (
                  <text
                    x={b.cx}
                    y={b.cy + 12}
                    textAnchor="middle"
                    fill="#fef08a"
                    fontSize={b.r > 45 ? '11' : '9'}
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow"
                  >
                    {b.podiums} Podiums
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Selected Driver floating card */}
        {activeDriver && (
          <div className="absolute top-2 right-2 bg-[#141926]/95 backdrop-blur-md border border-[#273247] p-2.5 rounded-lg shadow-xl text-xs font-mono max-w-[210px]">
            <div className="flex items-center space-x-1.5 text-white font-sans font-bold">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeDriver.color }}
              />
              <span className="truncate">{activeDriver.driver}</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-1.5">{activeDriver.team}</p>

            <div className="space-y-1 text-[11px] pt-1 border-t border-[#222a3b]">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Podiums:</span>
                <span className="text-amber-400 font-bold">{activeDriver.podiums}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Victories (P1):</span>
                <span className="text-emerald-400 font-bold">{activeDriver.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">P2 / P3 Splits:</span>
                <span className="text-gray-300">{activeDriver.p2Count} / {activeDriver.p3Count}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 text-[11px] font-mono text-gray-400 border-t border-[#1a2130]">
        <span>Color corresponds to constructor team</span>
        <span>Hover or click any bubble for P1/P2/P3 breakdown</span>
      </div>
    </div>
  );
};
