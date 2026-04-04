namespace BillGenerator.API.Models;

/// <summary>A single line item belonging to a bill.</summary>
public class BillItem
{
    public string Id { get; set; } = string.Empty;
    public string BillId { get; set; } = string.Empty;
    public Bill Bill { get; set; } = null!;
    public string? CatalogId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public string Category { get; set; } = "custom";
}
