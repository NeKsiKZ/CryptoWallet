using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CryptoWallet.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CryptoAssets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Symbol = table.Column<string>(type: "TEXT", nullable: false),
                    Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                    PurchasePrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CryptoAssets", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CryptoAssets",
                columns: new[] { "Id", "PurchaseDate", "PurchasePrice", "Quantity", "Symbol" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2767), 60000m, 0.5m, "BTC" },
                    { 2, new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2773), 3000m, 4m, "ETH" },
                    { 3, new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2775), 66000m, 0.1m, "BTC" },
                    { 4, new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2776), 120m, 25m, "SOL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CryptoAssets");
        }
    }
}
