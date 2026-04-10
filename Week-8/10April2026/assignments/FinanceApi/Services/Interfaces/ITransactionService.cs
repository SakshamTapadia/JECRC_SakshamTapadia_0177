using FinanceApi.DTOs;
using FinanceApi.Models;

namespace FinanceApi.Services.Interfaces;

public interface ITransactionService
{
    Task<IEnumerable<Transaction>> GetAllAsync();
    Task<Transaction?> GetByIdAsync(Guid id);
    Task<Transaction> CreateAsync(TransactionCreateDto dto);
    Task<Transaction?> UpdateAsync(Guid id, TransactionUpdateDto dto);
    Task<bool> DeleteAsync(Guid id);
}
