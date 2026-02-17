
import React, { useState, useEffect, useMemo } from 'react';
import { AppRoute, Game } from './types';
import { GAMES_DATA, CATEGORIES } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import GamePlayer from './components/GamePlayer';
import CategoryPage from './components/CategoryPage';
import Favorites from './components/Favorites';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [routeParam, setRouteParam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Initialize favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nebula_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('nebula_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle Hash Routing manually for this environment
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
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initialize

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            isFavorite={favorites.includes(game.id)} 
            onToggleFavorite={toggleFavorite} 
          />
        ) : <Home games={filteredGames} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      
      case AppRoute.CATEGORY:
        return (
          <CategoryPage 
            categoryId={routeParam || ''} 
            games={GAMES_DATA} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );

      case AppRoute.FAVORITES:
        return (
          <Favorites 
            games={GAMES_DATA} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        );

      case AppRoute.HOME:
      default:
        return <Home games={filteredGames} favorites={favorites} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <Layout 
      onSearch={setSearchQuery} 
      currentRoute={currentRoute} 
      currentParam={routeParam}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
