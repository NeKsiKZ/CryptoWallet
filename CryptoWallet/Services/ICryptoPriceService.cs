namespace CryptoWallet.Services
{
    public interface ICryptoPriceService
    {
        Task<Decimal?> GetCurrentPriceAsync(string symbol);
    }
}
