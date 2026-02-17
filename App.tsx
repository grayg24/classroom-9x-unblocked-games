
import React, { useState, useEffect, useMemo } from 'react';
import { AppRoute, Game, User } from './types';
import { GAMES_DATA, CATEGORIES } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import GamePlayer from './components/GamePlayer';
import CategoryPage from './components/CategoryPage';
import Favorites from './components/Favorites';

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [routeParam, setRouteParam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Load active session on mount
  useEffect(() => {
    const activeSession = localStorage.getItem('classroom9x_active_user');
    if (activeSession) {
      const users = JSON.parse(localStorage.getItem('classroom9x_users') || '[]');
      const found = users.find((u: User) => u.username === activeSession);
      if (found) setUser(found);
    }
  }, []);

  // Sync active user progress to the "database" (localStorage users list)
  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('classroom9x_users') || '[]');
      const updatedUsers = users.map((u: User) => u.username === user.username ? user : u);
      localStorage.setItem('classroom9x_users', JSON.stringify(updatedUsers));
      localStorage.setItem('classroom9x_active_user', user.username);
      document.getElementById('app-body')?.setAttribute('data-theme', user.currentTheme);
    } else {
      localStorage.removeItem('classroom9x_active_user');
      document.getElementById('app-body')?.removeAttribute('data-theme');
    }
  }, [user]);

  // Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const [route, param] = hash.split('/');
      
      if (!route || route === '') {
        setCurrentRoute(AppRoute.HOME);
        setRouteParam(null);
      } else {
        setCurrentRoute(route as AppRoute);
        setRouteParam(param || null);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (username: string, password?: string) => {
    const users = JSON.parse(localStorage.getItem('classroom9x_users') || '[]');
    const found = users.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const handleSignUp = (username: string, password?: string) => {
    const users = JSON.parse(localStorage.getItem('classroom9x_users') || '[]');
    const exists = users.find((u: any) => u.username.toLowerCase() === username.toLowerCase());
    
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    const newUser: User = {
      username,
      password,
      exp: 0,
      level: 1,
      currentTheme: 'cyan',
      unlockedThemes: ['cyan'],
      favorites: []
    };

    users.push(newUser);
    localStorage.setItem('classroom9x_users', JSON.stringify(users));
    setUser(newUser);
    return { success: true };
  };

  const addExp = () => {
    if (!user) return;
    
    const newExp = user.exp + EXP_PER_PLAY;
    const requiredForNext = user.level * LEVEL_UP_BASE;
    
    let newLevel = user.level;
    let unlocked = [...user.unlockedThemes];
    
    if (newExp >= requiredForNext) {
      newLevel += 1;
      if (newLevel === 2 && !unlocked.includes('rose')) unlocked.push('rose');
      if (newLevel === 4 && !unlocked.includes('emerald')) unlocked.push('emerald');
      if (newLevel === 6 && !unlocked.includes('amber')) unlocked.push('amber');
      if (newLevel === 10 && !unlocked.includes('violet')) unlocked.push('violet');
    }

    setUser({ ...user, exp: newExp, level: newLevel, unlockedThemes: unlocked });
  };

  const setTheme = (theme: string) => {
    if (user) setUser({ ...user, currentTheme: theme });
  };

  const toggleFavorite = (gameId: string) => {
    if (!user) return;
    const newFavorites = user.favorites.includes(gameId) 
      ? user.favorites.filter(id => id !== gameId) 
      : [...user.favorites, gameId];
    setUser({ ...user, favorites: newFavorites });
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.GAME:
        const game = GAMES_DATA.find(g => g.id === routeParam);
        return game ? (
          <GamePlayer 
            game={game} 
            isFavorite={user ? user.favorites.includes(game.id) : false} 
            onToggleFavorite={toggleFavorite} 
            onPlay={addExp}
            user={user}
          />
        ) : <Home games={filteredGames} favorites={user?.favorites || []} onToggleFavorite={toggleFavorite} />;
      
      case AppRoute.CATEGORY:
        return (
          <CategoryPage 
            categoryId={routeParam || ''} 
            games={GAMES_DATA} 
            favorites={user?.favorites || []}
            onToggleFavorite={toggleFavorite}
          />
        );

      case AppRoute.FAVORITES:
        return (
          <Favorites 
            games={GAMES_DATA} 
            favorites={user?.favorites || []} 
            onToggleFavorite={toggleFavorite} 
          />
        );

      case AppRoute.HOME:
      default:
        return <Home games={filteredGames} favorites={user?.favorites || []} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <Layout 
      user={user}
      onSearch={setSearchQuery} 
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onLogout={() => setUser(null)}
      onSetTheme={setTheme}
      currentRoute={currentRoute} 
      currentParam={routeParam}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
