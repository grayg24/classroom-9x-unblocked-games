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
  {
    id: 'slope',
    title: 'Slope',
    description: 'Drive a ball down a series of slopes, avoiding obstacles and staying on the track.',
    thumbnail: 'https://picsum.photos/seed/slope/400/225',
    iframeUrl: 'https://kbhgames.com/game/slope',
    category: 'action',
    isFeatured: true
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    thumbnail: 'https://picsum.photos/seed/geometry/400/225',
    iframeUrl: 'https://geometrydash.io/',
    category: 'action',
    isFeatured: true
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    description: 'The ultimate bike racing game with awesome stunts and tricky obstacles.',
    thumbnail: 'https://picsum.photos/seed/moto/400/225',
    iframeUrl: 'https://moto-x3m.io/',
    category: 'driving',
    isFeatured: true
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://picsum.photos/seed/2048/400/225',
    iframeUrl: 'https://play2048.co/',
    category: 'puzzle'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The original idle game where you bake an absurd amount of cookies.',
    thumbnail: 'https://picsum.photos/seed/cookie/400/225',
    iframeUrl: 'https://orteil.dashnet.org/cookieclicker/',
    category: 'casual'
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'A free-to-play drifting game with a huge selection of cars and tracks.',
    thumbnail: 'https://picsum.photos/seed/drift/400/225',
    iframeUrl: 'https://drifthunters.org/',
    category: 'driving'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can! Dodge the oncoming trains!',
    thumbnail: 'https://picsum.photos/seed/subway/400/225',
    iframeUrl: 'https://poki.com/en/g/subway-surfers',
    category: 'action'
  },
  {
    id: 'cut-the-rope',
    title: 'Cut the Rope',
    description: 'Feed Om Nom candy by cutting ropes and using various gadgets.',
    thumbnail: 'https://picsum.photos/seed/cutrope/400/225',
    iframeUrl: 'https://poki.com/en/g/cut-the-rope',
    category: 'puzzle'
  }
];

export const getIcon = (iconName, size = 20) => {
  const icons = {
    Sword,
    Car,
    BrainCircuit,
    Target,
    Gamepad2,
    Zap,
    LayoutGrid
  };
  const IconComponent = icons[iconName] || Gamepad2;
  return React.createElement(IconComponent, { size });
};