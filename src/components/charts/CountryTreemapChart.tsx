import React, { useState } from 'react';
import { CountryParticipationItem } from '../../utils/f1-analytics';
import { Globe, MapPin, Trophy, Flag, Grid, Table } from 'lucide-react';

interface CountryTreemapChartProps {
  countryData: CountryParticipationItem[];
  onSelectCountry?: (country: string) => void;
  selectedCountry?: string;
}

export const CountryTreemapChart: React.FC<CountryTreemapChartProps> = ({
  countryData,
  onSelectCountry,
  selectedCountry,
}) => {
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');

  const topCountries = countryData.slice(0, 12);
  const totalRaces = countryData.reduce((sum, c) => sum + c.totalRacesHeld, 0) || 1;

  // Color gradient palette for Treemap tiles
  const getTileColor = (index: number) => {
    const colors = [
      '#e10600', // Red 1
      '#d9201a',
      '#cb2d27',
      '#b8332f',
      '#a23938',
      '#8d3d3d',
      '#753e41',
      '#603e43',
      '#4f3d43',
      '#3f3a41',
      '#31353e',
      '#262f3a',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Country-Wise Race Participation
            </h3>
            <span className="text-[10px] bg-blue-950/60 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-800">
              Grand Prix Host Nations
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Historical Grand Prix hosting frequency and circuit density across countries
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-[#181e2b] rounded-lg p-0.5 border border-[#273247] text-xs font-mono">
          <button
            onClick={() => setViewMode('treemap')}
            className={`px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
              viewMode === 'treemap' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-3 h-3" />
            <span>Treemap</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
              viewMode === 'table' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Table className="w-3 h-3" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'treemap' ? (
        /* Treemap Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4 flex-1">
          {topCountries.map((c, i) => {
            const isSelected = selectedCountry === c.country;
            const pct = ((c.totalRacesHeld / totalRaces) * 100).toFixed(1);

            return (
              <div
                key={c.country}
                onClick={() => onSelectCountry && onSelectCountry(c.country)}
                style={{
                  backgroundColor: isSelected ? '#3b82f6' : getTileColor(i),
                }}
                className={`p-3 rounded-lg flex flex-col justify-between cursor-pointer transition-transform hover:scale-[1.02] shadow-md ${
                  isSelected ? 'ring-2 ring-white' : ''
                }`}
              >
                <div>
                  <span className="text-[10px] text-white/70 font-mono block uppercase">
                    Rank #{i + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white font-sans truncate">
                    {c.country}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-white/20 flex items-baseline justify-between text-white font-mono">
                  <span className="text-sm font-extrabold">{c.totalRacesHeld} GP</span>
                  <span className="text-[10px] text-white/80">{c.grandPrixCount} Venue{c.grandPrixCount > 1 ? 's' : ''}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Highlight Table View */
        <div className="mt-3 flex-1 overflow-y-auto max-h-[300px]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#181e2b] text-gray-300 border-b border-[#242d3e] uppercase text-[10px]">
              <tr>
                <th className="py-2 px-3">Country</th>
                <th className="py-2 px-2 text-center">Tracks</th>
                <th className="py-2 px-3 text-right">Races Logged</th>
                <th className="py-2 px-3 text-right">Global Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2637]">
              {countryData.map((c, idx) => (
                <tr
                  key={c.country}
                  onClick={() => onSelectCountry && onSelectCountry(c.country)}
                  className={`cursor-pointer transition-colors ${
                    selectedCountry === c.country ? 'bg-[#1e283b] text-blue-400' : 'hover:bg-[#161c28]'
                  }`}
                >
                  <td className="py-2 px-3 font-sans font-semibold text-white flex items-center space-x-1.5">
                    <span className="text-gray-400 text-[10px] font-mono">#{idx + 1}</span>
                    <span>{c.country}</span>
                  </td>
                  <td className="py-2 px-2 text-center text-gray-400">{c.grandPrixCount}</td>
                  <td className="py-2 px-3 text-right font-bold text-gray-200">
                    {c.totalRacesHeld}
                  </td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-bold">
                    {c.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mt-3 pt-2.5 border-t border-[#1a2130]">
        <span>Total Host Nations: {countryData.length} countries</span>
        <span>Lead: United Kingdom & Italy (Evergreen GP hosts)</span>
      </div>
    </div>
  );
};
