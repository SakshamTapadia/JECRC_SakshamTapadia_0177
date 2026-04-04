namespace BillGenerator.API.Models;

/// <summary>A named item in one of the billing catalogs.</summary>
public class CatalogItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    /// <summary>Category: entrance | donation | selling.</summary>
    public string Category { get; set; } = string.Empty;
    public bool IsCustomPrice { get; set; }
    /// <summary>False for seeded defaults — prevents deletion.</summary>
    public bool IsEditable { get; set; } = true;
}
