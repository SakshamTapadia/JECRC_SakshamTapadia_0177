namespace BillGenerator.API.DTOs;

public record BillItemDto(
    string Id,
    string? CatalogId,
    string Name,
    int Quantity,
    decimal UnitPrice,
    string Category
);

public record CustomerDto(
    string? Name,
    string? Phone,
    string? Email
);

public record DiscountDto(
    string Type,
    decimal Value
);

/// <summary>Full bill representation returned by the API.</summary>
public record BillDto(
    string Id,
    string InvoiceNumber,
    string Status,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    CustomerDto Customer,
    List<BillItemDto> Items,
    DiscountDto Discount,
    decimal TaxRate,
    string? Notes,
    string CreatedByUserId
);

/// <summary>Payload for creating a new bill (id and invoiceNumber generated on frontend).</summary>
public record CreateBillDto(
    string Id,
    string InvoiceNumber,
    string Status,
    DateTime CreatedAt,
    CustomerDto Customer,
    List<BillItemDto> Items,
    DiscountDto Discount,
    decimal TaxRate,
    string? Notes
);

/// <summary>Full-replace update payload for an existing bill.</summary>
public record UpdateBillDto(
    string Status,
    CustomerDto Customer,
    List<BillItemDto> Items,
    DiscountDto Discount,
    decimal TaxRate,
    string? Notes
);

/// <summary>Partial status-only update.</summary>
public record UpdateStatusDto(string Status);
