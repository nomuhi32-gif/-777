
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SYMBOLS, REEL_COUNT } from './constants';
import { SymbolId, WinResult, ShopItemData } from './types';
import { SHOP_ITEMS, GACHA_PRIZES, ALL_SHOP_ITEMS_MAP } from './shopItems';
import Reel from './components/Reel';
import SpinButton from './components/SpinButton';
import StopButton from './components/StopButton';
import ScoreDisplay from './components/ScoreDisplay';
import WinNotification from './components/WinNotification';
import SymbolGuide from './components/SymbolGuide';
import ShopModal from './components/ShopModal';
import CollectionModal from './components/CollectionModal';
import GachaResultModal from './components/GachaResultModal';

const getWeightedRandomSymbolId = (): SymbolId => {
  const totalWeight = SYMBOLS.reduce((sum, symbol) => sum + symbol.weight, 0);
  let random = Math.random() * totalWeight;

  for (const symbol of SYMBOLS) {
    random -= symbol.weight;
    if (random <= 0) {
      return symbol.id;
    }
  }
  return SYMBOLS[SYMBOLS.length - 1].id;
};

const performGacha = (): ShopItemData => {
    const totalWeight = GACHA_PRIZES.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;

    for (const prize of GACHA_PRIZES) {
        random -= prize.weight;
        if (random <= 0) {
            return prize.item;
        }
    }
    return GACHA_PRIZES[GACHA_PRIZES.length - 1].item;
}

const evaluateWin = (reels: SymbolId[]): WinResult | null => {
  const counts = new Map<SymbolId, number>();
  reels.forEach(id => {
    counts.set(id, (counts.get(id) || 0) + 1);
  });
  const uniqueSymbols = new Set(reels);

  // 1. Jackpot
  const doctorYellowCount = counts.get('DOCTOR_YELLOW') || 0;
  if (doctorYellowCount === 3) {
    return {
      type: 'JACKPOT',
      points: 1000,
      message: 'ジャックポット！',
      animation: <span className="text-yellow-300">✨🚄💛 ドクターイエロー出現！✨</span>,
    };
  }

  // 2. Nationwide Mode / Standard Doctor Yellow Appearance
  if (doctorYellowCount > 0) {
    if (Math.random() < 0.15) { // Chance reduced from 0.25
       return {
        type: 'NATIONWIDE_MODE',
        points: 1500,
        message: '全国走破モード！',
        animation: <span className="text-yellow-400">🚄💛🗾✨</span>,
      };
    }
    return {
      type: 'DOCTOR_YELLOW_APPEAR',
      points: 100 * doctorYellowCount,
      message: '幸運の兆し！',
      animation: <span className="text-yellow-400">🚄💛 ドクターイエロー通過！</span>,
    };
  }

  // 3. Shinkansen Parade
  const shinkansenTypes: SymbolId[] = ['N700', 'E5', 'E6', 'E7'];
  const uniqueShinkansenOnReels = Array.from(uniqueSymbols).filter(id => shinkansenTypes.includes(id));
  if (uniqueShinkansenOnReels.length === 3) {
    return {
      type: 'PARADE_BONUS',
      points: 500,
      message: '新幹線パレード！',
      animation: <span className="text-cyan-400">🚄✨🚄✨🚄✨</span>,
    };
  }

  // 4. Coupling Bonus
  if (uniqueSymbols.has('E5') && uniqueSymbols.has('E6')) {
    return {
      type: 'COUPLING_BONUS',
      points: 300,
      message: '連結！',
      animation: <span><span className="text-green-500">🚄🟢</span>🤝<span className="text-red-500">🚄🔴</span></span>,
    };
  }
  
  // 5. Ekiben Festival
  const ekibenCount = counts.get('EKIBEN') || 0;
  if (ekibenCount >= 2) {
    const randomPoints = 50 + Math.floor(Math.random() * 151);
    return {
      type: 'EKIBEN_FESTIVAL',
      points: randomPoints,
      message: '駅弁フェス！',
      animation: <span className="text-amber-500">🍱🍵🍱</span>,
    };
  }
  
  // 6. Big Win
  let hasThreeOfAKind = false;
  for (const [symbol, count] of counts.entries()) {
    if (count === 3 && symbol !== 'STATION') {
      hasThreeOfAKind = true;
      break;
    }
  }
  if (hasThreeOfAKind) {
    return {
      type: 'BIG_WIN',
      points: 100,
      message: '大当たり！',
      animation: <span className="text-blue-400">ガタンゴトン！🚄💨</span>,
    };
  }

  // 7. Small Win - Now only for Shinkansen pairs
  let hasTwoOfAKindShinkansen = false;
  for (const [symbol, count] of counts.entries()) {
    if (count === 2 && shinkansenTypes.includes(symbol)) {
      hasTwoOfAKindShinkansen = true;
      break;
    }
  }
  if (hasTwoOfAKindShinkansen) {
    return {
      type: 'SMALL_WIN',
      points: 50,
      message: '小当たり！',
      animation: <span className="text-green-400">ナイス！👍</span>,
    };
  }

  return null;
};


export default function App() {
  const [reels, setReels] = useState<SymbolId[]>(['N700', 'E5', 'E6']);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false, false, false]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [canStopReels, setCanStopReels] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState<number>(1000); // Start with some points
  const [winResult, setWinResult] = useState<WinResult | null>(null);
  const finalSymbolsRef = useRef<SymbolId[]>([]);
  
  // Shop and Collection State
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState<boolean>(false);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [gachaResult, setGachaResult] = useState<ShopItemData | null>(null);

  const closeWinNotification = useCallback(() => setWinResult(null), []);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinResult(null);
    finalSymbolsRef.current = Array.from({ length: REEL_COUNT }, getWeightedRandomSymbolId);
    setSpinningReels([true, true, true]);
    setCanStopReels([true, true, true]);
  }, [isSpinning]);

  const handleStopReel = useCallback((index: number) => {
    if (!canStopReels[index]) return;

    setReels(prevReels => {
      const newReels = [...prevReels];
      newReels[index] = finalSymbolsRef.current[index];
      return newReels;
    });

    setSpinningReels(prevSpinning => {
      const newSpinning = [...prevSpinning];
      newSpinning[index] = false;
      return newSpinning;
    });

    setCanStopReels(prevCanStop => {
        const newCanStop = [...prevCanStop];
        newCanStop[index] = false;
        return newCanStop;
    });
  }, [canStopReels]);

  const handlePurchase = useCallback((itemId: string) => {
    const item = ALL_SHOP_ITEMS_MAP.get(itemId);
    if (!item) return;

    if (item.id === 'gacha_ticket') {
        if (score >= item.price) {
            setScore(s => s - item.price);
            const prize = performGacha();
            setPurchasedItems(prev => new Set(prev).add(prize.id));
            setGachaResult(prize);
        }
    } else {
        if (score >= item.price && !purchasedItems.has(item.id)) {
            setScore(s => s - item.price);
            setPurchasedItems(prev => new Set(prev).add(item.id));
        }
    }
  }, [score, purchasedItems]);

  useEffect(() => {
    if (isSpinning && spinningReels.every(s => !s)) {
      const result = evaluateWin(finalSymbolsRef.current);
      if (result) {
        setWinResult(result);
        setScore(s => s + result.points);
      }
      setIsSpinning(false);
    }
  }, [isSpinning, spinningReels]);

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen w-full bg-gradient-to-b from-cyan-300 to-sky-500 text-slate-800 p-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/50 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/30 rounded-full blur-2xl"></div>
      
      <ScoreDisplay 
        score={score} 
        onShopClick={() => setIsShopOpen(true)}
        onCollectionClick={() => setIsCollectionOpen(true)}
      />
      
      {winResult && <WinNotification result={winResult} onClose={closeWinNotification} />}
      {isShopOpen && <ShopModal score={score} purchasedItems={purchasedItems} onPurchase={handlePurchase} onClose={() => setIsShopOpen(false)} />}
      {isCollectionOpen && <CollectionModal purchasedItems={purchasedItems} onClose={() => setIsCollectionOpen(false)} />}
      {gachaResult && <GachaResultModal result={gachaResult} onClose={() => setGachaResult(null)} />}

      <div className="flex flex-col items-center justify-center w-full pt-32">
        <div className="text-center mb-6 animate-bounce-in">
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_2px_rgba(0,0,0,0.3)] leading-tight">
            しんかんせん<br />スロット
          </h1>
          <p className="text-8xl md:text-9xl font-black drop-shadow-[0_4px_2px_rgba(0,0,0,0.3)] tracking-tighter animate-rainbow-text -mt-2 md:-mt-4">
            777
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 sm:space-x-4 p-4 sm:p-6 bg-blue-800/60 rounded-3xl border-8 border-blue-400 shadow-2xl backdrop-blur-sm">
          {reels.map((symbolId, index) => (
            <Reel
              key={index}
              symbolId={symbolId}
              isSpinning={spinningReels[index]}
            />
          ))}
        </div>

        <div className="mt-8 h-28 flex items-center justify-center">
          {isSpinning ? (
            <div className="flex justify-center items-center space-x-2 sm:space-x-4">
              {canStopReels.map((canStop, index) => (
                 <StopButton
                   key={index}
                   onClick={() => handleStopReel(index)}
                   disabled={!canStop}
                 />
              ))}
            </div>
          ) : (
            <SpinButton onClick={handleSpin} isSpinning={isSpinning} />
          )}
        </div>
      </div>

      <div className="w-full flex justify-center pb-2 mt-4">
         <SymbolGuide />
      </div>
    </main>
  );
}
