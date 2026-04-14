using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CryptoWallet.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedDatav2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 1,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5853));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 2,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5862));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 3,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5863));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 4,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5864));

            migrationBuilder.InsertData(
                table: "CryptoAssets",
                columns: new[] { "Id", "PurchaseDate", "PurchasePrice", "Quantity", "Symbol" },
                values: new object[,]
                {
                    { 5, new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5865), 55000m, 0.3m, "BTC" },
                    { 6, new DateTime(2026, 4, 14, 21, 17, 14, 905, DateTimeKind.Utc).AddTicks(5866), 1900m, 5m, "ETH" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 1,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2767));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 2,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2773));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 3,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2775));

            migrationBuilder.UpdateData(
                table: "CryptoAssets",
                keyColumn: "Id",
                keyValue: 4,
                column: "PurchaseDate",
                value: new DateTime(2026, 4, 14, 21, 7, 16, 994, DateTimeKind.Utc).AddTicks(2776));
        }
    }
}
