
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

export interface UserSettings {
  customCursor: boolean;
  cursorStyle: 'default' | 'amongus';
  animatedBg: boolean;
  volumetricFog: boolean;
}

export interface User {
  username: string;
  password?: string;
  exp: number;
  level: number;
  currentTheme: string;
  unlockedThemes: string[];
  favorites: string[];
  settings: UserSettings;
}

export enum AppRoute {
  HOME = 'home',
  GAME = 'game',
  CATEGORY = 'category',
  FAVORITES = 'favorites',
  LIBRARY = 'library',
  SETTINGS = 'settings'
}
