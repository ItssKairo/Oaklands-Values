import { StockData, CategorizedStockItem } from '../types/api';

const API_URL = 'https://public-api.typicaldevelopers.com/v1/oaklands/economy/stock-market';


export async function fetchStockData(): Promise<StockData> {
  const response = await fetch(API_URL, { next: { revalidate: 300 } });
  
  if (!response.ok) {
    const errorDetail = `Failed to fetch stock data: ${response.status} ${response.statusText}`;
    throw new Error(errorDetail);
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    throw new Error('Failed to parse stock data response.');
  }
}


export function transformStockData(data: StockData): CategorizedStockItem[] {
  const allStocks: CategorizedStockItem[] = [];
  

  const processCategory = (items: { [key: string]: any }, category: string) => {
    Object.entries(items).forEach(([id, item]) => {

      if (item && typeof item.name === 'string' && Array.isArray(item.values) && typeof item.current_difference === 'number') {
        allStocks.push({
          ...item,
          id,
          category,
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