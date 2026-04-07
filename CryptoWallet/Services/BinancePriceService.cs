using System.Text.Json;
using CryptoWallet.DTOs;

namespace CryptoWallet.Services
{
    public class BinancePriceService : ICryptoPriceService
    {
        private readonly HttpClient _httpClient;

        public BinancePriceService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<decimal?> GetCurrentPriceAsync(string symbol)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://api.binance.com/api/v3/ticker/price?symbol={symbol.ToUpper()}USDT");

                if(!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();

                var data = JsonSerializer.Deserialize<BinancePriceDto>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (data != null && decimal.TryParse(data.Price, System.Globalization.CultureInfo.InvariantCulture, out decimal price))
                {
                    return price;
                }

                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}
