export type CampingSeason = '봄' | '여름' | '가을' | '겨울' | '봄 🌸' | '여름 🌿' | '가을 🍁' | '겨울 ❄️';

export interface WeatherInfo {
  condition: string;
  temp: number;
  icon?: string;
}

export interface CampingLog {
  id: string;
  title: string;
  location: string;
  date: string;
  campingType?: string;
  type?: string;
  season: CampingSeason;
  duration: string;
  weather: WeatherInfo;
  fireCount: number;
  images: string[];
  content: string;
  gearUsed?: string[];
}

export type GearCategory = '텐트/셸터' | '텐트/쉘터' | '침구/매트' | '취사/화로' | '조명/랜턴' | '체어/테이블' | '기타장비';

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  purchaseDate?: string;
  price?: number;
  memo?: string;
  image?: string;
}
