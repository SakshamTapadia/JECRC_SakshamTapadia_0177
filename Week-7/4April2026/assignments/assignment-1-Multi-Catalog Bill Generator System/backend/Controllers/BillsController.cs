using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BillGenerator.API.DTOs;
using BillGenerator.API.Services;

namespace BillGenerator.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BillsController(IBillService bills) : ControllerBase
{
    /// <summary>Returns current user's Id from JWT claims.</summary>
    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)
                          ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                          ?? string.Empty;

    /// <summary>Returns current user's role from JWT claims.</summary>
    private string Role => User.FindFirstValue(ClaimTypes.Role) ?? "Employee";

    // Bring in constant to avoid namespace conflicts
    private static class JwtRegisteredClaimNames
    {
        public const string Sub = "sub";
    }

    /// <summary>Returns bills scoped to caller's role (Admin: all, Employee: own).</summary>
    [HttpGet]
    public async Task<ActionResult<List<BillDto>>> GetAll() =>
        Ok(await bills.GetAllAsync(UserId, Role));

    /// <summary>Returns a single bill; 404 if not found or caller lacks access.</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<BillDto>> GetById(string id)
    {
        var bill = await bills.GetByIdAsync(id, UserId, Role);
        return bill is null ? NotFound() : Ok(bill);
    }

    /// <summary>Creates a new bill owned by the authenticated user.</summary>
    [HttpPost]
    public async Task<ActionResult<BillDto>> Create([FromBody] CreateBillDto dto)
    {
        var bill = await bills.CreateAsync(dto, UserId);
        return CreatedAtAction(nameof(GetById), new { id = bill.Id }, bill);
    }

    /// <summary>Fully replaces a bill's mutable fields and items.</summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<BillDto>> Update(string id, [FromBody] UpdateBillDto dto)
    {
        var bill = await bills.UpdateAsync(id, dto, UserId, Role);
        return bill is null ? NotFound() : Ok(bill);
    }

    /// <summary>Updates only the bill status (save, pay, cancel).</summary>
    [HttpPatch("{id}/status")]
    public async Task<ActionResult<BillDto>> UpdateStatus(string id, [FromBody] UpdateStatusDto dto)
    {
        var bill = await bills.UpdateStatusAsync(id, dto.Status, UserId, Role);
        return bill is null ? NotFound() : Ok(bill);
    }

    /// <summary>Deletes a bill — Admin only.</summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(string id)
    {
        var ok = await bills.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}
