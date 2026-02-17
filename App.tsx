
import React, { useState, useEffect, useMemo } from 'react';
import { AppRoute, Game, User } from './types';
import { GAMES_DATA } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import GameModal from './components/GameModal';
import CategoryPage from './components/CategoryPage';
import Favorites from './components/Favorites';
import Library from './components/Library';
import Settings from './components/Settings';

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const DEFAULT_USER: User = {
  username: 'Local Operative',
  exp: 0,
  level: 1,
  currentTheme: 'cyan',
  unlockedThemes: ['cyan'],
  favorites: [],
  settings: {
    customCursor: true,
    animatedBg: true,
    volumetricFog: false
  }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppRoute>(AppRoute.HOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const savedStats = localStorage.getItem('classroom9x_local_profile_v2');
    if (savedStats) {
      setUser(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_local_profile_v2', JSON.stringify(user));
    
    // Sync themes and global settings to DOM
    const body = document.getElementById('app-body');
    if (body) {
      body.setAttribute('data-theme', user.currentTheme);
      
      if (user.settings.customCursor) {
        body.classList.add('custom-cursor-enabled');
      } else {
        body.classList.remove('custom-cursor-enabled');
      }

      if (user.settings.animatedBg) {
        body.classList.add('animated-bg-enabled');
      } else {
        body.classList.remove('animated-bg-enabled');
      }

      if (user.settings.volumetricFog) {
        body.classList.add('volumetric-fog-enabled');
      } else {
        body.classList.remove('volumetric-fog-enabled');
      }
    }
  }, [user]);

  const addExp = () => {
    const newExp = user.exp + EXP_PER_PLAY;
    const requiredForNext = user.level * LEVEL_UP_BASE;
    
    let newLevel = user.level;
    let unlocked = [...user.unlockedThemes];
    
    if (newExp >= requiredForNext) {
      newLevel += 1;
      if (newLevel === 5 && !unlocked.includes('rose')) unlocked.push('rose');
      if (newLevel === 10 && !unlocked.includes('emerald')) unlocked.push('emerald');
      if (newLevel === 15 && !unlocked.includes('amber')) unlocked.push('amber');
      if (newLevel === 20 && !unlocked.includes('violet')) unlocked.push('violet');
    }

    setUser({ ...user, exp: newExp, level: newLevel, unlockedThemes: unlocked });
  };

  const setTheme = (theme: string) => {
    setUser({ ...user, currentTheme: theme });
  };

  const updateSettings = (settings: Partial<User['settings']>) => {
    setUser(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const redeemCode = (code: string) => {
    const cleanCode = code.trim();
    if (cleanCode === '9xIsBack') {
      const allThemes = ['cyan', 'rose', 'emerald', 'amber', 'violet'];
      setUser(prev => ({
        ...prev,
        level: prev.level + 100,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes]))
      }));
      return { success: true, message: 'OPERATIVE CLEARANCE GRANTED: +100 LEVELS' };
    }
    
    if (cleanCode === 'rainbow') {
      setUser(prev => ({
        ...prev,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'rainbow']))
      }));
      return { success: true, message: 'MATRIX RGB THEME UNLOCKED' };
    }

    return { success: false, message: 'INVALID DECRYPTION KEY' };
  };

  const toggleFavorite = (gameId: string) => {
    const newFavorites = user.favorites.includes(gameId) 
      ? user.favorites.filter(id => id !== gameId) 
      : [...user.favorites, gameId];
    setUser({ ...user, favorites: newFavorites });
  };

  const handleGameSelect = (game: Game) => {
    setActiveGame(game);
    addExp();
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery) {
      return (
        <Library 
          games={filteredGames} 
          favorites={user.favorites} 
          onToggleFavorite={toggleFavorite} 
          onPlayGame={handleGameSelect}
        />
      );
    }

    switch (currentView) {
      case AppRoute.CATEGORY:
        return (
          <CategoryPage 
            categoryId={selectedCategoryId || ''} 
            games={GAMES_DATA} 
            favorites={user.favorites}
            onToggleFavorite={toggleFavorite}
            onPlayGame={handleGameSelect}
          />
        );

      case AppRoute.FAVORITES:
        return (
          <Favorites 
            games={GAMES_DATA} 
            favorites={user.favorites} 
            onToggleFavorite={toggleFavorite} 
            onPlayGame={handleGameSelect}
          />
        );

      case AppRoute.LIBRARY:
        return (
          <Library 
            games={GAMES_DATA} 
            favorites={user.favorites} 
            onToggleFavorite={toggleFavorite} 
            onPlayGame={handleGameSelect}
          />
        );

      case AppRoute.SETTINGS:
        return (
          <Settings 
            user={user}
            onUpdateSettings={updateSettings}
            onSetTheme={setTheme}
            onRedeemCode={redeemCode}
          />
        );

      case AppRoute.HOME:
      default:
        return (
          <Home 
            games={GAMES_DATA} 
            favorites={user.favorites} 
            onToggleFavorite={toggleFavorite} 
            onPlayGame={handleGameSelect}
            onSwitchToLibrary={() => setCurrentView(AppRoute.LIBRARY)}
          />
        );
    }
  };

  return (
    <Layout 
      user={user}
      onSearch={setSearchQuery} 
      onSetTheme={setTheme}
      currentView={currentView}
      onViewChange={(view, param) => {
        setCurrentView(view);
        setSelectedCategoryId(param || null);
        setSearchQuery('');
      }}
    >
      {renderContent()}

      {activeGame && (
        <GameModal 
          game={activeGame} 
          isFavorite={user.favorites.includes(activeGame.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setActiveGame(null)}
        />
      )}
    </Layout>
  );
};

export default App;
