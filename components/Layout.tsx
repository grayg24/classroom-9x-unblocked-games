
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
  currentRoute: AppRoute;
  currentParam: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearch, currentRoute, currentParam }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={onSearch} />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar Hidden on mobile, visible on lg */}
        <div className="hidden lg:block w-64 fixed h-[calc(100vh-64px)] overflow-y-auto border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm z-10">
          <Sidebar currentRoute={currentRoute} currentParam={currentParam} />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 md:p-8 bg-slate-950 min-h-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation Spacer */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default Layout;
