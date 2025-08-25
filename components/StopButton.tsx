import React from 'react';

interface StopButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const StopButton: React.FC<StopButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-20 h-20 sm:w-24 sm:h-24 bg-red-600 text-white text-4xl sm:text-5xl font-black rounded-full shadow-lg border-b-8 border-red-800 transform transition-all duration-100 ease-in-out hover:-translate-y-1 active:translate-y-0 active:border-b-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-b-8 disabled:border-gray-500 disabled:hover:translate-y-0 disabled:opacity-50"
      aria-label="リールを止める"
    >
      <span className="drop-shadow-md">止</span>
    </button>
  );
};

export default StopButton;