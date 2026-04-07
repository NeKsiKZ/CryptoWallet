using CryptoWallet.Data;
using CryptoWallet.DTOs;
using CryptoWallet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CryptoWallet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoAssetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CryptoAssetsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CryptoAssetDto>>> GetAll()
        {
            var assets = await _context.CryptoAssets
                .Select(a => new  CryptoAssetDto
                {
                    Id = a.Id,
                    Symbol = a.Symbol,
                    Quantity = a.Quantity,
                    PurchasePrice = a.PurchasePrice,
                    PurchaseDate = a.PurchaseDate
                })
                .ToListAsync();

            return Ok(assets);
        }

        [HttpPost]
        public async Task<ActionResult<CryptoAssetDto>> Create(CreateCryptoAssetDto dto)
        {
            var asset = new CryptoAsset
            {
                Symbol = dto.Symbol.ToUpper(),
                Quantity = dto.Quantity,
                PurchasePrice = dto.PurchasePrice,
                PurchaseDate = DateTime.UtcNow
            };

            _context.CryptoAssets.Add(asset);
            await _context.SaveChangesAsync();

            var resultDto = new CryptoAssetDto
            {
                Id = asset.Id,
                Symbol = asset.Symbol,
                Quantity = asset.Quantity,
                PurchasePrice = asset.PurchasePrice,
                PurchaseDate = asset.PurchaseDate
            };

            return CreatedAtAction(nameof(GetAll), new {id = asset.Id}, resultDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateCryptoAssetDto dto)
        {
            var asset = await _context.CryptoAssets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            asset.Symbol = dto.Symbol.ToUpper();
            asset.Quantity = dto.Quantity;
            asset.PurchasePrice = dto.PurchasePrice;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var asset = await _context.CryptoAssets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.CryptoAssets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
