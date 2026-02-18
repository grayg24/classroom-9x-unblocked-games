import React, { useState, useEffect, useMemo } from 'react';
import htm from 'htm';
import { AppRoute } from './types.js';
import { GAMES_DATA } from './constants.js';
import Layout from './components/Layout.js';
import Home from './components/Home.js';
import GameModal from './components/GameModal.js';
import ProfileModal from './components/ProfileModal.js';
import CategoryPage from './components/CategoryPage.js';
import Favorites from './components/Favorites.js';
import Library from './components/Library.js';
import Settings from './components/Settings.js';

const html = htm.bind(React.createElement);

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const DEFAULT_USER = {
  username: 'Player',
  exp: 0,
  level: 1,
  gamesPlayed: 0,
  currentTheme: 'cyan',
  unlockedThemes: ['cyan'],
  unlockedCursors: ['default'],
  favorites: [],
  settings: {
    customCursor: true,
    cursorStyle: 'default',
    animatedBg: true
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState(AppRoute.HOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(DEFAULT_USER);
  const [activeGame, setActiveGame] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const savedStats = localStorage.getItem('classroom9x_local_profile_v4');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setUser({ ...DEFAULT_USER, ...parsed });
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_local_profile_v4', JSON.stringify(user));
    const body = document.getElementById('app-body');
    if (body) {
      body.setAttribute('data-theme', user.currentTheme);
      body.classList.toggle('custom-cursor-enabled', user.settings.customCursor && !activeGame);
      body.classList.toggle('animated-bg-enabled', user.settings.animatedBg);
    }
  }, [user, activeGame]);

  const addExpAndTrackPlay = () => {
    setUser(prev => {
      const newExp = prev.exp + EXP_PER_PLAY;
      const requiredForNext = prev.level * LEVEL_UP_BASE;
      const newGamesPlayed = (prev.gamesPlayed || 0) + 1;
      let newLevel = prev.level;
      let unlockedThemes = [...prev.unlockedThemes];
      if (newExp >= requiredForNext) {
        newLevel += 1;
        const themeUnlocks = { 5: 'rose', 10: 'emerald', 15: 'violet', 20: 'cobalt', 40: 'crimson', 75: 'gold', 100: 'galaxy' };
        if (themeUnlocks[newLevel] && !unlockedThemes.includes(themeUnlocks[newLevel])) {
          unlockedThemes.push(themeUnlocks[newLevel]);
        }
      }
      return { ...prev, exp: newExp, level: newLevel, unlockedThemes, gamesPlayed: newGamesPlayed };
    });
  };

  const setTheme = (theme) => setUser({ ...user, currentTheme: theme });
  const updateSettings = (settings) => setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  const toggleFavorite = (gameId) => {
    const newFavorites = user.favorites.includes(gameId) ? user.favorites.filter(id => id !== gameId) : [...user.favorites, gameId];
    setUser({ ...user, favorites: newFavorites });
  };

  const handleGameSelect = (game) => {
    setActiveGame(game);
    addExpAndTrackPlay();
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery) return html`<${Library} games=${filteredGames} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
    switch (currentView) {
      case AppRoute.CATEGORY: return html`<${CategoryPage} categoryId=${selectedCategoryId || ''} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.FAVORITES: return html`<${Favorites} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.LIBRARY: return html`<${Library} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.SETTINGS: return html`<${Settings} user=${user} onUpdateSettings=${updateSettings} onSetTheme=${setTheme} onRedeemCode=${(c) => ({success:false, message:''})} />`;
      default: return html`<${Home} user=${user} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} onSwitchToLibrary=${() => setCurrentView(AppRoute.LIBRARY)} />`;
    }
  };

  return html`
    <${Layout} user=${user} onSearch=${setSearchQuery} onSetTheme=${setTheme} currentView=${currentView} selectedCategoryId=${selectedCategoryId} onViewChange=${(v, p) => { setCurrentView(v); setSelectedCategoryId(p || null); setSearchQuery(''); }} onProfileClick=${() => setIsProfileModalOpen(true)}>
      ${renderContent()}
      ${activeGame && html`<${GameModal} game=${activeGame} isFavorite=${user.favorites.includes(activeGame.id)} onToggleFavorite=${toggleFavorite} onClose=${() => setActiveGame(null)} />`}
      ${isProfileModalOpen && html`<${ProfileModal} user=${user} onUpdateUser=${(u) => setUser(prev => ({...prev, ...u}))} onUpdateSettings=${updateSettings} onSetTheme=${setTheme} onClose=${() => setIsProfileModalOpen(false)} />`}
    <//>
  `;
};

export default App;