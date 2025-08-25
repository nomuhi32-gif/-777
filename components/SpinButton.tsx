
import React from 'react';

interface SpinButtonProps {
  onClick: () => void;
  isSpinning: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, isSpinning }) => {
  return (
    <button
      onClick={onClick}
      disabled={isSpinning}
      className="px-10 py-5 bg-orange-500 text-white text-3xl font-black rounded-full shadow-lg border-b-8 border-orange-700 transform transition-all duration-150 ease-in-out hover:-translate-y-1 active:translate-y-0 active:border-b-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-b-8 disabled:border-gray-500 disabled:hover:translate-y-0"
      aria-label="スロットを回す"
    >
      <span className="drop-shadow-md">
        {isSpinning ? '回転中...' : 'スピン！'}
      </span>
    </button>
  );
};

export default SpinButton;
