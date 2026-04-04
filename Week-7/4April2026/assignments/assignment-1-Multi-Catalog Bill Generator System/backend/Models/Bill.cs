namespace BillGenerator.API.Models;

/// <summary>A billing invoice with line items and totals metadata.</summary>
public class Bill
{
    public string Id { get; set; } = string.Empty;
    public string InvoiceNumber { get; set; } = string.Empty;
    /// <summary>Lifecycle status: draft | saved | paid | cancelled.</summary>
    public string Status { get; set; } = "draft";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Customer (denormalised for simplicity)
    public string? CustomerName { get; set; }
    public string? CustomerPhone { get; set; }
    public string? CustomerEmail { get; set; }

    // Discount
    public string DiscountType { get; set; } = "percentage"; // percentage | fixed
    public decimal DiscountValue { get; set; }

    public decimal TaxRate { get; set; }
    public string? Notes { get; set; }

    // Created by
    public string CreatedByUserId { get; set; } = string.Empty;

    public List<BillItem> Items { get; set; } = [];
}
