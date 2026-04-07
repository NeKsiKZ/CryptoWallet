using CryptoWallet.Models;
using Microsoft.EntityFrameworkCore;

namespace CryptoWallet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<CryptoAsset> CryptoAssets { get; set; }
    }
}
