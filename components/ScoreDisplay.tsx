import React from 'react';

interface ScoreDisplayProps {
  score: number;
  onShopClick: () => void;
  onCollectionClick: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, onShopClick, onCollectionClick }) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col items-end space-y-2 z-20">
        <div className="bg-yellow-400 text-slate-800 px-5 py-2 rounded-full shadow-lg border-4 border-white/80">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">スコア 🚂</span>
                <p className="text-3xl font-black tracking-wider min-w-[80px] text-right">{score.toLocaleString()}</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <button 
                onClick={onShopClick}
                className="px-4 py-2 bg-pink-500 text-white font-bold rounded-full shadow-md border-b-4 border-pink-700 hover:bg-pink-400 active:border-b-2 transition-all"
            >
                ショップ 🛍️
            </button>
            <button 
                onClick={onCollectionClick}
                className="px-4 py-2 bg-sky-500 text-white font-bold rounded-full shadow-md border-b-4 border-sky-700 hover:bg-sky-400 active:border-b-2 transition-all"
            >
                ずかん 📖
            </button>
        </div>
    </div>
  );
};

export default ScoreDisplay;
