import { ShopItemData, ShopCategory, GachaPrize } from './types';

export const CATEGORIES: { id: ShopCategory, name: string }[] = [
    { id: 'vehicle', name: '🚄 車両カード' },
    { id: 'background', name: '🏞 背景' },
    { id: 'ekiben', name: '🍱 駅弁' },
    { id: 'custom', name: '🎨 カスタマイズ' },
    { id: 'gacha', name: '🎲 ガチャ' },
];

export const SHOP_ITEMS: ShopItemData[] = [
    // 🚄 車両カード
    { id: 'v_shinkansen_1', emoji: '🚄', name: '車両カード 1', price: 300, category: 'vehicle' },
    { id: 'v_shinkansen_2', emoji: '🚅', name: '車両カード 2', price: 300, category: 'vehicle' },
    { id: 'v_station_train', emoji: '🚉＋🚄', name: '駅と新幹線', price: 450, category: 'vehicle' },
    { id: 'v_shinkansen_sparkle', emoji: '🚄✨', name: 'キラキラ新幹線', price: 350, category: 'vehicle' },
    { id: 'v_doctor_yellow', emoji: '🚄💛', name: 'ドクターイエロー', price: 2000, category: 'vehicle' },
    { id: 'v_shinkansen_retro', emoji: '🚄🕰️', name: 'レトロ新幹線', price: 2800, category: 'vehicle' },
    // 🏞 背景
    { id: 'b_castle', emoji: '🏯', name: '城', price: 400, category: 'background' },
    { id: 'b_city', emoji: '🏙️', name: '都市', price: 400, category: 'background' },
    { id: 'b_mountain', emoji: '🏔️', name: '山', price: 700, category: 'background' },
    { id: 'b_spring', emoji: '🌸', name: '春', price: 800, category: 'background' },
    { id: 'b_summer', emoji: '☀️', name: '夏', price: 800, category: 'background' },
    { id: 'b_autumn', emoji: '🍁', name: '秋', price: 800, category: 'background' },
    { id: 'b_winter', emoji: '❄️', name: '冬', price: 800, category: 'background' },
    { id: 'b_galaxy', emoji: '🌌', name: '銀河', price: 1200, category: 'background' },
    // 🍱 駅弁
    { id: 'e_meat', emoji: '🍖', name: '肉弁当', price: 500, category: 'ekiben' },
    { id: 'e_gyoza', emoji: '🥟', name: '餃子弁当', price: 500, category: 'ekiben' },
    { id: 'e_crab', emoji: '🦀', name: 'カニ弁当', price: 500, category: 'ekiben' },
    { id: 'e_bento', emoji: '🍱', name: '幕の内弁当', price: 500, category: 'ekiben' },
    { id: 'e_complete', emoji: '🍣🍱🍙', name: '駅弁コンプリート', price: 0, category: 'ekiben', description: '駅弁を全て集めるともらえます' },
    // 🎨 カスタマイズ
    { id: 'c_star', emoji: '⭐️', name: 'スター', price: 150, category: 'custom' },
    { id: 'c_frame', emoji: '🔲', name: 'フレーム', price: 300, category: 'custom' },
    { id: 'c_music', emoji: '🎵', name: '音楽', price: 900, category: 'custom' },
    { id: 'c_bell', emoji: '🔔', name: 'ベル', price: 650, category: 'custom' },
    { id: 'c_sunrise', emoji: '🌅', name: '日の出', price: 1300, category: 'custom' },
    // 🎲 ガチャ
    { id: 'gacha_ticket', emoji: '🎰', name: 'ガチャを回す', price: 3000, category: 'gacha' },
];

export const GACHA_PRIZES: GachaPrize[] = [
  { item: { id: 'g_common', emoji: '🎴', name: 'コモン', price: 0, category: 'gacha' }, weight: 60 },
  { item: { id: 'g_rare', emoji: '🥡', name: 'レア', price: 0, category: 'gacha' }, weight: 25 },
  { item: { id: 'g_sr', emoji: '🚄💛', name: 'スーパーレア', price: 0, category: 'gacha' }, weight: 10 },
  { item: { id: 'g_ur', emoji: '🗾🚄✨', name: 'ウルトラレア', price: 0, category: 'gacha' }, weight: 5 },
];

export const ALL_SHOP_ITEMS_MAP = new Map<string, ShopItemData>([
    ...SHOP_ITEMS.map((item): [string, ShopItemData] => [item.id, item]),
    ...GACHA_PRIZES.map((prize): [string, ShopItemData] => [prize.item.id, prize.item])
]);