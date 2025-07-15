import { StockData, CategorizedStockItem, StockItem, LeaderboardData } from '../types/api';
import { AppConfig } from './config';

const API_URL = AppConfig.stockApiUrl;


async function handleApiResponse<T>(response: Response, dataType: string): Promise<T> {
  if (!response.ok) {
    const errorDetail = `Failed to fetch ${dataType}: ${response.status} ${response.statusText}`;
    console.error(errorDetail);
    throw new Error(errorDetail);
  }
  try {
    return await response.json();
  } catch (error: unknown) {
    console.error(`JSON parsing error for ${dataType}:`, error);
    throw new Error(`Failed to parse ${dataType} response: ${error instanceof Error ? error.message : String(error)}`);
  }
}


export async function fetchStockData(): Promise<StockData> {
  const response = await fetch(API_URL, { next: { revalidate: 300 } });
  
  return handleApiResponse(response, 'stock data');
}


export async function fetchLeaderboardData(): Promise<LeaderboardData> {
  const LEADERBOARD_API_URL = AppConfig.leaderboardApiUrl;
  const response = await fetch(LEADERBOARD_API_URL, { next: { revalidate: 300 } });

  return handleApiResponse(response, 'leaderboard data');
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
          currency_type: item.currency_type || '',
          last_difference: item.last_difference || 0,
          values: item.values.map(val => ({
            ...val,
            refined_value: val.refined_value || 0,
            raw_value: val.raw_value || 0,
            forged_value: val.forged_value || 0,
            planked_value: val.planked_value || 0,
          })),
        });
      } else {
        console.warn(`Skipping invalid stock item in category ${category}:`, item);
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