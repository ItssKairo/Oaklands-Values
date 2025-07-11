export interface StockValue {
  difference: number;
  type: string;
  base_value: number;
  current_value: number;
  forged_value: number;
  refined_value: number;
  raw_value: number;
}

export interface StockItem {
  name: string;
  currency_type: string;
  last_difference: number;
  current_difference: number;
  values: StockValue[];
  planked_value: number;
}

export interface StockData {
  reset_time: string;
  updated_time: string;
  trees: Record<string, StockItem>;
  rocks: Record<string, StockItem>;
  ores: Record<string, StockItem>;
}

export interface CategorizedStockItem extends StockItem {
  id: string;
  category: 'tree' | 'rock' | 'ore';
}