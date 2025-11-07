
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { type WeatherDataPoint } from '../types';

interface DataChartProps {
  data: WeatherDataPoint[];
  metricName: string;
  metricUnit: string;
}

const DataChart: React.FC<DataChartProps> = ({ data, metricName, metricUnit }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>조회할 조건을 설정하고 '데이터 조회' 버튼을 눌러주세요.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#475569', fontSize: 12 }} 
          tickFormatter={(tick) => tick.substring(5)} // Show MM-DD
        />
        <YAxis 
          tick={{ fill: '#475569', fontSize: 12 }} 
          label={{ value: metricUnit, angle: -90, position: 'insideLeft', fill: '#475569' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #cbd5e1',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          name={metricName}
          stroke="#2563eb"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          dot={{ r: 3, fill: '#2563eb' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
