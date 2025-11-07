
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import DataChart from './components/DataChart';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData } from './services/geminiService';
import { REGIONS, METRICS } from './constants';
import { type WeatherDataPoint } from './types';

const App: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [region, setRegion] = useState<string>(REGIONS[0]);
  const [metric, setMetric] = useState<string>(METRICS[0].name);
  const [startDate, setStartDate] = useState<string>(sevenDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);
  const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (new Date(startDate) > new Date(endDate)) {
        setError("시작일은 종료일보다 늦을 수 없습니다.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setWeatherData([]);
    try {
      const data = await fetchWeatherData(region, metric, startDate, endDate);
      setWeatherData(data);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [region, metric, startDate, endDate]);

  const selectedMetric = METRICS.find(m => m.name === metric);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl">
        <Header />
        <main className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-6">
          <ControlPanel
            region={region}
            setRegion={setRegion}
            metric={metric}
            setMetric={setMetric}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <div className="mt-8 relative min-h-[400px] md:min-h-[500px] border border-slate-200 rounded-lg p-4">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
              </div>
            )}
            {!isLoading && !error && (
              <DataChart 
                data={weatherData} 
                metricName={selectedMetric?.name || ''}
                metricUnit={selectedMetric?.unit || ''} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
