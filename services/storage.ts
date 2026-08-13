import { Redis } from '@upstash/redis';
import { CampingLog, GearItem } from '../types/camping';
import { initialLogs, initialGears } from '../data/mockData';

const redis = new Redis({
  url: import.meta.env.VITE_KV_REST_API_URL || "https://musical-wasp-163841.upstash.io",
  token: import.meta.env.VITE_KV_REST_API_TOKEN || "gQAAAAAAAoABAAIgcDEwNDkxYTBmYmYwM2Q0MjM4YjI0ODU5NGVmM2NiYjlhZg",
});

const LOGS_KEY = 'campic_logs';
const GEARS_KEY = 'campic_gears';

export const fetchLogsFromKV = async (): Promise<CampingLog[]> => {
  try {
    const data = await redis.get<CampingLog[]>(LOGS_KEY);
    return data && data.length > 0 ? data : initialLogs;
  } catch (error) {
    console.error('Failed to fetch logs from KV:', error);
    return initialLogs;
  }
};

export const saveLogsToKV = async (logs: CampingLog[]) => {
  try {
    await redis.set(LOGS_KEY, logs);
  } catch (error) {
    console.error('Failed to save logs to KV:', error);
  }
};

export const fetchGearsFromKV = async (): Promise<GearItem[]> => {
  try {
    const data = await redis.get<GearItem[]>(GEARS_KEY);
    return data && data.length > 0 ? data : initialGears;
  } catch (error) {
    console.error('Failed to fetch gears from KV:', error);
    return initialGears;
  }
};

export const saveGearsToKV = async (gears: GearItem[]) => {
  try {
    await redis.set(GEARS_KEY, gears);
  } catch (error) {
    console.error('Failed to save gears to KV:', error);
  }
};
