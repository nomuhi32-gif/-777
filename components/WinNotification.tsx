import React from 'react';
import { WinResult } from '../types';

interface WinNotificationProps {
  result: WinResult;
  onClose: () => void;
}

const WinNotification: React.FC<WinNotificationProps> = ({ result, onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in cursor-pointer"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClose()}
      aria-label="閉じる"
    >
      <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border-8 border-yellow-400 animate-zoom-in w-11/12 max-w-md">
        <p className="text-3xl font-bold text-orange-500 mb-2 drop-shadow-sm">{result.message}</p>
        <div className="text-6xl sm:text-7xl font-extrabold my-4 animate-pulse">
          {result.animation}
        </div>
        <p className="text-5xl font-black text-slate-800 drop-shadow-sm">
          {result.points.toLocaleString()} <span className="text-2xl">ポイント！</span>
        </p>
         <p className="text-slate-500 mt-6 text-sm">画面をタップしてつづける</p>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes zoom-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in {
          animation: zoom-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </div>
  );
};

export default WinNotification;