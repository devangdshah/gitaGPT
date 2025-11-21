import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-b from-orange-100 to-transparent"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 serif-font tracking-wide mb-2">
          Gita Modern
        </h1>
        <p className="text-orange-600/80 font-medium text-lg tracking-widest uppercase">
          Ancient Wisdom • Modern Life
        </p>
      </div>
    </header>
  );
};

export default Header;
