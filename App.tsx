import React, { useState, useEffect, useMemo } from 'react';
import { AppRoute, Game, User, CursorStyle } from './types.ts';
import { GAMES_DATA } from './constants.tsx';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import GameModal from './components/GameModal.tsx';
import ProfileModal from './components/ProfileModal.tsx';
import CategoryPage from './components/CategoryPage.tsx';
import Favorites from './components/Favorites.tsx';
import Library from './components/Library.tsx';
import Settings from './components/Settings.tsx';

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const DEFAULT_USER: User = {
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppRoute>(AppRoute.HOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
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
      
      const styles: CursorStyle[] = ['default', 'amongus', 'star', 'crosshair', 'sword', 'neon', 'ring'];
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
      
      if (newExp >= requiredForNext) {
        newLevel += 1;
        const themeUnlocks: { [lvl: number]: string } = {
          5: 'rose', 10: 'emerald', 15: 'violet', 20: 'cobalt', 40: 'crimson', 75: 'gold', 100: 'galaxy'
        };
        if (themeUnlocks[newLevel] && !unlockedThemes.includes(themeUnlocks[newLevel])) {
          unlockedThemes.push(themeUnlocks[newLevel]);
        }
      }

      return { 
        ...prev, 
        exp: newExp, 
        level: newLevel, 
        unlockedThemes,
        gamesPlayed: newGamesPlayed 
      };
    });
  };

  const setTheme = (theme: string) => setUser({ ...user, currentTheme: theme });

  const updateSettings = (settings: Partial<User['settings']>) => {
    setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  };

  const redeemCode = (code: string) => {
    const cleanCode = code.trim().toLowerCase();
    if (cleanCode === '9xisback') {
      const allThemes = ['cyan', 'rose', 'emerald', 'violet', 'cobalt', 'crimson', 'gold', 'galaxy'];
      setUser(prev => ({
        ...prev,
        level: prev.level + 100,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes]))
      }));
      return { success: true, message: 'OPERATIVE CLEARANCE GRANTED: +100 LEVELS' };
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
    addExpAndTrackPlay();
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery) return <Library games={filteredGames} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
    switch (currentView) {
      case AppRoute.CATEGORY: return <CategoryPage categoryId={selectedCategoryId || ''} games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.FAVORITES: return <Favorites games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.LIBRARY: return <Library games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.SETTINGS: return <Settings user={user} onUpdateSettings={updateSettings} onSetTheme={setTheme} onRedeemCode={redeemCode} />;
      default: return <Home user={user} games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} onSwitchToLibrary={() => setCurrentView(AppRoute.LIBRARY)} />;
    }
  };

  return (
    <Layout 
      user={user}
      onSearch={setSearchQuery} 
      onSetTheme={setTheme}
      currentView={currentView}
      selectedCategoryId={selectedCategoryId}
      onViewChange={(view, param) => {
        setCurrentView(view);
        setSelectedCategoryId(param || null);
        setSearchQuery('');
      }}
      onProfileClick={() => setIsProfileModalOpen(true)}
    >
      {renderContent()}
      {activeGame && <GameModal game={activeGame} isFavorite={user.favorites.includes(activeGame.id)} onToggleFavorite={toggleFavorite} onClose={() => setActiveGame(null)} />}
      {isProfileModalOpen && <ProfileModal user={user} onUpdateUser={(updates) => setUser(prev => ({ ...prev, ...updates }))} onUpdateSettings={updateSettings} onSetTheme={setTheme} onClose={() => setIsProfileModalOpen(false)} />}
    </Layout>
  );
};

export default App;