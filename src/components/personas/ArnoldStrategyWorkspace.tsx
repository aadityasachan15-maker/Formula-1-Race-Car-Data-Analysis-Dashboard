import React, { useState } from 'react';
import { simulateTyreStrategy, TyreStrategySimulationResult } from '../../utils/f1-analytics';
import { CIRCUITS, TEAMS_DATA, DRIVERS_DIRECTORY } from '../../data/f1-dataset';
import { CircuitType, TyreCompound } from '../../types/f1';
import { Compass, Gauge, ShieldAlert, Users, Zap, CheckCircle2, Sliders, ChevronRight } from 'lucide-react';

export const ArnoldStrategyWorkspace: React.FC = () => {
  const [selectedCircuitType, setSelectedCircuitType] = useState<CircuitType>('Street');
  const [selectedStrategy, setSelectedStrategy] = useState<
    'One-Stop (Med-Hard)' | 'Two-Stop (Soft-Med-Med)' | 'Aggressive (Soft-Soft-Hard)' | 'Rain-Contingency (Inter-Dry)'
  >('One-Stop (Med-Hard)');
  const [raceLaps, setRaceLaps] = useState<number>(55);
  const [targetConstructor, setTargetConstructor] = useState<string>('Alpine F1 Team');

  const simulation: TyreStrategySimulationResult = simulateTyreStrategy(
    selectedCircuitType,
    raceLaps,
    selectedStrategy
  );

  return (
    <div className="space-y-6">
      {/* Persona Header Banner */}
      <div className="bg-gradient-to-r from-[#171e2e] via-[#1a2234] to-[#121622] border border-[#2b374e] rounded-xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black text-lg font-mono">
              RA
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-500/30 font-semibold">
                  Scenario 1 Active
                </span>
                <h2 className="text-lg font-bold text-white font-sans">
                  Mr. Arnold (Rajan) — F1 Team Performance Strategist
                </h2>
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                Objective: Benchmark constructor points trajectory against Red Bull Racing and Mercedes,
                evaluate tyre compound stints across track types, and identify global driver recruitment pools
                using 6,464 race records.
              </p>
            </div>
          </div>

          <div className="bg-[#121622] border border-[#252f44] p-3 rounded-lg text-right font-mono text-xs">
            <span className="text-gray-400 block text-[10px] uppercase">Constructor Target</span>
            <span className="text-sm font-bold text-amber-400">{targetConstructor}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">vs Red Bull & Mercedes Benchmarks</span>
          </div>
        </div>
      </div>

      {/* Grid: Benchmark Comparator & Interactive Tyre Strategy Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Constructor Benchmark Matrix */}
        <div className="lg:col-span-5 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2637] mb-3">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase font-sans">
                Constructor Gap Analysis
              </h3>
            </div>
            <select
              value={targetConstructor}
              onChange={(e) => setTargetConstructor(e.target.value)}
              className="bg-[#181e2b] border border-[#273247] text-gray-200 text-xs font-mono rounded px-2 py-1"
            >
              {TEAMS_DATA.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-400 mb-3">
            Points & podium conversion benchmark against top-flight championship standards:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {/* Red Bull */}
            <div className="bg-[#151a26] border border-[#242e40] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-400">Red Bull Racing (Championship Benchmark)</span>
                <span className="text-white font-bold">589 - 860 Pts/Yr</span>
              </div>
              <div className="w-full bg-[#0e121a] h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[92%]" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                Win Rate: 58% • Avg Finish: 2.1 • DNF Rate: 6.8%
              </span>
            </div>

            {/* Mercedes */}
            <div className="bg-[#151a26] border border-[#242e40] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-teal-400">Mercedes-AMG (Aero & Engine Benchmark)</span>
                <span className="text-white font-bold">412 - 765 Pts/Yr</span>
              </div>
              <div className="w-full bg-[#0e121a] h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full w-[84%]" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                Win Rate: 49% • Avg Finish: 2.8 • DNF Rate: 5.4%
              </span>
            </div>

            {/* Target Team */}
            <div className="bg-[#182030] border border-amber-500/50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-amber-300">{targetConstructor}</span>
                <span className="text-amber-400 font-bold">59 - 184 Pts/Yr</span>
              </div>
              <div className="w-full bg-[#0e121a] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[32%]" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-300 mt-1.5">
                <span>Delta to P1: -482 Pts</span>
                <span className="text-rose-400">Target Deficit: +0.64s/lap</span>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="mt-4 pt-3 border-t border-[#1f2637]">
            <h4 className="text-xs font-bold text-white mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rajan's Strategy Takeaway:</span>
            </h4>
            <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Deploy high-degradation 2-stop strategies to attack Red Bull during opening safety cars.</li>
              <li>Prioritize qualifying delta to avoid midfield dirty air DRS trains.</li>
              <li>Scout drivers with &gt;88% reliability scores to minimize zero-point race weekends.</li>
            </ul>
          </div>
        </div>

        {/* Right Column (7 cols): Tyre Strategy Simulator */}
        <div className="lg:col-span-7 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2637] mb-3">
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-white uppercase font-sans">
                  Tyre Compound Strategy Simulator
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Pirelli Thermodynamics
              </span>
            </div>

            {/* Simulation Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                  Circuit Type
                </label>
                <select
                  value={selectedCircuitType}
                  onChange={(e) => setSelectedCircuitType(e.target.value as CircuitType)}
                  className="w-full bg-[#181e2b] border border-[#263145] text-xs text-gray-100 rounded px-2.5 py-1.5 font-mono"
                >
                  <option value="Street">Street (Monaco/Baku)</option>
                  <option value="High-Speed">High-Speed (Monza)</option>
                  <option value="Technical">Technical (Suzuka/Spa)</option>
                  <option value="Permanent">Permanent (Interlagos)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">
                  Strategy Profile
                </label>
                <select
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value as any)}
                  className="w-full bg-[#181e2b] border border-[#263145] text-xs text-gray-100 rounded px-2.5 py-1.5 font-mono"
                >
                  <option value="One-Stop (Med-Hard)">One-Stop (Med-Hard)</option>
                  <option value="Two-Stop (Soft-Med-Med)">Two-Stop (Soft-Med-Med)</option>
                  <option value="Aggressive (Soft-Soft-Hard)">Aggressive (Soft-Soft-Hard)</option>
                  <option value="Rain-Contingency (Inter-Dry)">Rain-Contingency (Inter-Dry)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-mono text-gray-400 mb-1">
                  <span>Race Laps</span>
                  <span className="text-white font-bold">{raceLaps} Laps</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={78}
                  value={raceLaps}
                  onChange={(e) => setRaceLaps(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-[#263145] rounded cursor-pointer mt-1"
                />
              </div>
            </div>

            {/* Stint Timeline Visualization */}
            <div className="bg-[#0e121a] p-3.5 rounded-lg border border-[#222a3b] mb-4">
              <span className="text-[10px] font-mono uppercase text-gray-400 block mb-2">
                Stint Sequence & Pit Window Map
              </span>

              {/* Progress Stint Bars */}
              <div className="h-10 w-full flex rounded-lg overflow-hidden border border-[#222a3b]">
                {simulation.stints.map((stint) => {
                  const widthPct = (stint.lapsInStint / simulation.totalLaps) * 100;
                  return (
                    <div
                      key={stint.stintNumber}
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: stint.color,
                      }}
                      className="h-full flex flex-col justify-center items-center text-center p-1 font-mono transition-all hover:brightness-110 relative group"
                    >
                      <span className="text-[10px] font-extrabold text-black uppercase tracking-tight">
                        {stint.compound}
                      </span>
                      <span className="text-[9px] font-bold text-black/80">
                        {stint.lapsInStint} L (L{stint.startLap}-{stint.endLap})
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Stint Metrics */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#1a2130] font-mono text-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase block">Total Race Time</span>
                  <span className="font-bold text-white">
                    {(simulation.estimatedRaceTimeSeconds / 60).toFixed(1)} mins
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase block">Pit Lane Loss</span>
                  <span className="font-bold text-amber-400">+{simulation.pitLossSeconds}s</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase block">Pit Stops</span>
                  <span className="font-bold text-cyan-400">{simulation.stints.length - 1} Stop(s)</span>
                </div>
              </div>
            </div>

            {/* Strategic Advantage Callout */}
            <div className="bg-[#151a26] border-l-4 border-emerald-500 p-3 rounded-r-lg">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                Simulation Tactical Insight
              </span>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                {simulation.strategicAdvantage}
              </p>
            </div>
          </div>

          {/* Talent Acquisition Pool quick lookup */}
          <div className="mt-4 pt-3 border-t border-[#1f2637]">
            <span className="text-[11px] font-bold text-white uppercase font-sans block mb-1.5 flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Talent Acquisition Pool (High Reliability & Points Yield)</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {DRIVERS_DIRECTORY.filter((d) => d.reliabilityScore >= 88)
                .slice(0, 5)
                .map((d) => (
                  <div
                    key={d.name}
                    className="bg-[#171e2c] border border-[#273247] px-2.5 py-1 rounded text-xs font-mono flex items-center space-x-1.5"
                  >
                    <span className="font-bold text-white">{d.name}</span>
                    <span className="text-emerald-400 font-bold">{d.reliabilityScore}% Rel</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
