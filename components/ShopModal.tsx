import React from 'react';
import { ShopItemData } from '../types';
import { SHOP_ITEMS, CATEGORIES } from '../shopItems';

interface ShopModalProps {
  score: number;
  purchasedItems: Set<string>;
  onPurchase: (itemId: string) => void;
  onClose: () => void;
}

const ShopItemCard: React.FC<{ item: ShopItemData, score: number, purchased: boolean, onPurchase: () => void }> = ({ item, score, purchased, onPurchase }) => {
  const canAfford = score >= item.price;
  const isGacha = item.id === 'gacha_ticket';
  
  let buttonText = purchased ? '購入済み' : `${item.price}pt`;
  if (isGacha) {
     buttonText = `${item.price}pt`;
  }
  if (item.price === 0 && !purchased) {
    buttonText = '受け取る';
  }

  const isButtonDisabled = (!isGacha && purchased) || (!canAfford && !purchased);

  return (
    <div className="flex flex-col items-center justify-between p-3 bg-white/80 rounded-lg shadow-md text-center">
      <div className="text-5xl mb-2">{item.emoji}</div>
      <div className="text-sm font-bold text-slate-700 h-10 flex items-center">{item.name}</div>
      <button 
        onClick={onPurchase} 
        disabled={isButtonDisabled}
        className={`mt-2 w-full px-3 py-2 text-sm font-bold text-white rounded-md shadow-sm transition-colors duration-200
          ${isButtonDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600'
          }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const ShopModal: React.FC<ShopModalProps> = ({ score, purchasedItems, onPurchase, onClose }) => {
  const baseEkibenIds = ['e_meat', 'e_gyoza', 'e_crab', 'e_bento'];
  const hasAllBaseEkiben = baseEkibenIds.every(id => purchasedItems.has(id));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in-fast">
      <div className="bg-gradient-to-br from-sky-200 to-blue-300 p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-white/80 w-11/12 max-w-3xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black text-slate-800 drop-shadow-sm">ショップ 🛍️</h2>
          <button onClick={onClose} className="text-4xl font-bold text-slate-600 hover:text-red-500 transition-colors">&times;</button>
        </div>
        <div className="text-right mb-4 bg-white/70 px-4 py-1 rounded-full self-end">
          <span className="font-bold text-slate-600">所持スコア: </span>
          <span className="font-black text-xl text-yellow-600">{score.toLocaleString()}pt</span>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          {CATEGORIES.map(category => {
            let items = SHOP_ITEMS.filter(item => item.category === category.id);
            // Special handling for ekiben completion
            if (category.id === 'ekiben') {
              if (!hasAllBaseEkiben) {
                items = items.filter(item => item.id !== 'e_complete');
              }
            }
            if (items.length === 0) return null;

            return (
              <div key={category.id} className="mb-6">
                <h3 className="text-xl font-bold text-slate-700 border-b-4 border-sky-400 pb-1 mb-3">{category.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map(item => (
                    <ShopItemCard 
                      key={item.id} 
                      item={item} 
                      score={score}
                      purchased={purchasedItems.has(item.id)} 
                      onPurchase={() => onPurchase(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ShopModal;
