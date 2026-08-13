import { CampingLog, GearItem } from '../types/camping';

export const INITIAL_GEAR_ITEMS: GearItem[] = [
  {
    id: 'gear-1',
    name: '노나돔 4.0 블랙티늄',
    category: '텐트/셸터',
    brand: 'Helinox',
    usageCount: 14,
    notes: '가벼우면서도 바람에 매우 강한 돔텐트'
  },
  {
    id: 'gear-2',
    name: '선셋 체어 코요테 탄',
    category: '체어/테이블',
    brand: 'Helinox',
    usageCount: 18,
    notes: '목까지 받쳐주는 최적의 불멍 체어'
  },
  {
    id: 'gear-3',
    name: '루메나 M3 멀티 렌턴',
    category: '조명/랜턴',
    brand: 'LUMENA',
    usageCount: 22,
    notes: '감성 조명 + 집도어 겸용 필수템'
  },
  {
    id: 'gear-4',
    name: '아궁이 그릴 & 화로대 XL',
    category: '취사/화로',
    brand: 'Snow Peak',
    usageCount: 14,
    notes: '장작 불멍 및 직화 바베큐 전용'
  },
  {
    id: 'gear-5',
    name: '헬리녹스 택티컬 침낭 1200g',
    category: '침구/매트',
    brand: 'Helinox',
    usageCount: 8,
    notes: '동계 산악 캠핑용 영하 15도 대응'
  }
];

export const INITIAL_CAMPING_LOGS: CampingLog[] = [
  {
    id: 'log-1',
    title: '강원도 영월 잣나무 숲속 힐링 불멍',
    campsite: '영월 잣나무 숲 캠핑장',
    location: '강원특별자치도 영월군 수주면',
    latitude: 37.284,
    longitude: 128.324,
    date: '2026-08-08',
    nights: '2박 3일',
    category: '오토캠핑',
    season: '여름',
    originalPhotos: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop'
    ],
    stampedPhotos: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=1200&auto=format&fit=crop'
    ],
    weather: {
      condition: '별빛가득',
      temp: 21,
      icon: 'sparkles'
    },
    fireLogCount: 14,
    rating: 5,
    story: '잣나무 숲 사이로 쏟아지는 은하수를 보며 즐긴 올해 14번째 불멍. 계곡 소리와 새소리가 밤새 들려온 꿈같은 2박 3일.',
    gearUsed: ['노나돔 4.0 블랙티늄', '선셋 체어 코요테 탄', '아궁이 그릴 & 화로대 XL', '루메나 M3 멀티 렌턴'],
    tags: ['불멍', '은하수', '숲속캠핑', '계곡', '우중캠핑'],
    altitude: 580,
    createdTime: 1786200000000
  },
  {
    id: 'log-2',
    title: '포천 파인힐스 차박 & 호수 타프 피크닉',
    campsite: '포천 파인힐스 호수 캠핑장',
    location: '경기도 포천시 신북면',
    latitude: 37.912,
    longitude: 127.203,
    date: '2026-07-24',
    nights: '1박 2일',
    category: '차박',
    season: '여름',
    originalPhotos: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1200&auto=format&fit=crop'
    ],
    stampedPhotos: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1200&auto=format&fit=crop'
    ],
    weather: {
      condition: '맑음',
      temp: 26,
      icon: 'sun'
    },
    fireLogCount: 13,
    rating: 4,
    story: '노을빛 호수 뷰 차박 세팅 완료! 사이드 타프 아래서 시원한 핸드드립 커피 한 잔으로 요동치던 일상의 스트레스를 날려버렸다.',
    gearUsed: ['선셋 체어 코요테 탄', '루메나 M3 멀티 렌턴'],
    tags: ['차박', '호수뷰', '노을', '핸드드립'],
    altitude: 320,
    createdTime: 1784900000000
  },
  {
    id: 'log-3',
    title: '치악산 백패킹 - 능선 텐트 야경과 일출',
    campsite: '치악산 비로봉 능선 포인트',
    location: '강원특별자치도 원주시 소초면',
    latitude: 37.365,
    longitude: 128.056,
    date: '2026-05-16',
    nights: '1박 2일',
    category: '백패킹',
    season: '봄',
    originalPhotos: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=1200&auto=format&fit=crop'
    ],
    stampedPhotos: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200&auto=format&fit=crop'
    ],
    weather: {
      condition: '구름조금',
      temp: 14,
      icon: 'cloud-sun'
    },
    fireLogCount: 12,
    rating: 5,
    story: '1,200m 능선 위 미니멀 백패킹. 밤에는 등대처럼 빛나는 울산바위 야경과 텐트 텐풍, 새벽엔 장엄한 일출 운해를 감상했다.',
    gearUsed: ['노나돔 4.0 블랙티늄', '헬리녹스 택티컬 침낭 1200g'],
    tags: ['백패킹', '치악산', '일출', '운해', '텐풍'],
    altitude: 1180,
    createdTime: 1778900000000
  }
];
