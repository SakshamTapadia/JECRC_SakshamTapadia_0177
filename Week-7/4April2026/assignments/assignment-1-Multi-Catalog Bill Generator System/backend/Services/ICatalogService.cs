using BillGenerator.API.DTOs;

namespace BillGenerator.API.Services;

public interface ICatalogService
{
    /// <summary>Returns all catalog items, optionally filtered by category.</summary>
    Task<List<CatalogItemDto>> GetAllAsync(string? category);

    /// <summary>Adds a new custom catalog item (Admin only).</summary>
    Task<CatalogItemDto> CreateAsync(CreateCatalogItemDto dto);

    /// <summary>Updates a custom (editable) catalog item (Admin only).</summary>
    Task<CatalogItemDto?> UpdateAsync(string id, UpdateCatalogItemDto dto);

    /// <summary>Deletes a custom (editable) catalog item (Admin only).</summary>
    Task<bool> DeleteAsync(string id);
}
