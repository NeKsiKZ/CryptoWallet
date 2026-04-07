namespace CryptoWallet.DTOs;

public class CryptoAssetDto
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
}