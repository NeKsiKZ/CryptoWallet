export interface CryptoAsset {
  id: number;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
}