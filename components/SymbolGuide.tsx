import React from 'react';
import { SYMBOLS } from '../constants';

const SymbolGuide: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-4 border-white/90">
      <h2 className="text-center text-lg sm:text-xl font-black text-slate-700 mb-2 sm:mb-3 drop-shadow-sm">ずかん 📖</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-slate-600">
        {SYMBOLS.map((symbol) => (
          <li key={symbol.id} className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl">{symbol.emoji}</span>
            <span className="font-bold text-xs sm:text-sm">{symbol.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolGuide;
