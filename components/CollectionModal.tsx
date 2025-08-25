import React from 'react';
import { ShopItemData } from '../types';
import { ALL_SHOP_ITEMS_MAP, CATEGORIES } from '../shopItems';

interface CollectionModalProps {
  purchasedItems: Set<string>;
  onClose: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ purchasedItems, onClose }) => {
  const collectedItems = Array.from(purchasedItems)
    .map(id => ALL_SHOP_ITEMS_MAP.get(id))
    .filter((item): item is ShopItemData => item !== undefined);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in-fast">
      <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-white/80 w-11/12 max-w-3xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black text-slate-800 drop-shadow-sm">ずかん 📖</h2>
          <button onClick={onClose} className="text-4xl font-bold text-slate-600 hover:text-red-500 transition-colors">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          {CATEGORIES.map(category => {
            const itemsInCategory = collectedItems.filter(item => item.category === category.id);
            return (
              <div key={category.id} className="mb-6">
                <h3 className="text-xl font-bold text-slate-700 border-b-4 border-yellow-400 pb-1 mb-3">{category.name}</h3>
                {itemsInCategory.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {itemsInCategory.map(item => (
                        <div key={item.id} className="flex flex-col items-center p-3 bg-white/70 rounded-lg shadow-sm text-center">
                            <div className="text-5xl mb-2">{item.emoji}</div>
                            <div className="text-sm font-bold text-slate-700">{item.name}</div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm italic">このカテゴリのアイテムはまだありません。</p>
                )}
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

export default CollectionModal;
