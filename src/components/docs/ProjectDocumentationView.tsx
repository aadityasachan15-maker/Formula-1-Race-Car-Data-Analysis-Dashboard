import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle, 
  Layers, 
  Share2, 
  Database, 
  Sliders, 
  BarChart, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface ProjectDocumentationViewProps {
  onOpenPublishModal: () => void;
}

export const ProjectDocumentationView: React.FC<ProjectDocumentationViewProps> = ({
  onOpenPublishModal,
}) => {
  const [activeSection, setActiveSection] = useState<string>('problem');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sticky Table of Contents Sidebar */}
      <div className="lg:col-span-3">
        <div className="sticky top-20 bg-[#121620] border border-[#232a3b] rounded-xl p-4 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#1f2637]">
            <FileText className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-white font-sans uppercase">
              Project Template Index
            </h3>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            {[
              { id: 'problem', label: '1. Problem Understanding' },
              { id: 'collection', label: '2. Data Collection & Extraction' },
              { id: 'preparation', label: '3. Data Preparation & Fields' },
              { id: 'visualizations', label: '4. Visualizations Catalogue' },
              { id: 'dashboard', label: '5. Dashboard Architecture' },
              { id: 'story', label: '6. 9-Scene Data Story' },
              { id: 'testing', label: '7. Performance Testing' },
              { id: 'publishing', label: '8. Tableau Public Publishing' },
              { id: 'demo', label: '9. Project Demonstration' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#e10600] text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-[#181e2b]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1f2637] space-y-2">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center space-x-2 bg-[#181e2b] hover:bg-[#222a3b] text-gray-200 border border-[#273247] py-2 rounded-lg text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onOpenPublishModal}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-2 rounded-lg text-xs font-mono font-bold transition-all shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Tableau Public Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Documentation Body */}
      <div className="lg:col-span-9 bg-[#121620] border border-[#232a3b] rounded-xl p-6 sm:p-8 shadow-2xl space-y-8 text-gray-300 font-sans leading-relaxed">
        {/* Document Title Header */}
        <div className="border-b border-[#252f44] pb-6">
          <div className="inline-block bg-[#e10600] text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded mb-3">
            ACADEMIC & PROFESSIONAL CAPSTONE REPORT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Formula 1 Race Intelligence: Comprehensive Tableau Visualization & Strategy Report
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-2">
            Multi-Sheet Dataset Analysis (17 Seasons • 6,464 Outcomes • 29 Circuits • 10 Constructors)
          </p>
        </div>

        {/* Section 1: Problem Understanding */}
        <section id="problem" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 1
            </span>
            <h2 className="text-xl font-bold text-white">Define Problem / Problem Understanding</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-3 text-xs leading-relaxed">
            <h3 className="font-bold text-white uppercase font-mono text-[11px] text-amber-400">
              1.1 Business Problem Specification
            </h3>
            <p>
              In modern Formula 1, competitive margins are measured in hundredths of a second. Decision-makers
              across constructor engineering units, broadcast production trucks, and governing bodies face an
              overwhelming avalanche of unstructured sensor and timing data. Without cohesive, interactive
              visual intelligence:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>
                <strong>Constructor Strategists (Mr. Arnold / Rajan):</strong> Struggle to benchmark development trajectories against championship benchmarks (Red Bull Racing and Mercedes) and optimize tyre compound allocation.
              </li>
              <li>
                <strong>Broadcast Journalists (Ms. Lisa / Divya):</strong> Cannot rapidly generate dynamic, on-screen statistical infographics during live grand prix sessions.
              </li>
              <li>
                <strong>Technical Compliance Officers (Mr. Gilchrist / Arvind):</strong> Lack systemic visibility into component failure clustering (engine, brake, collision, mechanical) across regulatory cycles.
              </li>
            </ul>

            <h3 className="font-bold text-white uppercase font-mono text-[11px] text-amber-400 pt-2">
              1.2 Social and Motorsport Impact
            </h3>
            <p>
              Data-driven race intelligence directly enhances driver safety by revealing high-risk circuit failure
              modes, democratizes motorsport analytics for global fans, and promotes regulatory integrity by
              providing transparent reliability benchmarks across all engine suppliers.
            </p>
          </div>
        </section>

        {/* Section 2: Data Collection & Extraction */}
        <section id="collection" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 2
            </span>
            <h2 className="text-xl font-bold text-white">Data Collection & Extraction</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-3 text-xs">
            <p>
              The multi-sheet Excel dataset was ingested into Tableau Desktop using the native Microsoft Excel
              Connector. The schema comprises 5 relational sheets spanning over 13,750 combined records:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono">
              <div className="bg-[#121622] p-3 rounded border border-[#20293b]">
                <span className="text-cyan-400 font-bold block mb-1">1. race_results (Primary Sheet)</span>
                <span className="text-gray-400 text-[11px] block">
                  6,464 rows • 41 columns. Primary metrics: finish position, points, laps led, tyre compound, DNF flag & reason, gap to leader.
                </span>
              </div>
              <div className="bg-[#121622] p-3 rounded border border-[#20293b]">
                <span className="text-emerald-400 font-bold block mb-1">2. circuits</span>
                <span className="text-gray-400 text-[11px] block">
                  29 global tracks. Features: circuit_type (Street, High-Speed, Technical, Permanent), coordinates, lap distance, lap records.
                </span>
              </div>
              <div className="bg-[#121622] p-3 rounded border border-[#20293b]">
                <span className="text-amber-400 font-bold block mb-1">3. championship_standings</span>
                <span className="text-gray-400 text-[11px] block">
                  170 records (10 teams x 17 seasons). Features: season points, championship rank, wins, podiums, engine supplier.
                </span>
              </div>
              <div className="bg-[#121622] p-3 rounded border border-[#20293b]">
                <span className="text-purple-400 font-bold block mb-1">4. lap_intelligence & 5. qualifying_results</span>
                <span className="text-gray-400 text-[11px] block">
                  High-frequency telemetry: sector times, speed trap speeds (km/h), tyre degradation curves, Q1/Q2/Q3 qualifying deltas.
                </span>
              </div>
            </div>

            <p className="pt-2 text-gray-400">
              Tableau Logical Layer Relationships: <code className="text-amber-300 font-mono">race_results.circuit_id = circuits.circuit_id</code>.
              Championship standings maintained as an independent analytical table to preserve season totals without double counting.
            </p>
          </div>
        </section>

        {/* Section 3: Data Preparation & Calculated Fields */}
        <section id="preparation" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 3
            </span>
            <h2 className="text-xl font-bold text-white">Data Preparation & Calculated Fields</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase font-mono text-[11px] text-amber-400">
              3.1 Data Cleansing Protocols
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>
                <strong>Null & Missing Value Handling:</strong> Records with null <code>finish_position</code> indicate retirements (DNFs). These were strictly preserved and enriched via the <code>dnf_reason</code> column (Engine, Brake, Collision, Mechanical, Other).
              </li>
              <li>
                <strong>Gap to Leader Imputation:</strong> Null gap values for DNF cars were excluded from continuous speed/pace aggregations to prevent distortion.
              </li>
              <li>
                <strong>Dimension/Measure Typing:</strong> Discrete categorical fields (driver, team, country, tyre_compound) vs Continuous numeric measures (points, laps_led, lap_time_s).
              </li>
            </ul>

            <h3 className="font-bold text-white uppercase font-mono text-[11px] text-amber-400 pt-2">
              3.2 Tableau Calculated Fields & Parameters Created
            </h3>
            <div className="bg-[#0e121a] p-3 rounded font-mono text-[11px] text-gray-300 space-y-2 border border-[#202738]">
              <div>
                <span className="text-cyan-400 font-bold block">// DNF Count Calculated Field</span>
                <code>IIF([dnf] = TRUE, 1, 0)</code>
              </div>
              <div>
                <span className="text-emerald-400 font-bold block">// Driver Reliability Rate Score (%)</span>
                <code>([Total Races] - [DNF Count]) / [Total Races] * 100</code>
              </div>
              <div>
                <span className="text-amber-400 font-bold block">// Top N Parameter Filter</span>
                <code>INDEX() &lt;= [Top N Parameter] (Default: 10, Range: 5 to 25)</code>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Visualizations Catalogue */}
        <section id="visualizations" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 4
            </span>
            <h2 className="text-xl font-bold text-white">Visualizations Catalogue (9 Core Views)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {[
              { num: 'Viz 1', name: 'Global Driver & Circuit Distribution', type: 'Geographic Map', desc: 'Displays 29 tracks, coordinates, city metadata, and circuit classifications.' },
              { num: 'Viz 2', name: 'Driver Reliability Analysis', type: 'Stacked Bar Chart', desc: 'DNF counts segmented into 5 failure categories with reliability scores.' },
              { num: 'Viz 3', name: 'Driver Performance Leaderboard', type: 'Vertical Column Bar Chart', desc: 'Dynamic Top N points ranking, victory badges, and podium counts.' },
              { num: 'Viz 4', name: 'Team Performance Ranking', type: 'Horizontal Bar Chart', desc: 'Constructors total points, win rate, podiums, and historic championship titles.' },
              { num: 'Viz 5', name: 'Team Championship Performance Analysis', type: 'Grouped Vertical Bar Chart', desc: '17 seasons trajectory tracking Red Bull, Mercedes, Ferrari, and McLaren.' },
              { num: 'Viz 6', name: 'Tyre Compound Usage Distribution', type: 'Donut / Pie Chart', desc: 'Soft, Medium, Hard, Intermediate & Wet share and degradation telemetry.' },
              { num: 'Viz 7', name: 'Country-Wise Race Participation', type: 'Treemap & Highlight Table', desc: 'Grand Prix hosting counts, circuit counts, and country percentages.' },
              { num: 'Viz 8', name: 'Podium Achievements by Driver & Team', type: 'Packed Bubble Chart', desc: 'Driver bubble size scaled to career podiums, colored by constructor.' },
              { num: 'Viz 9', name: 'Lap Intelligence & Telemetry', type: 'Line & Split Telemetry Chart', desc: 'Degradation curve per lap, speed trap speeds (km/h), and qualifying deltas.' },
            ].map((v) => (
              <div key={v.num} className="bg-[#151a26] p-3 rounded-lg border border-[#222a3b]">
                <div className="flex items-center justify-between text-rose-400 font-bold mb-1">
                  <span>{v.num}: {v.type}</span>
                </div>
                <h4 className="text-white font-sans font-bold text-xs">{v.name}</h4>
                <p className="text-gray-400 font-sans text-[11px] mt-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Dashboard Architecture */}
        <section id="dashboard" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 5
            </span>
            <h2 className="text-xl font-bold text-white">Dashboard Design & Responsive Grid</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-3 text-xs">
            <p>
              The dashboard utilizes a high-contrast dark color palette (carbon black background, Ferrari red,
              and titanium white accents) echoing the high-speed aesthetic of Formula 1.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li><strong>Row 1:</strong> Official F1 branding header, live filter status counter, and action toolbar.</li>
              <li><strong>Row 2:</strong> 4 Core KPI Tiles (Competing Teams: 10, Seasons: 17, Race Outcomes: 6,464, Circuits: 29).</li>
              <li><strong>Row 3:</strong> Global Filter controls (DNF Reason dropdown, Year of Race Date slider/select, Top N Parameter).</li>
              <li><strong>Row 4:</strong> Primary Visual Grid — Geographic Map & Driver Reliability Stacked Bar Chart.</li>
              <li><strong>Row 5:</strong> Secondary Visual Grid — Driver Leaderboard & Team Performance Horizontal Bars.</li>
              <li><strong>Row 6:</strong> Strategic Visual Grid — Team Championship Analysis, Tyre Compound Pie, Treemap & Bubble Chart.</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Story Architecture */}
        <section id="story" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 6
            </span>
            <h2 className="text-xl font-bold text-white">9-Scene Data Story Workflow</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-2 text-xs">
            <p>
              The Data Story is authored across 9 contiguous scenes guiding the reader through macro-level
              championship scale down to micro-level stint and component failure telemetry:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-300 font-mono">
              <li>Scene 1: Global Scale Overview (The 4 KPIs & 6,464 Records)</li>
              <li>Scene 2: Geographic Driver & Circuit Distribution (29 Tracks)</li>
              <li>Scene 3: Driver Reliability & DNF Failure Analysis (5 Failure Categories)</li>
              <li>Scene 4: Driver Performance Leaderboard (Top N Parameter)</li>
              <li>Scene 5: Team Performance & Constructor Rankings</li>
              <li>Scene 6: 17-Season Championship Battles Trajectory</li>
              <li>Scene 7: Tyre Strategy Patterns & Degradation Dynamics</li>
              <li>Scene 8: Country-Level Race Participation</li>
              <li>Scene 9: Global Podium Achievements by Driver and Team</li>
            </ol>
          </div>
        </section>

        {/* Section 7: Performance Testing */}
        <section id="testing" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 7
            </span>
            <h2 className="text-xl font-bold text-white">Performance Testing & Optimization</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="bg-[#10141f] p-3 rounded border border-[#1e2535]">
                <span className="text-gray-400 block text-[10px] uppercase">Data Volume</span>
                <span className="text-base font-bold text-emerald-400">13,750+ Combined Rows</span>
                <span className="text-[10px] text-gray-400 block">6,464 rows in race_results</span>
              </div>
              <div className="bg-[#10141f] p-3 rounded border border-[#1e2535]">
                <span className="text-gray-400 block text-[10px] uppercase">Connection Mode</span>
                <span className="text-base font-bold text-cyan-400">Tableau Extract (.hyper)</span>
                <span className="text-[10px] text-gray-400 block">Sub-second query caching</span>
              </div>
              <div className="bg-[#10141f] p-3 rounded border border-[#1e2535]">
                <span className="text-gray-400 block text-[10px] uppercase">Filter Latency</span>
                <span className="text-base font-bold text-amber-400">&lt; 150 ms Render</span>
                <span className="text-[10px] text-gray-400 block">All 9 visual sheets</span>
              </div>
            </div>
            <p className="text-gray-400 pt-1">
              Extract optimization ensures zero lag when toggling the Top N parameter slider (5-25) or cross-filtering by DNF Reason.
            </p>
          </div>
        </section>

        {/* Section 8: Tableau Public Publishing */}
        <section id="publishing" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-[#1f2638] text-rose-400 px-2.5 py-0.5 rounded border border-[#2c374e]">
              Section 8
            </span>
            <h2 className="text-xl font-bold text-white">Publishing to Tableau Public Workflow</h2>
          </div>

          <div className="bg-[#161c28] p-4 rounded-lg border border-[#242e40] space-y-3 text-xs font-mono">
            <div className="flex items-start space-x-2">
              <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Step 1</span>
              <div>
                <strong className="text-white font-sans">Extract Data & Validate Relationships:</strong> Ensure all 5 sheets are set to Extract mode and calculated fields are compiled without errors.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Step 2</span>
              <div>
                <strong className="text-white font-sans">Server Sign-in:</strong> Select <em>Server &gt; Tableau Public &gt; Save to Tableau Public</em>. Authenticate via credentials.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Step 3</span>
              <div>
                <strong className="text-white font-sans">Title & Metadata:</strong> Name workbook <code>Formula 1 Race Intelligence - Tableau Analytics & Strategy Hub</code>.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Step 4</span>
              <div>
                <strong className="text-white font-sans">Permissions & Embed:</strong> Enable public interactivity for DNF Reason, Year, and Top N parameter filters; copy embed snippet.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
