namespace FinanceApi.DTOs;

public record TransactionCreateDto(
    string SenderName,
    string ReceiverName,
    decimal Amount,
    string Type,
    string Description
);

public record TransactionUpdateDto(
    string? Status,
    string? Description
);
