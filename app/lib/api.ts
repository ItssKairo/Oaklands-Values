import { StockData, CategorizedStockItem, StockItem } from '../types/api';

const API_URL = 'https://public-api.typicaldevelopers.com/v1/oaklands/economy/stock-market';


export async function fetchStockData(): Promise<StockData> {
  const response = await fetch(API_URL, { next: { revalidate: 300 } });
  
  if (!response.ok) {
    const errorDetail = `Failed to fetch stock data: ${response.status} ${response.statusText}`;
    throw new Error(errorDetail);
  }
  
  try {
    return await response.json();
  } catch (error: unknown) {
      console.error('JSON parsing error:', error);
      throw new Error(`Failed to parse stock data response: ${error instanceof Error ? error.message : String(error)}`);
  }
}


export function transformStockData(data: StockData): CategorizedStockItem[] {
  const allStocks: CategorizedStockItem[] = [];
  

  const processCategory = (items: Record<string, StockItem>, category: 'tree' | 'rock' | 'ore') => {
    Object.entries(items).forEach(([id, item]: [string, StockItem]) => {

      if (item && typeof item.name === 'string' && Array.isArray(item.values) && typeof item.current_difference === 'number') {
        allStocks.push({
          ...item,
          id,
          category,
          currency_type: '',
          last_difference: 0
        });
      } else {

      }
    });
  };


  if (data.trees) {
    processCategory(data.trees, 'tree');
  }
  

  if (data.rocks) {
    processCategory(data.rocks, 'rock');
  }
  

  if (data.ores) {
    processCategory(data.ores, 'ore');
  }
  
  return allStocks;
}