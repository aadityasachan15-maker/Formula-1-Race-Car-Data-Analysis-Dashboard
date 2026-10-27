import React, { useState } from 'react';
import { X, Share2, CheckCircle2, ExternalLink, Copy, Check, ShieldCheck, Globe, Database } from 'lucide-react';

interface TableauPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableauPublishModal: React.FC<TableauPublishModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const tableauPublicUrl = 'https://public.tableau.com/app/profile/f1.race.intelligence/viz/Formula1RaceIntelligence_17Seasons/Dashboard';

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(tableauPublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Prepare Dashboard & Data Extract',
      desc: 'Verify all 5 relational sheets are joined on circuit_id. Convert data source from Live to Extract (.hyper) to maximize interactive rendering speed for 6,464 race records.',
      status: 'Ready',
    },
    {
      num: 2,
      title: 'Sign In to Tableau Public',
      desc: 'In Tableau Desktop, navigate to File > Save to Tableau Public (Ctrl+S / Cmd+S). Authenticate using your registered Tableau Public credentials.',
      status: 'Ready',
    },
    {
      num: 3,
      title: 'Set Workbook Metadata & Publish',
      desc: 'Name the workbook "Formula 1 Race Intelligence - 17 Seasons Analytics Hub". Click Save to compile and push the 9 visual sheets, Dashboard, and 9-Scene Story.',
      status: 'Ready',
    },
    {
      num: 4,
      title: 'Configure Web Interactivity & Permissions',
      desc: 'Enable client-side filter controls (DNF Reason, Year of Race Date, Top N Parameter) and configure permissions to allow public embed and CSV download.',
      status: 'Ready',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#10141f] border border-[#232a3b] rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2637] bg-[#141a26]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase font-sans">
                Tableau Public Publishing Workflow
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Official step-by-step procedure to deploy interactive dashboards & stories
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Published Workbook Card */}
          <div className="bg-gradient-to-br from-[#182030] to-[#121622] p-4 rounded-xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Tableau Public Deployment Target</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                Online & Verified
              </span>
            </div>
            <div className="text-sm font-bold text-white font-sans">
              Formula 1 Race Intelligence - 17 Seasons Strategy & Telemetry
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                readOnly
                value={tableauPublicUrl}
                className="w-full bg-[#0d1017] border border-[#273247] rounded-lg px-3 py-1.5 text-xs text-gray-300 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopyUrl}
                className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-md flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Stepper Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase font-mono tracking-wider">
              Publishing Checklist (Step-by-Step Procedure)
            </h4>

            {steps.map((s) => (
              <div
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  activeStep === s.num
                    ? 'bg-[#182233] border-amber-500 shadow-md'
                    : 'bg-[#141926] border-[#222a3b] hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
                      {s.num}
                    </span>
                    <h5 className="text-xs font-bold text-white font-sans">{s.title}</h5>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-gray-400 pl-8 font-sans leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Security & Extract Notice */}
          <div className="bg-[#141d2a] p-3 rounded-lg border border-[#233147] flex items-start space-x-2.5 text-xs text-gray-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p>
              Extract configuration guarantees that viewers on any modern web browser can interact with
              the 9 visualizations without needing a Tableau Desktop license or server credentials.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1f2637] bg-[#121620] flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-400">
            Compliant with Tableau Public v2024.3+ Specifications
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#181e2b] hover:bg-[#202738] text-gray-200 border border-[#273247] rounded-lg text-xs font-mono transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
