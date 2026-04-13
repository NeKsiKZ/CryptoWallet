export interface CryptoAsset {
  id: number;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
}

export interface GroupedAsset {
  symbol: string;
  totalQuantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
  totalValue: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
  isExpanded: boolean;
  items: CryptoAsset[];
}