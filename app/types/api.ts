export interface StockValue {
  difference: number;
  type: string;
  current_value: number;
  last_update: string;
  last_difference: number;
  refined_value?: number;
  raw_value?: number;
  forged_value?: number;
  planked_value?: number;
}

export interface StockItem {
  currency_type: string;
  name: string;
  ticker: string;
  values: StockValue[];
  category: string;
  current_difference: number;
  last_difference: number;
}

export interface CategorizedStockItem extends Omit<StockItem, 'currency_type'> {
  currency_type: string;
  id: string;
}

export interface StockData {
  trees?: Record<string, StockItem>;
  rocks?: Record<string, StockItem>;
  ores?: Record<string, StockItem>;
}

export interface LeaderboardItem {
  position: number;
  name: string;
  value: number;
}

export interface LeaderboardData {
  reset_time: string;
  leaderboard: LeaderboardItem[];
}