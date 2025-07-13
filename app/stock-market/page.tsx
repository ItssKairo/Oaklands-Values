'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchStockData, transformStockData, fetchLeaderboardData } from '../lib/api';
import { StockData, LeaderboardData } from '../types/api';
import CountdownTimer from '../components/CountdownTimer';
import { CategorizedStockItem } from '../types/api';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import Navigation from '../components/Navigation';
import StockModal from '../components/StockModal';


const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export default function StockMarketPage() {

  const [filteredStocks, setFilteredStocks] = useState<CategorizedStockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState<'none' | 'highest_value' | 'lowest_value'>('none');

  useEffect(() => {
    setSearchTerm(localStorage.getItem('stockSearchTerm') || '');
    setCategoryFilter(localStorage.getItem('stockCategoryFilter') || '');
    setSortBy((localStorage.getItem('stockSortBy') as 'none' | 'highest_value' | 'lowest_value') || 'none');
  }, []); 
 
  

  const [selectedStock, setSelectedStock] = useState<CategorizedStockItem | null>(null);
  const router = useRouter();
  

  const handleCardClick = useCallback((stock: CategorizedStockItem) => {
    setSelectedStock(stock);
    const slug = slugify(stock.name);
    router.push(`/stock-market#${slug}`, { scroll: false });
  }, [router]);

  const handleModalClose = useCallback(() => {
    setSelectedStock(null);
    router.push('/stock-market', { scroll: false });
  }, [router]);

  const { data, isError, error } = useQuery<{
    stockData: StockData;
    leaderboardData: LeaderboardData;
  }>({
    queryKey: ['stockMarketData'],
    queryFn: async () => {
      const stockData = await fetchStockData();
      const leaderboardData = await fetchLeaderboardData();
      return { stockData, leaderboardData };
    },
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
  });

  const stocks = useMemo(() => {
    if (!data) return [];
    return transformStockData(data.stockData);
  }, [data]);
  const resetTime = data?.leaderboardData?.reset_time || null;

  const availableCategories = useMemo(() => {
    if (!stocks.length) return [];
    return [...new Set(stocks.map(item => item.category))];
  }, [stocks]);

  useEffect(() => {
    if (!stocks.length) return;

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const targetStock = stocks.find(stock => slugify(stock.name) === hash);
        if (targetStock) {
          setSelectedStock(targetStock);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [stocks]);

  useEffect(() => {
    if (!stocks.length) return;

    let result = [...stocks];

    if (searchTerm) {
      result = result.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      localStorage.setItem('stockSearchTerm', searchTerm);
    } else {
      localStorage.removeItem('stockSearchTerm');
    }

    if (categoryFilter) {
      result = result.filter(stock => stock.category === categoryFilter);
      localStorage.setItem('stockCategoryFilter', categoryFilter);
    } else {
      localStorage.removeItem('stockCategoryFilter');
    }

    if (sortBy === 'highest_value') {
      result.sort((a, b) => {
        const maxA = Math.max(...a.values.map(v => v.current_value));
        const maxB = Math.max(...b.values.map(v => v.current_value));
        return maxB - maxA;
      });
      localStorage.setItem('stockSortBy', sortBy);
    } else if (sortBy === 'lowest_value') {
      result.sort((a, b) => {
        const minA = Math.min(...a.values.map(v => v.current_value));
        const minB = Math.min(...b.values.map(v => v.current_value));
        return minA - minB;
      });
      localStorage.setItem('stockSortBy', sortBy);
    } else {
      localStorage.removeItem('stockSortBy');
    }

    setFilteredStocks(result);
  }, [stocks, searchTerm, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <div className="py-8 px-4 sm:px-6 lg:px-8 transition-all duration-[var(--animation-duration-fast)]">
        <div className="max-w-7xl mx-auto">
        <header className="mb-10 relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-[var(--background)] to-[var(--accent-grey)] border border-[var(--border-color)] shadow-lg">

          {isError && <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center z-20"><p className="text-white text-xl">Error: {error?.message || 'Failed to fetch data'}</p></div>}
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block tracking-tight leading-tight">
              Oaklands Stock Market
            </h1>
          </div>
          <div className="absolute inset-0 opacity-20">

            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="gradient" cx=".5" cy=".5" r=".5">
                  <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                aria-label="Search stocks by name"
              />
            </div>
            <div className="flex-none">
              <FilterControls 
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                availableCategories={availableCategories}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                aria-label="Filter and sort stock market data"
              />
            </div>
          </div>
          {resetTime && <CountdownTimer resetTime={resetTime} />}
        </header>
        
        {isError ? (
          <div className="bg-red-900/20 border border-red-800 text-red-100 p-5 rounded-lg shadow-sm transition-all duration-[var(--animation-duration-fast)]" role="alert">
            {error?.message || 'Failed to load stock data. Please try again later.'}
          </div>
        ) : (
          <div className="animate-fadeIn" aria-live="polite">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-[var(--animation-duration-fast)]">
              {filteredStocks.map(stock => (
                <StockCard 
                  key={`${stock.category}-${stock.id}`} 
                  stock={stock} 
                  onClick={() => handleCardClick(stock)}
                />
              ))}
            </div>
            
            
            {filteredStocks.length === 0 && (
              <div className="text-center py-16 transition-all duration-[var(--animation-duration-fast)]" role="status">
                <p className="text-gray-400 text-lg">No stocks found matching your filters.</p>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
      <StockModal stock={selectedStock} onClose={handleModalClose} />
    </div>
  );
}