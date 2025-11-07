
import { type Metric } from './types';

export const REGIONS: string[] = [
  '제주시',
  '서귀포시',
  '동부 (성산)',
  '서부 (한림)',
  '북부 (애월)',
  '남부 (안덕)',
];

export const METRICS: Metric[] = [
  { name: '평균 기온', unit: '°C' },
  { name: '습도', unit: '%' },
  { name: '강수량', unit: 'mm' },
  { name: '풍속', unit: 'm/s' },
];
