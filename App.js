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
import InitialNameModal from './components/InitialNameModal.js';

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
  currentFrame: 'obsidian',
  unlockedFrames: ['obsidian'],
  unlockedCursors: ['default'],
  favorites: [],
  hasSetProfile: false,
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
  const [showInitialModal, setShowInitialModal] = useState(false);

  useEffect(() => {
    const savedStats = localStorage.getItem('classroom9x_local_profile_v4');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        const mergedUser = { ...DEFAULT_USER, ...parsed };
        setUser(mergedUser);
        if (!mergedUser.hasSetProfile) {
          setShowInitialModal(true);
        }
      } catch (e) {
        console.error("Failed to load profile", e);
        setShowInitialModal(true);
      }
    } else {
      setShowInitialModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_local_profile_v4', JSON.stringify(user));
    
    const body = document.getElementById('app-body');
    if (body) {
      body.setAttribute('data-theme', user.currentTheme);
      
      const styles = ['default', 'amongus', 'star', 'crosshair', 'sword', 'neon', 'ring'];
      styles.forEach(s => body.classList.remove(`cursor-${s}`));

      if (user.settings.customCursor && !activeGame) {
        body.classList.add('custom-cursor-enabled');
        body.classList.add(`cursor-${user.settings.cursorStyle}`);
      } else {
        body.classList.remove('custom-cursor-enabled');
      }

      if (user.settings.animatedBg) {
        body.classList.add('animated-bg-enabled');
      } else {
        body.classList.remove('animated-bg-enabled');
      }
    }
  }, [user, activeGame]);

  const addExpAndTrackPlay = () => {
    setUser(prev => {
      const newExp = prev.exp + EXP_PER_PLAY;
      const requiredForNext = prev.level * LEVEL_UP_BASE;
      const newGamesPlayed = (prev.gamesPlayed || 0) + 1;
      
      let newLevel = prev.level;
      let unlockedThemes = [...prev.unlockedThemes];
      let unlockedFrames = [...(prev.unlockedFrames || ['obsidian'])];
      
      if (newExp >= requiredForNext) {
        newLevel += 1;
        
        // Themes
        const themeUnlocks = {
          5: 'rose', 10: 'emerald', 15: 'violet', 20: 'cobalt', 40: 'crimson', 75: 'gold', 100: 'galaxy'
        };
        if (themeUnlocks[newLevel] && !unlockedThemes.includes(themeUnlocks[newLevel])) {
          unlockedThemes.push(themeUnlocks[newLevel]);
        }

        // Frames
        const frameUnlocks = {
          5: 'default',   // Standard frame now at Level 5
          10: 'neon',     // Neon frame now at Level 10
          60: 'solar',
          100: 'interstellar'
        };
        if (frameUnlocks[newLevel] && !unlockedFrames.includes(frameUnlocks[newLevel])) {
          unlockedFrames.push(frameUnlocks[newLevel]);
        }
      }

      return { 
        ...prev, 
        exp: newExp, 
        level: newLevel, 
        unlockedThemes,
        unlockedFrames,
        gamesPlayed: newGamesPlayed 
      };
    });
  };

  const setTheme = (theme) => setUser({ ...user, currentTheme: theme });
  const setFrame = (frame) => setUser({ ...user, currentFrame: frame });

  const updateSettings = (settings) => {
    setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  };

  const redeemCode = (code) => {
    const cleanCode = code.trim().toLowerCase();
    
    if (cleanCode === 'glitch') {
      setUser(prev => ({
        ...prev,
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'glitch']))
      }));
      return { success: true, message: 'PROTOCOL BREACH: GLITCH FRAME ACQUIRED' };
    }

    if (cleanCode === 'rainbow') {
      setUser(prev => ({
        ...prev,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'rainbow']))
      }));
      return { success: true, message: 'PROTOCOL INITIATED: SPECTRUM MODE UNLOCKED' };
    }

    if (cleanCode === 'hologram') {
      setUser(prev => ({
        ...prev,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'hologram']))
      }));
      return { success: true, message: 'VIRTUAL DEPLOYMENT: HOLOGRAM MODULE ACTIVATED' };
    }

    if (cleanCode === '9xisback') {
      const allThemes = ['cyan', 'rose', 'emerald', 'violet', 'cobalt', 'crimson', 'gold', 'galaxy']; // Excluded hologram and rainbow
      const allFrames = ['obsidian', 'default', 'neon', 'solar', 'interstellar'];
      setUser(prev => ({
        ...prev,
        level: prev.level + 100,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), ...allFrames]))
      }));
      return { success: true, message: 'OPERATIVE CLEARANCE GRANTED: +100 LEVELS' };
    }
    return { success: false, message: 'INVALID DECRYPTION KEY' };
  };

  const toggleFavorite = (gameId) => {
    const newFavorites = user.favorites.includes(gameId) 
      ? user.favorites.filter(id => id !== gameId) 
      : [...user.favorites, gameId];
    setUser({ ...user, favorites: newFavorites });
  };

  const handleGameSelect = (game) => {
    setActiveGame(game);
    addExpAndTrackPlay();
  };

  const handleInitialNameSubmit = (name) => {
    setUser(prev => ({ ...prev, username: name, hasSetProfile: true }));
    setShowInitialModal(false);
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery) return html`<${Library} games=${filteredGames} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
    switch (currentView) {
      case AppRoute.CATEGORY: return html`<${CategoryPage} categoryId=${selectedCategoryId || ''} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.FAVORITES: return html`<${Favorites} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.LIBRARY: return html`<${Library} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} />`;
      case AppRoute.SETTINGS: return html`<${Settings} user=${user} onUpdateSettings=${updateSettings} onSetTheme=${setTheme} onRedeemCode=${redeemCode} />`;
      default: return html`<${Home} user=${user} games=${GAMES_DATA} favorites=${user.favorites} onToggleFavorite=${toggleFavorite} onPlayGame=${handleGameSelect} onSwitchToLibrary=${() => setCurrentView(AppRoute.LIBRARY)} />`;
    }
  };

  return html`
    <${Layout} 
      user=${user}
      onSearch=${setSearchQuery} 
      onSetTheme=${setTheme}
      currentView=${currentView}
      selectedCategoryId=${selectedCategoryId}
      onViewChange=${(view, param) => {
        setCurrentView(view);
        setSelectedCategoryId(param || null);
        setSearchQuery('');
      }}
      onProfileClick=${() => setIsProfileModalOpen(true)}
    >
      ${renderContent()}
      ${activeGame && html`<${GameModal} game=${activeGame} isFavorite=${user.favorites.includes(activeGame.id)} onToggleFavorite=${toggleFavorite} onClose=${() => setActiveGame(null)} />`}
      ${isProfileModalOpen && html`<${ProfileModal} user=${user} onUpdateUser=${(updates) => setUser(prev => ({ ...prev, ...updates }))} onUpdateSettings=${updateSettings} onSetTheme=${setTheme} onSetFrame=${setFrame} onClose=${() => setIsProfileModalOpen(false)} />`}
      ${showInitialModal && html`<${InitialNameModal} onSubmit=${handleInitialNameSubmit} />`}
    <//>
  `;
};

export default App;