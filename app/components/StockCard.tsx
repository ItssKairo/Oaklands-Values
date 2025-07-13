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
      className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg-dark)] rounded-xl p-8 border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:shadow-md hover:shadow-[var(--accent-purple)]/10 transition-all duration-[var(--animation-duration-fast)] cursor-pointer relative overflow-hidden group"
      onClick={() => onClick(stock)}
      id={id}
      aria-label={`View details for ${stock.name}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--accent-purple)] opacity-0 group-hover:opacity-5 transition-opacity duration-[var(--animation-duration-fast)]"></div>
      
      <div className="flex flex-col space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xl text-white">{stock.name}</h3>
            <p className="text-xs text-gray-400">{stock.ticker}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-grey)]/20 text-gray-300 border border-[var(--border-color)]">
              {categoryDisplay}
            </span>
            <span className={`font-medium text-sm px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
              {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{percentChange}%
            </span>
          </div>
        </div>
        
        {/* <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-grey)]/20 text-gray-300 border border-[var(--border-color)] self-start">
          {categoryDisplay}
        </span> */}
      </div>
      
      <div className={`grid ${stock.values.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-y-2 gap-x-3 border-t border-[var(--border-color)] pt-3 justify-items-center`}>
        {stock.values.map((value: StockValue) => (
          <div key={value.type} className="flex flex-col items-center text-center">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{value.type}</span>
            <span className="text-base font-semibold text-white">{value.current_value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}