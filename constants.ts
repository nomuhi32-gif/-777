import { SymbolData, SymbolId } from './types';

export const SYMBOLS: SymbolData[] = [
  { id: 'N700', name: 'N700系 のぞみ', emoji: '🚄🔵', weight: 12 },
  { id: 'E5', name: 'E5系 はやぶさ', emoji: '🚄🟢', weight: 12 },
  { id: 'E6', name: 'E6系 こまち', emoji: '🚄🔴', weight: 12 },
  { id: 'E7', name: 'E7系 かがやき', emoji: '🚄🟠', weight: 12 },
  { id: 'STATION', name: '駅', emoji: '🛤️', weight: 10 },
  { id: 'EKIBEN', name: '駅弁', emoji: '🍱', weight: 10 },
  { id: 'DOCTOR_YELLOW', name: 'ドクターイエロー', emoji: '🚄💛', weight: 4 }, // Increased rarity
];

export const SYMBOL_MAP = new Map<SymbolId, SymbolData>(SYMBOLS.map(s => [s.id, s]));

export const REEL_COUNT = 3;
export const SPIN_ANIMATION_DURATION = 1000;
export const REEL_STOP_DELAY = 400;