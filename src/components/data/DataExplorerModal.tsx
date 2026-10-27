import React, { useState } from 'react';
import { 
  CIRCUITS, 
  CHAMPIONSHIP_STANDINGS, 
  ALL_RACE_RESULTS, 
  SAMPLE_LAP_INTELLIGENCE, 
  SAMPLE_QUALIFYING_RESULTS 
} from '../../data/f1-dataset';
import { X, Download, Search, Table, FileSpreadsheet, Layers, Filter } from 'lucide-react';

interface DataExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SheetName = 'race_results' | 'circuits' | 'championship_standings' | 'lap_intelligence' | 'qualifying_results';

export const DataExplorerModal: React.FC<DataExplorerModalProps> = ({ isOpen, onClose }) => {
  const [activeSheet, setActiveSheet] = useState<SheetName>('race_results');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  if (!isOpen) return null;

  // Select dataset based on active sheet
  let dataRows: any[] = [];
  if (activeSheet === 'race_results') dataRows = ALL_RACE_RESULTS;
  else if (activeSheet === 'circuits') dataRows = CIRCUITS;
  else if (activeSheet === 'championship_standings') dataRows = CHAMPIONSHIP_STANDINGS;
  else if (activeSheet === 'lap_intelligence') dataRows = SAMPLE_LAP_INTELLIGENCE;
  else if (activeSheet === 'qualifying_results') dataRows = SAMPLE_QUALIFYING_RESULTS;

  // Filter rows by search
  const filteredRows = dataRows.filter((row) => {
    if (!searchQuery) return true;
    const str = JSON.stringify(row).toLowerCase();
    return str.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = dataRows.length > 0 ? Object.keys(dataRows[0]) : [];

  const handleExportCSV = () => {
    if (dataRows.length === 0) return;
    const headers = columns.join(',');
    const csvLines = filteredRows.slice(0, 1000).map((row) =>
      columns.map((c) => JSON.stringify(row[c] ?? '')).join(',')
    );
    const content = [headers, ...csvLines].join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `f1_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#10141f] border border-[#232a3b] rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2637] bg-[#131825]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white uppercase font-sans">
                  F1 Multi-Sheet Data Explorer
                </h3>
                <span className="text-[10px] bg-cyan-950/70 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-800">
                  Tableau Logical Schema
                </span>
              </div>
              <p className="text-xs text-gray-400">
                5 interconnected relational sheets with 13,750+ rows and 41 columns
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/assets/aistudio/F1_Racing_Project_Dataset.xlsx_-_circuits_20e0d6e0.csv"
              download="F1_Racing_Project_Dataset_circuits.csv"
              className="hidden sm:flex items-center space-x-1.5 bg-[#14232c] hover:bg-[#1b2f3b] text-cyan-300 border border-cyan-800/60 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
              title="Download original attached circuits CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Circuits CSV</span>
            </a>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 bg-[#182030] hover:bg-[#222c42] text-gray-200 border border-[#2b374e] px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2738] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Tabs */}
        <div className="flex overflow-x-auto border-b border-[#1e2536] bg-[#0c1018] px-6 pt-2 gap-2 text-xs font-mono">
          {[
            { id: 'race_results', label: '1. race_results (6,464 Rows)', count: ALL_RACE_RESULTS.length },
            { id: 'circuits', label: '2. circuits (29 Venues)', count: CIRCUITS.length },
            { id: 'championship_standings', label: '3. championship_standings (170 Rows)', count: CHAMPIONSHIP_STANDINGS.length },
            { id: 'lap_intelligence', label: '4. lap_intelligence (Telemetry)', count: SAMPLE_LAP_INTELLIGENCE.length },
            { id: 'qualifying_results', label: '5. qualifying_results (Grids)', count: SAMPLE_QUALIFYING_RESULTS.length },
          ].map((sheet) => (
            <button
              key={sheet.id}
              onClick={() => {
                setActiveSheet(sheet.id as SheetName);
                setCurrentPage(1);
              }}
              className={`pb-2.5 px-3 border-b-2 font-semibold transition-all whitespace-nowrap ${
                activeSheet === sheet.id
                  ? 'border-[#e10600] text-white font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {sheet.label}
            </button>
          ))}
        </div>

        {/* Search & Meta Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3 bg-[#121620] border-b border-[#1a2130]">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Filter in ${activeSheet}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#181e2b] border border-[#273247] text-xs text-gray-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="text-xs font-mono text-gray-400 flex items-center space-x-3">
            <span>
              Showing <strong className="text-white">{filteredRows.length}</strong> records
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-auto bg-[#0a0d14] p-4">
          <div className="rounded-lg border border-[#1f2638] overflow-hidden">
            <table className="w-full text-left text-xs font-mono whitespace-nowrap">
              <thead className="bg-[#141a26] text-gray-300 uppercase text-[10px] border-b border-[#242e40] sticky top-0">
                <tr>
                  <th className="py-2.5 px-3 text-center">#</th>
                  {columns.map((c) => (
                    <th key={c} className="py-2.5 px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#182030] text-gray-300">
                {paginatedRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#121824] transition-colors">
                    <td className="py-2 px-3 text-center text-gray-400 text-[10px]">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    {columns.map((col) => {
                      const val = row[col];
                      const isNull = val === null || val === undefined;
                      return (
                        <td key={col} className="py-2 px-3">
                          {isNull ? (
                            <span className="text-rose-400/60 italic font-mono text-[10px]">null</span>
                          ) : typeof val === 'boolean' ? (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                val ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                              }`}
                            >
                              {val ? 'TRUE' : 'FALSE'}
                            </span>
                          ) : (
                            String(val)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-3 border-t border-[#1f2637] bg-[#121620] flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-[#181e2b] text-gray-200 border border-[#273247] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202738]"
          >
            Previous Page
          </button>

          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 bg-[#181e2b] text-gray-200 border border-[#273247] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202738]"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};
