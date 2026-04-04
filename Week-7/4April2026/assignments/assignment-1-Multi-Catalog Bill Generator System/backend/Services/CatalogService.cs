using Microsoft.EntityFrameworkCore;
using BillGenerator.API.Data;
using BillGenerator.API.DTOs;
using BillGenerator.API.Models;

namespace BillGenerator.API.Services;

public class CatalogService(AppDbContext db) : ICatalogService
{
    /// <summary>Maps a CatalogItem entity to its DTO.</summary>
    private static CatalogItemDto ToDto(CatalogItem c) =>
        new(c.Id, c.Name, c.Price, c.Category, c.IsCustomPrice, c.IsEditable);

    /// <summary>Fetches all items, scoped to a category when provided.</summary>
    public async Task<List<CatalogItemDto>> GetAllAsync(string? category)
    {
        var query = db.CatalogItems.AsQueryable();
        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(c => c.Category == category);
        var items = await query.OrderBy(c => c.IsEditable).ThenBy(c => c.Name).ToListAsync();
        return items.Select(ToDto).ToList();
    }

    /// <summary>Persists a new user-defined catalog item.</summary>
    public async Task<CatalogItemDto> CreateAsync(CreateCatalogItemDto dto)
    {
        var item = new CatalogItem
        {
            Id           = $"{dto.Category}-c-{Guid.NewGuid():N[..8]}",
            Name         = dto.Name.Trim(),
            Price        = dto.Price,
            Category     = dto.Category,
            IsCustomPrice= dto.IsCustomPrice,
            IsEditable   = true,
        };
        db.CatalogItems.Add(item);
        await db.SaveChangesAsync();
        return ToDto(item);
    }

    /// <summary>Updates a custom item; returns null if not found or item is a default.</summary>
    public async Task<CatalogItemDto?> UpdateAsync(string id, UpdateCatalogItemDto dto)
    {
        var item = await db.CatalogItems.FindAsync(id);
        if (item is null || !item.IsEditable) return null;

        item.Name         = dto.Name.Trim();
        item.Price        = dto.Price;
        item.IsCustomPrice= dto.IsCustomPrice;
        await db.SaveChangesAsync();
        return ToDto(item);
    }

    /// <summary>Deletes a custom item; returns false if not found or item is a default.</summary>
    public async Task<bool> DeleteAsync(string id)
    {
        var item = await db.CatalogItems.FindAsync(id);
        if (item is null || !item.IsEditable) return false;
        db.CatalogItems.Remove(item);
        await db.SaveChangesAsync();
        return true;
    }
}
