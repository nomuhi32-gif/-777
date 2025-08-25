import React from 'react';
import { ShopItemData } from '../types';

interface GachaResultModalProps {
  result: ShopItemData;
  onClose: () => void;
}

const GachaResultModal: React.FC<GachaResultModalProps> = ({ result, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 animate-fade-in-fast cursor-pointer"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClose()}
      aria-label="閉じる"
    >
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border-8 border-yellow-400 animate-zoom-in-gacha w-11/12 max-w-md">
        <p className="text-2xl font-bold text-slate-600 mb-2 drop-shadow-sm">ゲット！</p>
        <div className="text-8xl my-4 animate-gacha-pulse">
          {result.emoji}
        </div>
        <p className="text-3xl font-black text-orange-500 drop-shadow-sm">
          {result.name}
        </p>
         <p className="text-slate-500 mt-6 text-sm">画面をタップしてつづける</p>
      </div>
       <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        
        @keyframes zoom-in-gacha {
          from { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-zoom-in-gacha {
          animation: zoom-in-gacha 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }

        @keyframes gacha-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        .animate-gacha-pulse {
            animation: gacha-pulse 1s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default GachaResultModal;
