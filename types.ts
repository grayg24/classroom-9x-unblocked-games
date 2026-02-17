
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

export enum AppRoute {
  HOME = 'home',
  GAME = 'game',
  CATEGORY = 'category',
  FAVORITES = 'favorites'
}
