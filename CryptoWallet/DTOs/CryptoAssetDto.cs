namespace CryptoWallet.DTOs;

public class CryptoAssetDto
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public decimal? CurrentPrice { get; set; }
    public decimal? TotalValue => CurrentPrice.HasValue ? CurrentPrice * Quantity : null;
    public decimal? ProfitLoss => CurrentPrice.HasValue ? (CurrentPrice - PurchasePrice) * Quantity : null;
}