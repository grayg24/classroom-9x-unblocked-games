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
    id: 'geometry-dash-fr',
    title: 'Geometry Dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer! Test your reflexes in this ultra-challenging original version.',
    thumbnail: 'https://geometrydash-game.ru/wp-content/uploads/2021/07/95-954583_geometry-dash.jpg',
    iframeUrl: 'https://geometrydash.fr/wp-content/uploads/games/html5/G/geometry-dash/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'ovo-classic',
    title: 'OvO',
    description: 'Fast-paced parkour platformer! Master the art of wall jumping, sliding, and diving to overcome increasingly complex obstacles and reach the flag.',
    thumbnail: 'https://www.numuki.com/game/card/ovo-game-5037.webp',
    iframeUrl: 'https://db.duck.tinyexams.com/html/ovo/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.7
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    description: 'Experience chaotic basketball fun with pixel physics! Control your team with one button and try to score in ever-changing environments.',
    thumbnail: 'https://www.fnfgo.com/wp-content/uploads/2024/01/Basket-Random.jpeg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/basket_random/index.html',
    category: 'sports',
    isFeatured: true,
    rating: 4.5
  },
  {
    id: 'soccer-random',
    title: 'Boxing Random',
    description: 'Boxing like you have never seen it before! Two-player physics-based fun where one button is all you need to jump, punch, and knockout your opponent.',
    thumbnail: 'https://play-lh.googleusercontent.com/jku-om6R4p5KuvMRlOFjH6blrRjw1EnDb5S7h7WXm1J0bFrY18LXKbmjQnv7SDUWYn8=w526-h296',
    iframeUrl: 'https://labgstore311.github.io/g20/class-825',
    category: 'sports',
    isFeatured: true,
    rating: 4.6
  },
  {
    id: 'minecraft-classic-edition',
    title: 'Minecraft',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play the legendary sandbox classic unblocked in your browser.',
    thumbnail: 'https://wallpapercave.com/wp/wp6548068.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/minecraft/index.html',
    category: 'classic',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'moto-x3m-classic',
    title: 'Moto X3M',
    description: 'The ultimate bike racing game with awesome stunts and tricky obstacles. Can you finish all levels with 3 stars?',
    thumbnail: 'https://motox3mgame.org/data/image/game/moto-x3m-bike-race-game1.png',
    iframeUrl: 'https://db.duck.tinyexams.com/html/motox3m/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'cookie-clicker-new',
    title: 'Cookie Clicker',
    description: 'The original idle game where you bake an absurd amount of cookies. Click the giant cookie and build an empire of bakers and upgrades!',
    thumbnail: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000066299/432bf350e866b2544f9a5cd80de83e0c24f4efddfd7811016c4aa33e48c5df7c',
    iframeUrl: 'https://db.duck.tinyexams.com/html/cookie_clicker/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.7
  },
  {
    id: 'idle-breakout-classic',
    title: 'Idle Breakout',
    description: 'A modern take on the classic Atari Breakout. Buy balls, upgrade them, and destroy bricks in this addictive idle game.',
    thumbnail: 'https://23azo.com/images/idle-breakout.webp',
    iframeUrl: 'https://ubg67.gitlab.io/idle-breakout/',
    category: 'casual',
    isFeatured: true,
    rating: 4.5
  },
  {
    id: 'crazy-cattle-3d',
    title: 'Crazy Cattle 3D',
    description: 'Take control of the craziest cows in the pasture! Dash through 3D environments, dodge obstacles, and cause absolute bovine chaos in this high-energy action game.',
    thumbnail: 'https://i.kym-cdn.com/entries/icons/original/000/053/836/cc3dcovergood.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/crazycattle3d/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.2
  },
  {
    id: 'crossy-road-classic',
    title: 'Crossy Road',
    description: 'Why did the chicken cross the road? Dodge traffic, hop across logs, and avoid the eagle in this endless hopper classic!',
    thumbnail: 'https://cdn-www.bluestacks.com/bs-images/Banner_Video_Cover.jpg',
    iframeUrl: 'https://i.gamesgo.net/uploads/game/html5/4072/',
    category: 'action',
    isFeatured: true,
    rating: 4.5
  },
  {
    id: 'dino-game-classic',
    title: 'Dino Game',
    description: 'The legendary Chrome Dino runner! Help the T-Rex jump over cacti and dodge pterodactyls in this high-speed test of reflexes.',
    thumbnail: 'https://www.coolmathgames.com/sites/default/files/DinoGame_OG-logo.jpg',
    iframeUrl: 'https://gameshost.io/HTML5GAMES/dino/',
    category: 'classic',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'doge-miner-classic',
    title: 'Doge Miner',
    description: 'Much dogecoin! Very wow! Click the doge to mine coins, hire workers, and travel to the moon in this iconic idle clicker game.',
    thumbnail: 'https://funkypotato.com/images/2017/03/doge-miner.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/doge_miner/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.7
  },
  {
    id: 'doge-miner-2',
    title: 'Doge Miner 2',
    description: 'The epic sequel! Much more dogecoin! Explore new planets, hire more shibes, and reach for the stars in this ultimate clicker adventure.',
    thumbnail: 'https://dogeminer2.com/og-image.jpg',
    iframeUrl: 'https://machita66.com/d/dgmn2',
    category: 'casual',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'drift-boss-pro',
    title: 'Drift Boss',
    description: 'The ultimate drifting challenge! Time your drifts perfectly to stay on the track in this addictive one-button driving game.',
    thumbnail: 'https://assets.humoq.com/cdn-cgi/image/quality=78,fit=cover,f=auto,width=3840/images/h512/drift-boss.webp',
    iframeUrl: 'https://db.duck.tinyexams.com/html/drift_boss/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.4
  },
  {
    id: 'drive-mad-original',
    title: 'Drive Mad',
    description: 'Drive your way to the finish line in this physics-based driving game! Master various vehicles across challenging levels designed to test your precision.',
    thumbnail: 'https://watchdocumentaries.com/wp-content/uploads/drive-mad-game.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/drive_mad/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.6
  },
  {
    id: 'dune-surfer',
    title: 'Dune',
    description: 'Conquer the desert sands in this high-speed physics platformer. Jump, flip, and land smoothly to gain score and survive the dunes.',
    thumbnail: 'https://avatars.mds.yandex.net/get-games/3006389/2a00000182b154e646f49ea496dc06df679b/cover1',
    iframeUrl: 'https://db.duck.tinyexams.com/html/dune/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.3
  },
  {
    id: 'flappy-bird-classic',
    title: 'Flappy Bird',
    description: 'The legendary addictive bird-flapping game. Navigate through the pipes and try to set a high score in this unblocked classic!',
    thumbnail: 'https://wallpaperaccess.com/full/4622684.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/flappy_bird/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.1
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