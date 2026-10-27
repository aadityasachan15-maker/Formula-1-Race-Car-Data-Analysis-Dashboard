import React, { useState } from 'react';
import { Circuit } from '../../types/f1';
import { MapPin, Info, Compass, Flag, Gauge } from 'lucide-react';

interface GlobalDriverMapProps {
  circuits: Circuit[];
  selectedCircuitId?: string;
  onSelectCircuit?: (circuit: Circuit) => void;
}

export const GlobalDriverMap: React.FC<GlobalDriverMapProps> = ({
  circuits,
  selectedCircuitId,
  onSelectCircuit,
}) => {
  const [hoveredCircuit, setHoveredCircuit] = useState<Circuit | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  // Convert lat/lng to SVG coordinates (Mercator-like normalized 0..1000, 0..500)
  const projectCoordinates = (lat: number, lng: number) => {
    // lng: -180..180 -> 40..960
    const x = ((lng + 180) / 360) * 920 + 40;
    // lat: 85..-85 -> 40..460
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = 250 - (mercN / Math.PI) * 160;
    return { x: Math.max(30, Math.min(970, x)), y: Math.max(30, Math.min(470, y)) };
  };

  const filteredCircuits = circuits.filter((c) => {
    if (filterType === 'ALL') return true;
    return c.circuit_type === filterType;
  });

  const activeCircuit = hoveredCircuit || circuits.find((c) => c.circuit_id === selectedCircuitId) || circuits[0];

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f2637] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e10600]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Global Driver & Circuit Distribution
            </h3>
            <span className="text-[10px] bg-[#1a2130] text-gray-300 font-mono px-2 py-0.5 rounded border border-[#293448]">
              29 Grand Prix Venues
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Geographic dispersion of Formula 1 circuits across 5 continents
          </p>
        </div>

        {/* Track Type Filters */}
        <div className="flex items-center space-x-1.5 text-xs">
          {['ALL', 'Permanent', 'Street', 'Street/Park'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                filterType === t
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-[#181e2b] text-gray-400 hover:text-white border border-[#263145]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Map Surface & Details Panel */}
      <div className="relative flex-1 min-h-[340px] mt-3 bg-[#0a0d14] rounded-lg overflow-hidden border border-[#1b2230]">
        {/* World Grid Lines */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}
        >
          {/* Latitude & Longitude grid lines */}
          <g stroke="#1a2233" strokeWidth="0.5" strokeDasharray="3 3">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line key={`x-${x}`} x1={x} y1="20" x2={x} y2="480" />
            ))}
            {[100, 180, 250, 320, 400].map((y) => (
              <line key={`y-${y}`} x1="20" y1={y} x2="980" y2={y} />
            ))}
            {/* Equator & Prime Meridian */}
            <line x1="20" y1="250" x2="980" y2="250" stroke="#25324d" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="500" y1="20" x2="500" y2="480" stroke="#25324d" strokeWidth="1" strokeDasharray="4 2" />
          </g>

          {/* Continents Outline Stylized Shapes for F1 Tableau Aesthetic */}
          <g fill="#141a26" stroke="#232e42" strokeWidth="1">
            {/* North America */}
            <path d="M 140 80 Q 220 70 260 110 T 290 200 T 210 260 T 170 240 T 110 160 Z" />
            {/* South America */}
            <path d="M 270 270 Q 340 280 340 350 T 300 450 T 250 420 T 260 320 Z" />
            {/* Europe */}
            <path d="M 460 90 Q 560 80 570 140 T 520 200 T 450 180 T 440 120 Z" />
            {/* Africa */}
            <path d="M 470 200 Q 570 200 570 300 T 530 400 T 470 350 T 460 250 Z" />
            {/* Asia */}
            <path d="M 570 80 Q 820 70 850 180 T 780 270 T 660 250 T 580 180 Z" />
            {/* Australia */}
            <path d="M 770 320 Q 870 320 860 410 T 780 420 T 760 360 Z" />
          </g>

          {/* Circuit Pins */}
          {filteredCircuits.map((c) => {
            const { x, y } = projectCoordinates(c.lat, c.lng);
            const isHovered = hoveredCircuit?.circuit_id === c.circuit_id;
            const isSelected = selectedCircuitId === c.circuit_id;

            let color = '#3B82F6';
            if (c.type === 'Street' || c.circuit_type === 'Street') color = '#F59E0B';
            else if (c.type === 'Street/Park' || c.circuit_type === 'Street/Park') color = '#06B6D4';
            else if (c.circuit_type === 'Permanent') color = '#E10600';

            return (
              <g
                key={c.circuit_id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectCircuit && onSelectCircuit(c)}
                onMouseEnter={() => setHoveredCircuit(c)}
                onMouseLeave={() => setHoveredCircuit(null)}
              >
                {/* Outer radar pulse on select/hover */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}
                {/* Pin Halo */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered || isSelected ? 8 : 5}
                  fill={color}
                  fillOpacity={isHovered || isSelected ? 0.9 : 0.75}
                  stroke="#ffffff"
                  strokeWidth={isHovered || isSelected ? 2 : 1}
                />
                {/* City name text */}
                {(isHovered || isSelected || ['monza', 'monaco', 'silverstone', 'suzuka', 'cota', 'mexico'].includes(c.circuit_id)) && (
                  <text
                    x={x + 9}
                    y={y + 4}
                    fill="#e2e8f0"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow"
                  >
                    {c.city}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Active Circuit Telemetry Card */}
        {activeCircuit && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#131722]/95 backdrop-blur-md border border-[#263145] p-3 rounded-lg shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 flex items-center space-x-1">
                <Flag className="w-3 h-3 text-[#e10600]" />
                <span>{activeCircuit.country} • {activeCircuit.city}</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                activeCircuit.type === 'Street' || activeCircuit.circuit_type === 'Street'
                  ? 'bg-amber-950/70 text-amber-400 border border-amber-800'
                  : activeCircuit.type === 'Street/Park'
                  ? 'bg-cyan-950/70 text-cyan-400 border border-cyan-800'
                  : 'bg-red-950/70 text-red-400 border border-red-800'
              }`}>
                {activeCircuit.type || activeCircuit.circuit_type}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white font-sans">{activeCircuit.circuit_name || activeCircuit.name}</h4>
            <p className="text-[11px] text-gray-400 mb-2">{activeCircuit.grand_prix}</p>

            <div className="grid grid-cols-4 gap-1.5 text-center pt-2 border-t border-[#222a3b] font-mono">
              <div className="bg-[#0e121a] p-1.5 rounded border border-[#1f2638]">
                <span className="text-[9px] text-gray-400 uppercase block">Length</span>
                <span className="text-xs font-bold text-white">{activeCircuit.lap_km || activeCircuit.length_km} km</span>
              </div>
              <div className="bg-[#0e121a] p-1.5 rounded border border-[#1f2638]">
                <span className="text-[9px] text-gray-400 uppercase block">Laps</span>
                <span className="text-xs font-bold text-white">{activeCircuit.laps}</span>
              </div>
              <div className="bg-[#0e121a] p-1.5 rounded border border-[#1f2638]">
                <span className="text-[9px] text-gray-400 uppercase block">Altitude</span>
                <span className="text-xs font-bold text-amber-400">{activeCircuit.altitude_m}m</span>
              </div>
              <div className="bg-[#0e121a] p-1.5 rounded border border-[#1f2638]">
                <span className="text-[9px] text-gray-400 uppercase block">Direction</span>
                <span className="text-xs font-bold text-cyan-400 truncate">{activeCircuit.direction}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 text-[11px] text-gray-400 border-t border-[#1a2130]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span>Street (Monaco, Baku, Vegas)</span>
          </span>
          <span className="flex items-center space-x-1.5 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e10600]" />
            <span>High-Speed (Monza, Silverstone)</span>
          </span>
          <span className="flex items-center space-x-1.5 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span>Technical (Suzuka, Spa, COTA)</span>
          </span>
        </div>
        <span className="text-[10px] font-mono text-gray-400">
          Click any circuit node to inspect track metadata
        </span>
      </div>
    </div>
  );
};
