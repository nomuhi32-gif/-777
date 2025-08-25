
import React, { useState, useEffect, useRef } from 'react';
import { SYMBOLS, SYMBOL_MAP } from '../constants';
import { SymbolId, SymbolData } from '../types';

interface ReelProps {
  symbolId: SymbolId;
  isSpinning: boolean;
}

const ReelSymbolDisplay: React.FC<{ symbol: SymbolData }> = ({ symbol }) => (
  <div className="flex items-center justify-center h-full text-center transition-transform duration-100 group-hover:scale-110">
    <span className="text-6xl sm:text-8xl drop-shadow-md">
      {symbol.emoji}
    </span>
  </div>
);

const Reel: React.FC<ReelProps> = ({ symbolId, isSpinning }) => {
  const [displaySymbol, setDisplaySymbol] = useState<SymbolData>(SYMBOL_MAP.get(symbolId)!);
  const [isStopping, setIsStopping] = useState(false);
  const wasSpinningRef = useRef(isSpinning);

  useEffect(() => {
    let interval: number | undefined;
    if (isSpinning) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
        setDisplaySymbol(SYMBOLS[randomIndex]);
      }, 60);
    } else {
      setDisplaySymbol(SYMBOL_MAP.get(symbolId)!);
      // Check if it just stopped to trigger animation
      if (wasSpinningRef.current) {
        setIsStopping(true);
        setTimeout(() => setIsStopping(false), 200); // Duration of the animation
      }
    }
    
    wasSpinningRef.current = isSpinning;

    return () => clearInterval(interval);
  }, [isSpinning, symbolId]);

  const reelClasses = [
    "w-28 h-32 sm:w-36 sm:h-40 bg-sky-100 rounded-lg shadow-inner flex items-center justify-center overflow-hidden border-4 border-sky-300 group transition-transform duration-200",
    isStopping ? "animate-reel-stop" : ""
  ].join(' ');

  return (
    <>
      <div className={reelClasses}>
        <ReelSymbolDisplay symbol={displaySymbol} />
      </div>
      <style>{`
        @keyframes reel-stop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-reel-stop {
          animation: reel-stop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </>
  );
};

export default Reel;