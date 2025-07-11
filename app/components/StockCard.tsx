'use client';

import { CategorizedStockItem, StockValue } from '../types/api';

interface StockCardProps {
  stock: CategorizedStockItem;
  onClick: (stock: CategorizedStockItem) => void;
  id?: string;
}

export default function StockCard({ stock, onClick, id }: StockCardProps) {

  const percentChange = ((stock.current_difference - 1) * 100).toFixed(1);
  const isPositive = stock.current_difference >= 1;
  

  const categoryDisplay = stock.category.charAt(0).toUpperCase() + stock.category.slice(1);
  
  return (
    <div 
      className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:shadow-lg hover:shadow-[var(--accent-purple)]/10 transition-all duration-[var(--animation-duration-fast)] cursor-pointer relative overflow-hidden group"
      onClick={() => onClick(stock)}
      id={id}
      aria-label={`View details for ${stock.name}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--accent-purple)] opacity-0 group-hover:opacity-10 transition-opacity duration-[var(--animation-duration-fast)]"></div>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl text-white mb-1">{stock.name}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-grey)]/50 text-gray-300 border border-[var(--border-color)]">
          {categoryDisplay}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>{stock.currency_type}</span>
        <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{percentChange}%
        </span>
      </div>
      
      <div className="border-t border-[var(--border-color)] pt-4 mt-4">
        <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
          {stock.values.map((value: StockValue) => (
            <span key={`${value.type}-label`} className="capitalize">{value.type}</span>
          ))}
        </div>
        <div className="flex justify-between text-base font-semibold text-white">
          {stock.values.map((value: StockValue) => (
            <span key={`${value.type}-value`}>{value.current_value.toFixed(2)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}