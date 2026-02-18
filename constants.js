import React from 'react';
import { 
  Gamepad2, 
  Target, 
  Car, 
  BrainCircuit, 
  Sword, 
  Zap, 
  LayoutGrid 
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'action', name: 'Action', icon: 'Sword' },
  { id: 'driving', name: 'Driving', icon: 'Car' },
  { id: 'puzzle', name: 'Puzzle', icon: 'BrainCircuit' },
  { id: 'sports', name: 'Sports', icon: 'Target' },
  { id: 'classic', name: 'Classics', icon: 'Gamepad2' },
  { id: 'casual', name: 'Casual', icon: 'Zap' },
];

export const GAMES_DATA = [
  { id: 'slope', title: 'Slope', description: 'Drive a ball down a series of slopes, avoiding obstacles.', thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400', iframeUrl: 'https://kbhgames.com/game/slope', category: 'action', isFeatured: true },
  { id: 'geometry-dash', title: 'Geometry Dash', description: 'Jump and fly through danger in this rhythm action platformer.', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', iframeUrl: 'https://geometrydash.io/', category: 'action', isFeatured: true },
  { id: 'moto-x3m', title: 'Moto X3M', description: 'Ultimate bike racing game with awesome stunts.', thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400', iframeUrl: 'https://moto-x3m.io/', category: 'driving', isFeatured: true },
  { id: '2048', title: '2048', description: 'Join the numbers and get to the 2048 tile!', thumbnail: 'https://images.unsplash.com/photo-1628201288647-172dea0708d7?q=80&w=400', iframeUrl: 'https://play2048.co/', category: 'puzzle' },
  { id: 'cookie-clicker', title: 'Cookie Clicker', description: 'The original idle game where you bake absurd amounts of cookies.', thumbnail: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400', iframeUrl: 'https://orteil.dashnet.org/cookieclicker/', category: 'casual' }
];

export const getIcon = (iconName, size = 20) => {
  const icons = { Sword, Car, BrainCircuit, Target, Gamepad2, Zap, LayoutGrid };
  return React.createElement(icons[iconName] || Gamepad2, { size });
};