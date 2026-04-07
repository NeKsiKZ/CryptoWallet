using System.ComponentModel.DataAnnotations;

namespace CryptoWallet.DTOs;

public class CreateCryptoAssetDto
{
    [Required]
    [StringLength(10)]
    public string Symbol { get; set; } = string.Empty;

    [Range(0.00000001, double.MaxValue, ErrorMessage = "Ilość musi być większa niż 0.")]
    public decimal Quantity { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Cena zakupu musi być większa niż 0.")]
    public decimal PurchasePrice { get; set; }
}