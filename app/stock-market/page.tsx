'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchStockData, transformStockData } from '../lib/api';
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

  const [stocks, setStocks] = useState<CategorizedStockItem[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<CategorizedStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); 
 
  

  const [selectedStock, setSelectedStock] = useState<CategorizedStockItem | null>(null);
  const router = useRouter();
  

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);


  const handleCardClick = useCallback((stock: CategorizedStockItem) => {
    setSelectedStock(stock);
    const slug = slugify(stock.name);

    router.push(`/stock-market#${slug}`, { scroll: false });
  }, [router]);


  const handleModalClose = useCallback(() => {
    setSelectedStock(null);

    router.push('/stock-market', { scroll: false });
  }, [router]);


  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchStockData();
        const transformedData = transformStockData(data);
        setStocks(transformedData);
        

        const categories = [...new Set(transformedData.map(item => item.category))];
        
        setAvailableCategories(categories);
        
        setError(null);
      } catch (err) {
        setError('Failed to load stock data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  useEffect(() => {
    if (!stocks.length || loading) return;

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
  }, [stocks, loading]); 


  useEffect(() => {
    if (!stocks.length) return;
    
    let result = [...stocks];
    

    if (searchTerm) {
      result = result.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    

    if (categoryFilter) {
      result = result.filter(stock => stock.category === categoryFilter);
    }

    
    setFilteredStocks(result);
  }, [stocks, searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <div className="py-8 px-4 sm:px-6 lg:px-8 transition-all duration-[var(--animation-duration-fast)]">
        <div className="max-w-7xl mx-auto">
        <header className="mb-10 relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-[var(--background)] to-[var(--accent-grey)] border border-[var(--border-color)] shadow-lg">
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
                aria-label="Filter and sort stock market data"
              />
            </div>
          </div>
        </header>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse" aria-live="polite" aria-busy="true">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] h-48 flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="border-t border-[var(--border-color)] pt-4">
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-100 p-5 rounded-lg shadow-sm transition-all duration-[var(--animation-duration-fast)]" role="alert">
            {error}
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
                <svg className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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