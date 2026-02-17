
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  username: string;
  password?: string; // Stored in mock DB
  exp: number;
  level: number;
  currentTheme: string;
  unlockedThemes: string[];
  favorites: string[];
}

export enum AppRoute {
  HOME = 'home',
  GAME = 'game',
  CATEGORY = 'category',
  FAVORITES = 'favorites',
  SETTINGS = 'settings'
}
