export type CampingCategory = '오토캠핑' | '백패킹' | '차박' | '글램핑' | '캠닉/불멍';

export type CampingSeason = '봄' | '여름' | '가을' | '겨울';

export interface WeatherInfo {
  condition: '맑음' | '구름조금' | '비' | '눈' | '별빛가득' | '안개';
  temp: number; // Celsius
  icon: string; // Icon identifier
}

export interface CampingLog {
  id: string;
  title: string;
  campsite: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string; // YYYY-MM-DD
  nights: string; // e.g. "1박 2일"
  category: CampingCategory;
  season: CampingSeason;
  originalPhotos: string[]; // List of original raw photo URLs or Base64
  stampedPhotos?: string[]; // List of stamped/processed photo URLs
  weather: WeatherInfo;
  fireLogCount?: number; // e.g., 14th bonfire
  rating: number; // 1-5
  story: string;
  gearUsed: string[]; // Array of gear names or IDs
  tags: string[];
  altitude?: number; // meters e.g., 650m
  createdTime: number;
}

export interface GearItem {
  id: string;
  name: string;
  category: '텐트/셸터' | '침구/매트' | '취사/화로' | '조명/랜턴' | '체어/테이블' | '기타장비';
  brand: string;
  photoUrl?: string;
  usageCount: number;
  notes?: string;
}

export type StampStyle = 'minimal' | 'badge' | 'polaroid' | 'ticket' | 'firelight';
export type PhotoFilter = 'none' | 'firelight' | 'pine' | 'starlight' | 'vintage';

export interface PhotoStampConfig {
  style: StampStyle;
  showWeather: boolean;
  showDate: boolean;
  showLocation: boolean;
  showFireCount: boolean;
  showGearTags: boolean;
  filter: PhotoFilter;
  customText?: string;
}
