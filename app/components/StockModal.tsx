import React, { useEffect, useRef, useState } from 'react';
import { CategorizedStockItem } from '../types/api';

interface StockModalProps {
  stock: CategorizedStockItem | null;
  onClose: () => void;
}

const StockModal: React.FC<StockModalProps> = ({ stock, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsClosing(true);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsClosing(true);
      }
    };

    if (stock) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [stock, onClose]);

  useEffect(() => {
    if (!stock) {
      setIsClosing(false);
    } else if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [stock, isClosing, onClose]);

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const categoryValueMap: { [key: string]: string } = {
    ore: 'forged',
    rock: 'forged',
    tree: 'planked',
  };

  const getCurrentDisplayValue = () => {
    if (!stock) return 0;

    const preferredType = categoryValueMap[stock.category.toLowerCase()] || 'refined';
    return stock.values.find(val => val.type === preferredType)?.current_value || 0;
  };

  const currentDisplayValue = getCurrentDisplayValue();

  if (!stock && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-[var(--animation-duration-normal)] bg-black/80 backdrop-blur-md ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {stock && (
        <div
          ref={modalRef}
          className="relative w-full max-w-3xl mx-auto bg-[var(--card-bg)] rounded-xl shadow-2xl border border-[var(--border-color)] transform transition-all duration-[var(--animation-duration-fast)] scale-95 animate-scale-in"
        >
          <button
            onClick={() => setIsClosing(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close stock details modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {stock.name}
            </h2>
            <p className="text-gray-400 text-sm mb-6">Category: {stock.category} | Currency: {stock.currency_type}</p>

            <div className="mb-6">
              <div className="p-6 rounded-lg mb-6 bg-gradient-to-r from-[var(--accent-purple)]/20 to-transparent border border-[var(--border-color)]">
                <p className="text-xl font-semibold text-white">Current Value: <span className={getChangeColor(stock.current_difference)}>{formatValue(currentDisplayValue)}</span></p>
                <p className={`text-base ${getChangeColor(stock.current_difference)}`}>
                  Change: {stock.current_difference > 0 ? '+' : ''}{stock.current_difference.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stock.values.map((val, index) => (
                <div key={index} className="bg-[var(--card-bg)] p-5 rounded-lg border border-[var(--border-color)] shadow-md">
                  <p className="text-gray-400 text-sm mb-1">{val.type}</p>
                  <p className="text-white text-xl font-semibold mb-2">{formatValue(val.current_value)}</p>
                  <p className={`text-sm ${getChangeColor(val.difference || 0)}`}>
                    {(val.difference || 0) > 0 ? '▲' : '▼'} {(val.difference || 0) > 0 ? '+' : ''}{(val.difference || 0).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockModal;