
import React from 'react';
import { REGIONS, METRICS } from '../constants';

interface ControlPanelProps {
  region: string;
  setRegion: (region: string) => void;
  metric: string;
  setMetric: (metric: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  region,
  setRegion,
  metric,
  setMetric,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      {/* Region Select */}
      <div className="flex flex-col">
        <label htmlFor="region-select" className="mb-1 text-sm font-medium text-slate-600">지역</label>
        <select
          id="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Metric Select */}
      <div className="flex flex-col">
        <label htmlFor="metric-select" className="mb-1 text-sm font-medium text-slate-600">기상 항목</label>
        <select
          id="metric-select"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {METRICS.map((m) => (
            <option key={m.name} value={m.name}>{m.name} ({m.unit})</option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="flex flex-col">
        <label htmlFor="start-date" className="mb-1 text-sm font-medium text-slate-600">시작일</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      
      {/* End Date */}
      <div className="flex flex-col">
        <label htmlFor="end-date" className="mb-1 text-sm font-medium text-slate-600">종료일</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      
      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold p-2 rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : '데이터 조회'}
      </button>
    </div>
  );
};

export default ControlPanel;
