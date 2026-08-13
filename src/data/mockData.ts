import { CampingLog, GearItem } from '../types/camping';

export const initialLogs: CampingLog[] = [
  {
    id: '1',
    title: '영월 잣나무 숲속 불멍 힐링',
    location: '영월 잣나무 캠핑장',
    date: '2026. 8. 13.',
    campingType: '오토캠핑',
    type: '오토캠핑',
    season: '여름 🌿',
    duration: '1박 2일',
    weather: { condition: '맑음', temp: 22, icon: '☀️' },
    fireCount: 1,
    images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'],
    content: '우거진 잣나무 상쾌한 공기 속에서 즐기는 여름 캠핑!',
    gearUsed: []
  }
];

export const mockLogs = initialLogs;

export const initialGears: GearItem[] = [
  {
    id: 'g1',
    name: '터널 텐트',
    category: '텐트/셸터',
    purchaseDate: '2025. 05',
    price: 0,
    memo: '메인 리빙쉘'
  }
];

export const mockGears = initialGears;
