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

export type CursorStyle = 'default' | 'amongus' | 'star' | 'crosshair' | 'sword' | 'neon' | 'ring';

export interface UserSettings {
  customCursor: boolean;
  cursorStyle: CursorStyle;
  animatedBg: boolean;
}

export interface User {
  username: string;
  password?: string;
  exp: number;
  level: number;
  currentTheme: string;
  unlockedThemes: string[];
  unlockedCursors: CursorStyle[];
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