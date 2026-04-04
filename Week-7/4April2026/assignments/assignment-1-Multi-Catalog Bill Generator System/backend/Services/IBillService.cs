using BillGenerator.API.DTOs;

namespace BillGenerator.API.Services;

public interface IBillService
{
    /// <summary>Returns all bills, newest first; employees see only their own.</summary>
    Task<List<BillDto>> GetAllAsync(string userId, string role);

    /// <summary>Returns a single bill; employees can only fetch their own.</summary>
    Task<BillDto?> GetByIdAsync(string id, string userId, string role);

    /// <summary>Creates a new bill owned by the requesting user.</summary>
    Task<BillDto> CreateAsync(CreateBillDto dto, string userId);

    /// <summary>Full-replace update; employees can only update their own bills.</summary>
    Task<BillDto?> UpdateAsync(string id, UpdateBillDto dto, string userId, string role);

    /// <summary>Status-only patch; employees can only update their own bills.</summary>
    Task<BillDto?> UpdateStatusAsync(string id, string status, string userId, string role);

    /// <summary>Deletes a bill; Admin only.</summary>
    Task<bool> DeleteAsync(string id);
}
