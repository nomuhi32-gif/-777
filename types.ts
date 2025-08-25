export type SymbolId =
  | 'N700'
  | 'E5'
  | 'E6'
  | 'E7'
  | 'STATION'
  | 'EKIBEN'
  | 'DOCTOR_YELLOW';

export interface SymbolData {
  id: SymbolId;
  emoji: string;
  name: string;
  weight: number; // For weighted probability
}

export type WinType =
  | 'JACKPOT'
  | 'NATIONWIDE_MODE'
  | 'DOCTOR_YELLOW_APPEAR'
  | 'PARADE_BONUS'
  | 'COUPLING_BONUS'
  | 'EKIBEN_FESTIVAL'
  | 'BIG_WIN'
  | 'SMALL_WIN'
  | 'NONE';

export interface WinResult {
  type: WinType;
  points: number;
  message: string;
  animation: React.ReactNode;
}

// --- New Shop Types ---
export type ShopCategory = 'vehicle' | 'background' | 'ekiben' | 'custom' | 'gacha';

export interface ShopItemData {
  id: string;
  emoji: string;
  name: string;
  price: number;
  category: ShopCategory;
  description?: string;
}

export interface GachaPrize {
  item: ShopItemData;
  weight: number;
}
