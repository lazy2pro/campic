import { CampingLog, GearItem } from '../types/camping';
import { initialLogs, initialGears } from '../data/mockData';

// TypeScript import.meta.env 타입 에러 우회 처리
const env = (import.meta as any).env || {};
const KV_URL = env.VITE_KV_REST_API_URL || "https://musical-wasp-163841.upstash.io";
const KV_TOKEN = env.VITE_KV_REST_API_TOKEN || "gQAAAAAAAoABAAIgcDEwNDkxYTBmYmYwM2Q0MjM4YjI0ODU5NGVmM2NiYjlhZg";

const LOGS_KEY = 'campic_logs';
const GEARS_KEY = 'campic_gears';

// Upstash REST API 통신 헬퍼 함수 (외부 라이브러리 미사용)
async function kvCommand(command: string, key: string, value?: any) {
  const body = value !== undefined ? [command, key, JSON.stringify(value)] : [command, key];
  const response = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`KV Storage Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

export const fetchLogsFromKV = async (): Promise<CampingLog[]> => {
  try {
    const rawData = await kvCommand('GET', LOGS_KEY);
    if (!rawData) return initialLogs;
    const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialLogs;
  } catch (error) {
    console.error('Failed to fetch logs from KV:', error);
    return initialLogs;
  }
};

export const saveLogsToKV = async (logs: CampingLog[]) => {
  try {
    await kvCommand('SET', LOGS_KEY, logs);
  } catch (error) {
    console.error('Failed to save logs to KV:', error);
  }
};

export const fetchGearsFromKV = async (): Promise<GearItem[]> => {
  try {
    const rawData = await kvCommand('GET', GEARS_KEY);
    if (!rawData) return initialGears;
    const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialGears;
  } catch (error) {
    console.error('Failed to fetch gears from KV:', error);
    return initialGears;
  }
};

export const saveGearsToKV = async (gears: GearItem[]) => {
  try {
    await kvCommand('SET', GEARS_KEY, gears);
  } catch (error) {
    console.error('Failed to save gears to KV:', error);
  }
};
