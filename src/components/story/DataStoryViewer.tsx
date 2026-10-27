import React, { useState } from 'react';
import { StoryScene } from '../../types/f1';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Trophy, 
  Users, 
  ShieldAlert, 
  Globe, 
  Disc, 
  BarChart3, 
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { GlobalDriverMap } from '../charts/GlobalDriverMap';
import { DriverReliabilityChart } from '../charts/DriverReliabilityChart';
import { DriverLeaderboardChart } from '../charts/DriverLeaderboardChart';
import { TeamPerformanceChart } from '../charts/TeamPerformanceChart';
import { TeamChampionshipChart } from '../charts/TeamChampionshipChart';
import { TyreCompoundChart } from '../charts/TyreCompoundChart';
import { CountryTreemapChart } from '../charts/CountryTreemapChart';
import { PodiumBubbleChart } from '../charts/PodiumBubbleChart';
import { KPICards } from '../KPICards';
import { 
  CIRCUITS, 
  CHAMPIONSHIP_STANDINGS, 
  ALL_RACE_RESULTS 
} from '../../data/f1-dataset';
import {
  calculateKPIs,
  calculateDriverLeaderboard,
  calculateDriverReliability,
  calculateTeamPerformance,
  calculateTyreUsageDistribution,
  calculateCountryParticipation,
  calculatePodiumAchievements,
} from '../../utils/f1-analytics';

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'Scene 1: Global Scale & Executive Footprint',
    subtitle: '17 Seasons, 10 Constructors, 29 Circuits & 6,464 Grand Prix Records',
    narrative: `Formula 1 represents the undisputed pinnacle of global motorsport. Between 2010 and 2026, 6,464 individual race entries across 17 consecutive championships were audited, capturing transitions from 2.4L V8 power units through the 1.6L Turbo-Hybrid era, Ground Effect aerodynamics, and into active aerodynamic regulations. The overarching dataset tracks every lap led, tyre compound stint, mechanical retirement, and championship point with pinpoint precision.`,
    focusPersona: 'All',
    keyInsights: [
      '6,464 discrete driver race outcomes catalogued with full sensor telemetry.',
      '10 persistent constructor franchises competing across 29 international racing circuits.',
      '86.4% baseline race completion rate across all regulatory transitions.',
    ],
    chartRef: 'kpis',
  },
  {
    id: 2,
    title: 'Scene 2: Geographic Driver & Circuit Distribution',
    subtitle: 'From Monza to Las Vegas — Tracking Global Motorsport Reach',
    narrative: `Formula 1 circuits challenge engineering packages across distinct physical typographies: high-speed temples like Monza and Silverstone demand low-drag aero wings, while technical layouts like Spa-Francorchamps, Suzuka, and COTA test vertical downforce. The expansion of high-stakes street circuits (Monaco, Baku, Singapore, Jeddah, Las Vegas) has heightened the probability of safety cars and wall-impact retirements.`,
    focusPersona: 'Arnold',
    keyInsights: [
      '29 iconic circuits mapped across Europe, Americas, Asia, Oceania, and the Middle East.',
      'Street circuits exhibit a 38% higher collision retirement rate than permanent tracks.',
      'European tracks (Monza, Silverstone, Spa, Monaco) host the most frequent races.',
    ],
    chartRef: 'map',
  },
  {
    id: 3,
    title: 'Scene 3: Driver Reliability & DNF Failure Analysis',
    subtitle: 'Auditing 5 Distinct Failure Modes across Drivers and Teams',
    narrative: `Retirements in Formula 1 are governed by 5 distinct root causes: Engine failure, Brake failure, Collision, Mechanical faults, and other electronic/hydraulic anomalies. For FIA technical analysts like Arvind (Mr. Gilchrist), isolating component failure spikes reveals where regulations must introduce enhanced safety envelopes or stress margins without diminishing competitive parity.`,
    focusPersona: 'Gilchrist',
    keyInsights: [
      'Engine failures represent the leading cause of powertrain-related retirements.',
      'Brake failures spike at heavy-deceleration street circuits (Baku, Montreal, Monaco).',
      'Driver reliability scores vary between 82% and 92%, directly impacting championship yield.',
    ],
    chartRef: 'reliability',
  },
  {
    id: 4,
    title: 'Scene 4: Driver Performance Leaderboard',
    subtitle: 'Top N Trajectory — Points, Victories, and Consistent Scoring',
    narrative: `Through dynamic Top N parameter filtering, broadcast analysts like Divya (Ms. Lisa) can instantly compare the all-time scoring power of modern legends. Lewis Hamilton and Max Verstappen dominate the cumulative points totals, while veterans like Fernando Alonso and Sebastian Vettel maintain historic tallies earned across multiple eras.`,
    focusPersona: 'Lisa',
    keyInsights: [
      'Lewis Hamilton leads all-time points (>4,800 pts) and career podium conversions (>200).',
      'Max Verstappen holds the highest win-to-start conversion ratio of the modern era.',
      'Top 10 drivers account for over 68% of all awarded championship points.',
    ],
    chartRef: 'leaderboard',
  },
  {
    id: 5,
    title: 'Scene 5: Team Performance & Constructor Rankings',
    subtitle: 'Mercedes Dominance, Red Bull Resurgence & McLaren Renaissance',
    narrative: `Constructors Championship points tell the definitive story of factory investment, power unit mastery, and racecraft execution. Red Bull Racing and Mercedes-AMG Petronas have traded eras of near-total dominance, while McLaren's revival in 2024-2026 re-established Woking as a premier championship contender alongside Scuderia Ferrari.`,
    focusPersona: 'Arnold',
    keyInsights: [
      'Mercedes-AMG collected 8 consecutive Constructors Championships (2014-2021).',
      'Red Bull achieved historic dominance in the V8 era (2010-13) and Ground Effect era (2022-23).',
      'Mid-tier teams face an average points deficit of 480+ points to title contenders.',
    ],
    chartRef: 'team_ranking',
  },
  {
    id: 6,
    title: 'Scene 6: 17-Season Championship Battles Trajectory',
    subtitle: 'Tracing the Peaks and Troughs of F1 Power Dynamics (2010–2026)',
    narrative: `By analyzing grouped seasonal bar charts over 17 campaigns, performance strategists observe how regulatory overhauls disrupt the competitive hierarchy. Mercedes dominated the first turbo-hybrid cycle, Red Bull mastered ground effect venturi tunnels, and McLaren engineered rapid upgrades to claim recent titles.`,
    focusPersona: 'Arnold',
    keyInsights: [
      '2014 regulatory shift yielded Mercedes 700+ points and 16 wins in a single season.',
      '2021 saw the closest title fight in history, separated by just 28 points between constructors.',
      '2026 active aero rules once again tighten the gap between the top 4 teams.',
    ],
    chartRef: 'championship',
  },
  {
    id: 7,
    title: 'Scene 7: Tyre Strategy Patterns & Degradation Dynamics',
    subtitle: 'Pirelli Soft, Medium, Hard, Intermediate & Wet Compound Deployment',
    narrative: `Tyre management is the primary tactical weapon in a strategist's arsenal. Medium and Hard compounds form the backbone of race distance execution, while Soft tyres are deployed for undercut sprints and qualifying runs. Intermediate and Wet tyres trigger tactical pit lane chaos when rain blankets the circuit.`,
    focusPersona: 'Arnold',
    keyInsights: [
      'Medium and Hard compounds account for 65%+ of all race distance laps logged.',
      'Soft tyres degrade at 0.14s per lap, necessitating early pit stops before lap 18.',
      'Proper crossover timing to Intermediates yields up to 4.2s per lap advantage.',
    ],
    chartRef: 'tyres',
  },
  {
    id: 8,
    title: 'Scene 8: Country-Level Race Participation',
    subtitle: 'The Global Circuit Tapestry — Evergreen Grand Prix Bastions',
    narrative: `Formula 1's global calendar reflects its heritage and worldwide commercial growth. Traditional racing bastions such as the United Kingdom (Silverstone) and Italy (Monza, Imola, Mugello) lead total race counts, while high-profile expansions into the United States (Austin, Miami, Las Vegas) and the Middle East (Bahrain, Abu Dhabi, Qatar, Saudi Arabia) illustrate international growth.`,
    focusPersona: 'Lisa',
    keyInsights: [
      'United Kingdom and Italy hold the longest unbroken streak of Grand Prix hosting.',
      'United States now hosts 3 distinct championship rounds annually.',
      '29 global circuits across 21 nations have participated in the modern championship.',
    ],
    chartRef: 'country',
  },
  {
    id: 9,
    title: 'Scene 9: Global Podium Achievements by Driver and Team',
    subtitle: 'Packed Bubble Visualizations of the Ultimate Motorsport Accolade',
    narrative: `Standing atop an F1 podium represents the pinnacle of sporting achievement. Packed bubble visualizations demonstrate how podium finishes cluster tightly around elite driver talent and dominant constructor chassis. For media broadcasters, this visual immediately highlights historical supremacy and rising generational talent.`,
    focusPersona: 'Lisa',
    keyInsights: [
      'Lewis Hamilton and Max Verstappen represent the largest visual bubbles in the cluster.',
      'Mercedes, Red Bull, and Ferrari account for 78% of all modern podium positions.',
      'Midfield podium conversions (Alpine, Williams, Aston Martin) occur primarily during wet or high-DNF races.',
    ],
    chartRef: 'podium',
  },
];

export const DataStoryViewer: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const scene = STORY_SCENES[currentSceneIndex];

  // Pre-calculate all visual data
  const kpis = calculateKPIs(ALL_RACE_RESULTS, CIRCUITS, CHAMPIONSHIP_STANDINGS);
  const reliabilityStats = calculateDriverReliability(ALL_RACE_RESULTS);
  const leaderboard = calculateDriverLeaderboard(ALL_RACE_RESULTS, 10);
  const teamStats = calculateTeamPerformance(ALL_RACE_RESULTS);
  const tyreStats = calculateTyreUsageDistribution(ALL_RACE_RESULTS);
  const countryStats = calculateCountryParticipation(ALL_RACE_RESULTS, CIRCUITS);
  const podiumStats = calculatePodiumAchievements(ALL_RACE_RESULTS);

  const nextScene = () => {
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      setCurrentSceneIndex(0);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Story Navigation Toolbar */}
      <div className="bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#e10600]/20 text-[#ff4c47] border border-[#e10600]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white uppercase font-sans">
                  Formula 1 Race Intelligence Data Story
                </h2>
                <span className="text-xs bg-[#1f2638] text-amber-400 font-mono px-2 py-0.5 rounded border border-[#2c374e]">
                  Tableau Story Mode
                </span>
              </div>
              <p className="text-xs text-gray-400">
                A 9-scene guided analytical journey through 17 seasons of Grand Prix racing
              </p>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevScene}
              disabled={currentSceneIndex === 0}
              className="p-2 rounded-lg bg-[#181e2b] hover:bg-[#222a3b] text-gray-200 border border-[#273247] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-gray-200 px-3 py-1 bg-[#161c28] rounded-lg border border-[#252f44]">
              Scene {currentSceneIndex + 1} of {STORY_SCENES.length}
            </span>

            <button
              onClick={nextScene}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1a14] text-white text-xs font-semibold font-mono transition-all shadow-md shadow-red-900/40"
              title="Next Scene"
            >
              <span>{currentSceneIndex === STORY_SCENES.length - 1 ? 'Restart Story' : 'Next Scene'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 9-Scene Tab Strip (Tableau Story Style) */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 mt-4 pt-3 border-t border-[#1a2130]">
          {STORY_SCENES.map((s, idx) => {
            const isActive = idx === currentSceneIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSceneIndex(idx)}
                className={`p-2 rounded-lg text-left transition-all font-mono text-[11px] truncate flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#e10600] text-white border-red-500 font-bold shadow-md shadow-red-950/60'
                    : 'bg-[#151a26] text-gray-400 border-[#222a3b] hover:text-white hover:bg-[#1a2030]'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider block opacity-80">
                  Scene {idx + 1}
                </span>
                <span className="truncate text-xs font-sans font-semibold">
                  {s.title.split(': ')[1] || s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Narrative & Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (4 cols): Narrative & Persona Insights */}
        <div className="lg:col-span-4 bg-[#121620] border border-[#232a3b] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            {/* Persona Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono bg-[#1c2436] text-cyan-400 border border-[#28354d] px-2 py-0.5 rounded font-bold">
                {scene.focusPersona === 'Arnold' && 'Strategist Persona: Mr. Arnold'}
                {scene.focusPersona === 'Lisa' && 'Broadcast Persona: Ms. Lisa'}
                {scene.focusPersona === 'Gilchrist' && 'FIA Persona: Mr. Gilchrist'}
                {scene.focusPersona === 'All' && 'Universal F1 Intelligence'}
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">
                #{scene.id} / 9
              </span>
            </div>

            <h3 className="text-lg font-bold text-white font-sans tracking-tight">
              {scene.title}
            </h3>
            <p className="text-xs text-amber-300 font-mono mt-0.5 mb-3">
              {scene.subtitle}
            </p>

            <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
              {scene.narrative}
            </p>

            {/* Key Takeaways */}
            <div className="bg-[#151a26] border border-[#242e40] rounded-lg p-3.5 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Strategic Insights</span>
              </span>
              <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed font-sans">
                {scene.keyInsights.map((insight, i) => (
                  <li key={i}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1f2637] flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>Tableau Story Scene #{scene.id}</span>
            <button
              onClick={nextScene}
              className="text-[#ff5651] hover:underline font-bold flex items-center space-x-1"
            >
              <span>Advance Scene</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right (8 cols): Rendered Visualization for this specific scene */}
        <div className="lg:col-span-8 min-h-[460px]">
          {scene.chartRef === 'kpis' && (
            <div className="space-y-4">
              <KPICards stats={kpis} isFiltered={false} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[280px]">
                  <TyreCompoundChart distribution={tyreStats} />
                </div>
                <div className="h-[280px]">
                  <TeamPerformanceChart teams={teamStats} />
                </div>
              </div>
            </div>
          )}

          {scene.chartRef === 'map' && (
            <div className="h-full min-h-[460px]">
              <GlobalDriverMap circuits={CIRCUITS} />
            </div>
          )}

          {scene.chartRef === 'reliability' && (
            <div className="h-full min-h-[460px]">
              <DriverReliabilityChart reliabilityStats={reliabilityStats} />
            </div>
          )}

          {scene.chartRef === 'leaderboard' && (
            <div className="h-full min-h-[460px]">
              <DriverLeaderboardChart leaderboard={leaderboard} topN={10} />
            </div>
          )}

          {scene.chartRef === 'team_ranking' && (
            <div className="h-full min-h-[460px]">
              <TeamPerformanceChart teams={teamStats} />
            </div>
          )}

          {scene.chartRef === 'championship' && (
            <div className="h-full min-h-[460px]">
              <TeamChampionshipChart standings={CHAMPIONSHIP_STANDINGS} />
            </div>
          )}

          {scene.chartRef === 'tyres' && (
            <div className="h-full min-h-[460px]">
              <TyreCompoundChart distribution={tyreStats} />
            </div>
          )}

          {scene.chartRef === 'country' && (
            <div className="h-full min-h-[460px]">
              <CountryTreemapChart countryData={countryStats} />
            </div>
          )}

          {scene.chartRef === 'podium' && (
            <div className="h-full min-h-[460px]">
              <PodiumBubbleChart podiumItems={podiumStats} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
