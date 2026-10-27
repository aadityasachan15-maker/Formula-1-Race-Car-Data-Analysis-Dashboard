import React, { useState } from 'react';
import { SAMPLE_LAP_INTELLIGENCE, SAMPLE_QUALIFYING_RESULTS } from '../../data/f1-dataset';
import { Activity, Gauge, Zap, Wind, Timer, Crosshair } from 'lucide-react';

export const TelemetryLapChart: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<string>('Lewis Hamilton');
  const [activeTab, setActiveTab] = useState<'laps' | 'qualifying'>('laps');

  const driverLaps = SAMPLE_LAP_INTELLIGENCE.filter((l) => l.driver === selectedDriver);

  // Available drivers in sample
  const driversInSample = Array.from(new Set(SAMPLE_LAP_INTELLIGENCE.map((l) => l.driver)));

  return (
    <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f2637] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Lap Intelligence & Race Telemetry
            </h3>
            <span className="text-[10px] bg-cyan-950/60 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-800">
              High-Frequency Sensors
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Sector splits, speed trap telemetry, tyre age degradation & qualifying deltas
          </p>
        </div>

        {/* View Toggle & Driver select */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#181e2b] rounded-lg p-0.5 border border-[#273247] text-xs font-mono">
            <button
              onClick={() => setActiveTab('laps')}
              className={`px-2 py-1 rounded transition-colors ${
                activeTab === 'laps' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Lap Stints
            </button>
            <button
              onClick={() => setActiveTab('qualifying')}
              className={`px-2 py-1 rounded transition-colors ${
                activeTab === 'qualifying' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Qualifying Delta
            </button>
          </div>

          {activeTab === 'laps' && (
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="bg-[#181e2b] border border-[#273247] text-gray-200 text-xs font-mono rounded-lg px-2.5 py-1"
            >
              {driversInSample.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'laps' ? (
        <div className="mt-4 space-y-3 flex-1">
          {/* Telemetry Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-[#161c28] p-2.5 rounded-lg border border-[#242e40]">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Driver Focus</span>
              <span className="text-xs font-bold text-white font-sans">{selectedDriver}</span>
            </div>
            <div className="bg-[#161c28] p-2.5 rounded-lg border border-[#242e40]">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Max Speed Trap</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                {Math.max(...driverLaps.map((l) => l.speed_trap_kmh), 340)} km/h
              </span>
            </div>
            <div className="bg-[#161c28] p-2.5 rounded-lg border border-[#242e40]">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Best Lap Time</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">
                {Math.min(...driverLaps.map((l) => l.lap_time_s), 81.25)}s
              </span>
            </div>
            <div className="bg-[#161c28] p-2.5 rounded-lg border border-[#242e40]">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">DRS Deployment</span>
              <span className="text-xs font-bold text-amber-400 font-mono">Active in S2/S3</span>
            </div>
          </div>

          {/* Stint Lap Breakdown Table */}
          <div className="overflow-x-auto rounded-lg border border-[#222a3b] max-h-[220px]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#171d2a] text-gray-300 uppercase text-[10px] border-b border-[#242e40]">
                <tr>
                  <th className="py-2 px-3">Lap</th>
                  <th className="py-2 px-3">Lap Time</th>
                  <th className="py-2 px-2">Tyre</th>
                  <th className="py-2 px-2 text-center">Age</th>
                  <th className="py-2 px-3 text-right">Speed Trap</th>
                  <th className="py-2 px-3 text-right">S1 / S2 / S3</th>
                  <th className="py-2 px-2 text-center">DRS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2638]">
                {driverLaps.map((l) => (
                  <tr key={`${l.lap}-${l.driver}`} className="hover:bg-[#161c28]">
                    <td className="py-2 px-3 font-bold text-white">Lap {l.lap}</td>
                    <td className="py-2 px-3 text-cyan-300 font-bold">{l.lap_time_s}s</td>
                    <td className="py-2 px-2">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          l.tyre_compound === 'Soft'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : l.tyre_compound === 'Medium'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-200 border border-slate-600'
                        }`}
                      >
                        {l.tyre_compound}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center text-gray-300">{l.tyre_age_laps} L</td>
                    <td className="py-2 px-3 text-right text-emerald-400 font-bold">
                      {l.speed_trap_kmh} km/h
                    </td>
                    <td className="py-2 px-3 text-right text-gray-400">
                      {l.sector_1_s}s / {l.sector_2_s}s / {l.sector_3_s}s
                    </td>
                    <td className="py-2 px-2 text-center">
                      {l.drs_active ? (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded border border-emerald-500/40">
                          ON
                        </span>
                      ) : (
                        <span className="text-[9px] text-gray-400">OFF</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Qualifying Grid & Pole Delta View */
        <div className="mt-4 flex-1 overflow-y-auto max-h-[300px]">
          <div className="space-y-1.5">
            {SAMPLE_QUALIFYING_RESULTS.map((q) => (
              <div
                key={q.driver}
                className="bg-[#151a26] border border-[#222a3b] p-2.5 rounded-lg flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-amber-400 w-6">
                    P{q.grid}
                  </span>
                  <span className="font-bold text-white font-sans">{q.driver}</span>
                  <span className="text-[10px] text-gray-400 font-mono">({q.team})</span>
                </div>

                <div className="flex items-center space-x-4 font-mono">
                  <span className="text-gray-300">Q3: {q.q3_s.toFixed(3)}s</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      q.delta_to_pole_s === 0
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-[#1b2230] text-gray-300'
                    }`}
                  >
                    {q.delta_to_pole_s === 0 ? 'POLE' : `+${q.delta_to_pole_s.toFixed(3)}s`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
