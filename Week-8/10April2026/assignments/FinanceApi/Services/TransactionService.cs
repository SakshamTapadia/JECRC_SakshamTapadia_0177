using FinanceApi.Data;
using FinanceApi.DTOs;
using FinanceApi.Models;
using FinanceApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceApi.Services;

public class TransactionService : ITransactionService
{
    private readonly FinanceDbContext _context;

    public TransactionService(FinanceDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _context.Transactions.ToListAsync();
    }

    public async Task<Transaction?> GetByIdAsync(Guid id)
    {
        return await _context.Transactions.FindAsync(id);
    }

    public async Task<Transaction> CreateAsync(TransactionCreateDto dto)
    {
        if (!Enum.TryParse<TransactionType>(dto.Type, true, out var type))
            throw new ArgumentException($"Invalid transaction type: {dto.Type}");

        var transaction = new Transaction
        {
            Reference = $"TXN-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}",
            SenderName = dto.SenderName,
            ReceiverName = dto.ReceiverName,
            Amount = dto.Amount,
            Type = type,
            Description = dto.Description,
            Status = TransactionStatus.Completed
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<Transaction?> UpdateAsync(Guid id, TransactionUpdateDto dto)
    {
        var transaction = await _context.Transactions.FindAsync(id);
        if (transaction is null) return null;

        if (dto.Status is not null && Enum.TryParse<TransactionStatus>(dto.Status, true, out var status))
            transaction.Status = status;

        if (dto.Description is not null) transaction.Description = dto.Description;

        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var transaction = await _context.Transactions.FindAsync(id);
        if (transaction is null) return false;

        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();
        return true;
    }
}
