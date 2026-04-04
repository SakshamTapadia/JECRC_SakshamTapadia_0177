namespace BillGenerator.API.DTOs;

/// <summary>Catalog item as returned by the API.</summary>
public record CatalogItemDto(
    string Id,
    string Name,
    decimal Price,
    string Category,
    bool IsCustomPrice,
    bool IsEditable
);

/// <summary>Payload for adding a new custom catalog item.</summary>
public record CreateCatalogItemDto(
    string Name,
    decimal Price,
    string Category,
    bool IsCustomPrice
);

/// <summary>Payload for updating an existing custom catalog item.</summary>
public record UpdateCatalogItemDto(
    string Name,
    decimal Price,
    bool IsCustomPrice
);
