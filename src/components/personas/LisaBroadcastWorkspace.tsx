import React, { useState } from 'react';
import { DRIVERS_DIRECTORY, CIRCUITS, TEAMS_DATA } from '../../data/f1-dataset';
import { Tv, Copy, Check, Share2, Trophy, Award, Flag, Mic, Sparkles } from 'lucide-react';

export const LisaBroadcastWorkspace: React.FC = () => {
  const [selectedDriverName, setSelectedDriverName] = useState<string>('Lewis Hamilton');
  const [copied, setCopied] = useState<boolean>(false);
  const [graphicFormat, setGraphicFormat] = useState<'lower-third' | 'full-screen' | 'head-to-head'>('lower-third');

  const driver = DRIVERS_DIRECTORY.find((d) => d.name === selectedDriverName) || DRIVERS_DIRECTORY[0];
  const driver2 = DRIVERS_DIRECTORY.find((d) => d.name === 'Max Verstappen') || DRIVERS_DIRECTORY[1];

  const handleCopyFactSheet = () => {
    const text = `F1 BROADCAST STAT SHEET: ${driver.name} (${driver.country})
Current Team: ${driver.currentTeam}
World Championships: ${driver.championships}x
Career Starts: ${driver.totalStarts} | Cumulative Points: ${driver.totalPoints.toLocaleString()}
Career Wins: ${driver.totalWins} | Career Podiums: ${driver.totalPodiums}
Reliability Score: ${driver.reliabilityScore}% (${driver.dnfCount} DNFs across 17 seasons)`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Persona Header Banner */}
      <div className="bg-gradient-to-r from-[#1f192b] via-[#241e34] to-[#14121f] border border-[#392e54] rounded-xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black text-lg font-mono">
              ML
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-purple-500/20 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-500/30 font-semibold">
                  Scenario 2 Active
                </span>
                <h2 className="text-lg font-bold text-white font-sans">
                  Ms. Lisa (Divya) — Motorsport Broadcast Analyst
                </h2>
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                Objective: Rapid retrieval of Driver Performance Leaderboards, Grand Prix host nation counts,
                and podium achievement distributions for on-screen live TV infographics and commentary notes.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyFactSheet}
              className="flex items-center space-x-1.5 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Broadcast Card'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Broadcast Studio Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Driver & Graphics Picker */}
        <div className="lg:col-span-4 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2637]">
            <div className="flex items-center space-x-2">
              <Tv className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase font-sans">
                On-Air Graphic Controls
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
              Live TV Feed
            </span>
          </div>

          {/* Graphic Format Selector */}
          <div>
            <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
              Broadcast Layout
            </label>
            <div className="grid grid-cols-3 gap-1 bg-[#181e2b] p-1 rounded-lg border border-[#273247] text-xs font-mono">
              <button
                onClick={() => setGraphicFormat('lower-third')}
                className={`py-1.5 rounded transition-colors ${
                  graphicFormat === 'lower-third'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Lower-3rd
              </button>
              <button
                onClick={() => setGraphicFormat('full-screen')}
                className={`py-1.5 rounded transition-colors ${
                  graphicFormat === 'full-screen'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Full Screen
              </button>
              <button
                onClick={() => setGraphicFormat('head-to-head')}
                className={`py-1.5 rounded transition-colors ${
                  graphicFormat === 'head-to-head'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Head-to-Head
              </button>
            </div>
          </div>

          {/* Driver Selector */}
          <div>
            <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
              Select Featured Driver
            </label>
            <select
              value={selectedDriverName}
              onChange={(e) => setSelectedDriverName(e.target.value)}
              className="w-full bg-[#181e2b] border border-[#263145] text-xs text-gray-100 rounded-lg px-2.5 py-2 font-mono focus:border-purple-500"
            >
              {DRIVERS_DIRECTORY.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.code}) — {d.totalWins} Wins
                </option>
              ))}
            </select>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-[#161c28] p-3 rounded-lg border border-[#242e40] space-y-2 text-xs font-mono">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
              Commentary Quick Facts
            </span>
            <div className="flex justify-between">
              <span className="text-gray-400">Podium Conversion:</span>
              <span className="text-amber-400 font-bold">
                {((driver.totalPodiums / driver.totalStarts) * 100).toFixed(1)}% of starts
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wins per Start:</span>
              <span className="text-emerald-400 font-bold">
                {((driver.totalWins / driver.totalStarts) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reliability Rate:</span>
              <span className="text-cyan-400 font-bold">{driver.reliabilityScore}%</span>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Rendered On-Screen TV Broadcast Overlay */}
        <div className="lg:col-span-8 bg-[#0b0d13] border border-[#232a3b] rounded-xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2637] mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  LIVE ON-SCREEN GRAPHIC PREVIEW • 1080p 60FPS FEED
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                Formula 1 World Championship Television
              </span>
            </div>

            {/* Broadcast Layout Container */}
            <div className="bg-gradient-to-br from-[#121624] via-[#101420] to-[#0a0c12] border border-[#2a364d] rounded-xl p-6 relative overflow-hidden shadow-2xl min-h-[280px] flex flex-col justify-center">
              {/* Subtle F1 Watermark */}
              <div className="absolute right-4 top-4 text-6xl font-black italic text-white/5 pointer-events-none font-mono">
                F1
              </div>

              {graphicFormat === 'lower-third' && (
                <div className="max-w-2xl bg-[#0e121c]/95 border-l-8 border-[#e10600] rounded-r-xl p-4 shadow-2xl border-y border-r border-[#222c3f]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold">
                      DRIVER PROFILE • CUMULATIVE INTELLIGENCE
                    </span>
                    <span className="text-[11px] font-mono bg-white/10 text-white px-2 py-0.5 rounded font-bold">
                      {driver.code}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-3 mb-2">
                    <h2 className="text-2xl font-black text-white font-sans tracking-tight uppercase">
                      {driver.name}
                    </h2>
                    <span className="text-xs text-gray-300 font-mono">
                      {driver.country} • {driver.currentTeam}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 pt-2.5 border-t border-white/10 font-mono">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase block">Starts</span>
                      <span className="text-base font-extrabold text-white">{driver.totalStarts}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase block">Wins</span>
                      <span className="text-base font-extrabold text-amber-400">{driver.totalWins}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase block">Podiums</span>
                      <span className="text-base font-extrabold text-cyan-400">{driver.totalPodiums}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase block">Points</span>
                      <span className="text-base font-extrabold text-emerald-400">
                        {driver.totalPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {graphicFormat === 'full-screen' && (
                <div className="text-center py-4">
                  <div className="inline-block bg-[#e10600] text-white text-xs font-mono font-black uppercase px-3 py-1 rounded-full mb-3">
                    F1 RACE INTELLIGENCE HERO
                  </div>
                  <h2 className="text-3xl font-black text-white font-sans tracking-tight uppercase">
                    {driver.name}
                  </h2>
                  <p className="text-sm text-gray-400 font-mono mt-1">
                    {driver.country} • {driver.currentTeam} • {driver.championships}x World Champion
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mt-6 font-mono">
                    <div className="bg-[#151a26] p-3 rounded-lg border border-[#273247]">
                      <span className="text-[10px] text-gray-400 block uppercase">Points</span>
                      <span className="text-xl font-black text-emerald-400">
                        {driver.totalPoints.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-[#151a26] p-3 rounded-lg border border-[#273247]">
                      <span className="text-[10px] text-gray-400 block uppercase">Wins</span>
                      <span className="text-xl font-black text-amber-400">{driver.totalWins}</span>
                    </div>
                    <div className="bg-[#151a26] p-3 rounded-lg border border-[#273247]">
                      <span className="text-[10px] text-gray-400 block uppercase">Podiums</span>
                      <span className="text-xl font-black text-cyan-400">{driver.totalPodiums}</span>
                    </div>
                    <div className="bg-[#151a26] p-3 rounded-lg border border-[#273247]">
                      <span className="text-[10px] text-gray-400 block uppercase">Reliability</span>
                      <span className="text-xl font-black text-rose-400">{driver.reliabilityScore}%</span>
                    </div>
                  </div>
                </div>
              )}

              {graphicFormat === 'head-to-head' && (
                <div className="py-2">
                  <div className="text-center mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                      HEAD-TO-HEAD CHAMPIONSHIP COMPARISON
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Driver 1 */}
                    <div className="bg-[#151a26] p-3.5 rounded-lg border border-[#273247] text-left">
                      <h3 className="text-base font-bold text-white font-sans">{driver.name}</h3>
                      <p className="text-[11px] text-gray-400 font-mono mb-2">{driver.currentTeam}</p>
                      <div className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Titles:</span>
                          <span className="text-amber-400 font-bold">{driver.championships}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Wins:</span>
                          <span className="text-white font-bold">{driver.totalWins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Podiums:</span>
                          <span className="text-cyan-400 font-bold">{driver.totalPodiums}</span>
                        </div>
                      </div>
                    </div>

                    {/* Driver 2 */}
                    <div className="bg-[#151a26] p-3.5 rounded-lg border border-[#273247] text-right">
                      <h3 className="text-base font-bold text-white font-sans">{driver2.name}</h3>
                      <p className="text-[11px] text-gray-400 font-mono mb-2">{driver2.currentTeam}</p>
                      <div className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between flex-row-reverse">
                          <span className="text-gray-400">:Titles</span>
                          <span className="text-amber-400 font-bold">{driver2.championships}</span>
                        </div>
                        <div className="flex justify-between flex-row-reverse">
                          <span className="text-gray-400">:Wins</span>
                          <span className="text-white font-bold">{driver2.totalWins}</span>
                        </div>
                        <div className="flex justify-between flex-row-reverse">
                          <span className="text-gray-400">:Podiums</span>
                          <span className="text-cyan-400 font-bold">{driver2.totalPodiums}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divya's Broadcast Tip */}
          <div className="mt-4 pt-3 border-t border-[#1f2637] flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center space-x-1.5 text-purple-300">
              <Mic className="w-3.5 h-3.5" />
              <span>Divya's Teleprompter Note: Emphasize Hamilton's 200+ podium milestone vs Verstappen's win rate.</span>
            </span>
            <span>Broadcast feed synced with Tableau Extract</span>
          </div>
        </div>
      </div>
    </div>
  );
};
