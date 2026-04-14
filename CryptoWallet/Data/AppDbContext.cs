using CryptoWallet.Models;
using Microsoft.EntityFrameworkCore;

namespace CryptoWallet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<CryptoAsset> CryptoAssets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CryptoAsset>().HasData(
                new CryptoAsset { Id = 1, Symbol = "BTC", Quantity = 0.5m, PurchasePrice = 60000m },
                new CryptoAsset { Id = 2, Symbol = "ETH", Quantity = 4m, PurchasePrice = 3000m },
                new CryptoAsset { Id = 3, Symbol = "BTC", Quantity = 0.1m, PurchasePrice = 66000m },
                new CryptoAsset { Id = 4, Symbol = "SOL", Quantity = 25m, PurchasePrice = 120m },
                new CryptoAsset { Id = 5, Symbol = "BTC", Quantity = 0.3m, PurchasePrice = 55000m },
                new CryptoAsset { Id = 6, Symbol = "ETH", Quantity = 5m, PurchasePrice = 1900m }
            );
        }
    }
}
