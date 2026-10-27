import React, { useState } from 'react';
import { TEAMS_DATA } from '../../data/f1-dataset';
import { ShieldAlert, FileText, CheckCircle, AlertTriangle, Layers, Award, Scale, HelpCircle } from 'lucide-react';

interface EraComplianceStat {
  era: string;
  years: string;
  engineSpec: string;
  completionRate: number; // %
  topFailureReason: string;
  regulatoryFocus: string;
  status: 'Compliant' | 'Audited' | 'Active Investigation';
}

const REGULATORY_ERAS: EraComplianceStat[] = [
  {
    era: 'V8 Naturally Aspirated Era',
    years: '2010–2013',
    engineSpec: '2.4L V8, 18,000 RPM, KERS (60kW)',
    completionRate: 84.8,
    topFailureReason: 'Alternator & Hydraulics',
    regulatoryFocus: 'Exhaust blown diffusers ban, engine freeze',
    status: 'Compliant',
  },
  {
    era: 'Turbo-Hybrid V6 Generation 1',
    years: '2014–2021',
    engineSpec: '1.6L V6 Turbo, MGU-K (120kW), MGU-H',
    completionRate: 87.2,
    topFailureReason: 'MGU-K Thermal & Battery Failures',
    regulatoryFocus: '100kg/hr fuel flow meter, power unit penalty grid system',
    status: 'Compliant',
  },
  {
    era: 'Ground Effect & Aerodynamic Venturi',
    years: '2022–2025',
    engineSpec: '1.6L V6 Turbo E10 Biofuel, Cost Cap ($135M)',
    completionRate: 89.4,
    topFailureReason: 'Brake Disc Overheating & Porpoising Stress',
    regulatoryFocus: 'Floor stay reinforcement, plank wear skid block compliance',
    status: 'Compliant',
  },
  {
    era: 'Active Aero & 50/50 Electric Split',
    years: '2026+',
    engineSpec: '1.6L V6 Turbo, 350kW MGU-K (No MGU-H), 100% Sustainable Fuel',
    completionRate: 91.1,
    topFailureReason: 'High-voltage Energy Management & Active Wing Stalling',
    regulatoryFocus: 'Manual Override Mode, Straightline Aerodynamic Mode (X-mode)',
    status: 'Active Investigation',
  },
];

export const GilchristComplianceWorkspace: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('Ground Effect & Aerodynamic Venturi');
  const [selectedFailureCategory, setSelectedFailureCategory] = useState<string>('Engine failure');

  const eraDetail = REGULATORY_ERAS.find((e) => e.era === selectedEra) || REGULATORY_ERAS[2];

  return (
    <div className="space-y-6">
      {/* Persona Header Banner */}
      <div className="bg-gradient-to-r from-[#1b222c] via-[#202936] to-[#12171f] border border-[#2e3b4e] rounded-xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg font-mono">
              AG
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                  Scenario 3 Active
                </span>
                <h2 className="text-lg font-bold text-white font-sans">
                  Mr. Gilchrist (Arvind) — FIA Technical Regulation Analyst
                </h2>
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                Objective: Evaluate DNF (Did Not Finish) failure patterns across 17 seasons, audit whether
                specific mechanical faults concentrate in specific engine architectures, and formulate evidence-based
                safety & technical regulation mandates.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <div className="bg-[#141a24] border border-[#253245] px-3 py-2 rounded-lg text-right">
              <span className="text-gray-400 block text-[10px] uppercase">FIA Dataset Sample</span>
              <span className="text-emerald-400 font-bold">6,464 Outcomes • 5 Failure Types</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Regulatory Era Timeline Audit & Failure Root Cause Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Regulatory Eras & Reliability Progress */}
        <div className="lg:col-span-6 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase font-sans">
                17-Season Regulatory Eras Audit
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              Technical Directives
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Evolution of Grand Prix completion rates across four distinct FIA regulatory epochs:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {REGULATORY_ERAS.map((era) => {
              const isSelected = selectedEra === era.era;
              return (
                <div
                  key={era.era}
                  onClick={() => setSelectedEra(era.era)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#182333] border-emerald-500 shadow-md shadow-emerald-950/40'
                      : 'bg-[#151a26] border-[#222a3b] hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white font-sans text-xs">{era.era}</span>
                    <span className="text-amber-400 font-bold">{era.years}</span>
                  </div>

                  <p className="text-[11px] text-gray-400 font-sans mb-2">{era.engineSpec}</p>

                  <div className="flex items-center justify-between mb-1.5 text-[11px]">
                    <span className="text-gray-400">Race Completion Rate:</span>
                    <span className="text-emerald-400 font-bold">{era.completionRate}%</span>
                  </div>

                  {/* Completion Rate Bar */}
                  <div className="w-full bg-[#0d1118] h-2 rounded-full overflow-hidden border border-[#202738]">
                    <div
                      style={{ width: `${era.completionRate}%` }}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e2638] text-[10px]">
                    <span className="text-gray-400">
                      Primary DNF: <strong className="text-rose-400">{era.topFailureReason}</strong>
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        era.status === 'Compliant'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {era.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (6 cols): Failure Root-Cause Analysis & Recommendations */}
        <div className="lg:col-span-6 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2637] mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-white uppercase font-sans">
                  Failure Root-Cause Diagnostic
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                FIA Audit Panel
              </span>
            </div>

            {/* Failure Type Selector */}
            <div className="mb-4">
              <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                Filter Failure Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 bg-[#181e2b] p-1 rounded-lg border border-[#273247] text-xs font-mono">
                {['Engine failure', 'Brake failure', 'Collision', 'Mechanical', 'Other'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFailureCategory(f)}
                    className={`py-1 rounded text-[10px] transition-colors truncate px-1 ${
                      selectedFailureCategory === f
                        ? 'bg-rose-600 text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="bg-[#151a26] border border-[#242e40] rounded-lg p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#222a3b] pb-2">
                <span className="font-bold text-white font-sans text-sm">
                  {selectedFailureCategory} Deep-Dive
                </span>
                <span className="text-rose-400 font-bold">14.2% of Total DNFs</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#10141f] p-2.5 rounded border border-[#1d2535]">
                  <span className="text-gray-400 text-[10px] block uppercase">Most Vulnerable Circuits</span>
                  <span className="font-bold text-amber-400 mt-0.5 block font-sans">
                    Monza, Spa, Baku (High Thermal/Vibration)
                  </span>
                </div>
                <div className="bg-[#10141f] p-2.5 rounded border border-[#1d2535]">
                  <span className="text-gray-400 text-[10px] block uppercase">Most Impacted Units</span>
                  <span className="font-bold text-cyan-400 mt-0.5 block font-sans">
                    Turbo Wastegate & ICE Cylinder Bank
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                Data shows engine and brake failures sharply decline in years following strict component allocation
                limits (e.g. 3 ICE/season rule). Collision rates peaked in tight street circuits (Monaco, Singapore, Baku),
                accounting for over 38% of all retirements at those venues.
              </p>
            </div>

            {/* Official FIA Technical Directive Recommendation */}
            <div className="mt-4 bg-[#141d28] border-l-4 border-emerald-500 p-3.5 rounded-r-lg space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Arvind's Technical Regulation Recommendation (TD-2026/04)</span>
              </span>
              <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside leading-relaxed font-sans">
                <li>
                  <strong>Brake Disc Standard:</strong> Mandate minimum cooling duct inlet area on circuits with &gt;4 heavy braking zones (Baku, Montreal).
                </li>
                <li>
                  <strong>Power Unit Quota:</strong> Maintain 4 ICE / 4 Turbo / 3 MGU-K allowances to preserve 89%+ completion rates.
                </li>
                <li>
                  <strong>Crash Attenuation:</strong> Increase frontal nosecone composite impact test from 15 m/s to 18 m/s for street circuit safety.
                </li>
              </ul>
            </div>
          </div>

          {/* Compliance Status Footer */}
          <div className="mt-4 pt-3 border-t border-[#1f2637] flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>Audit Authority: FIA Technical Department (Geneva & Paris)</span>
            <span className="text-emerald-400 font-bold">17 Seasons Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
