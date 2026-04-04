using Microsoft.EntityFrameworkCore;
using BillGenerator.API.Data;
using BillGenerator.API.DTOs;
using BillGenerator.API.Models;

namespace BillGenerator.API.Services;

public class BillService(AppDbContext db) : IBillService
{
    /// <summary>Maps a Bill entity and its items to a BillDto.</summary>
    private static BillDto ToDto(Bill b) => new(
        b.Id, b.InvoiceNumber, b.Status, b.CreatedAt, b.UpdatedAt,
        new CustomerDto(b.CustomerName, b.CustomerPhone, b.CustomerEmail),
        b.Items.Select(i => new BillItemDto(i.Id, i.CatalogId, i.Name, i.Quantity, i.UnitPrice, i.Category)).ToList(),
        new DiscountDto(b.DiscountType, b.DiscountValue),
        b.TaxRate, b.Notes, b.CreatedByUserId
    );

    /// <summary>Returns bills scoped by role: Admin sees all, Employee sees own.</summary>
    public async Task<List<BillDto>> GetAllAsync(string userId, string role)
    {
        var query = db.Bills.Include(b => b.Items).AsQueryable();
        if (role != "Admin") query = query.Where(b => b.CreatedByUserId == userId);
        var bills = await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
        return bills.Select(ToDto).ToList();
    }

    /// <summary>Returns a bill if it exists and the caller has access.</summary>
    public async Task<BillDto?> GetByIdAsync(string id, string userId, string role)
    {
        var bill = await db.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        if (bill is null) return null;
        if (role != "Admin" && bill.CreatedByUserId != userId) return null;
        return ToDto(bill);
    }

    /// <summary>Persists a new bill with all line items.</summary>
    public async Task<BillDto> CreateAsync(CreateBillDto dto, string userId)
    {
        var bill = new Bill
        {
            Id                = dto.Id,
            InvoiceNumber     = dto.InvoiceNumber,
            Status            = dto.Status,
            CreatedAt         = dto.CreatedAt,
            UpdatedAt         = DateTime.UtcNow,
            CustomerName      = dto.Customer.Name,
            CustomerPhone     = dto.Customer.Phone,
            CustomerEmail     = dto.Customer.Email,
            DiscountType      = dto.Discount.Type,
            DiscountValue     = dto.Discount.Value,
            TaxRate           = dto.TaxRate,
            Notes             = dto.Notes,
            CreatedByUserId   = userId,
            Items             = dto.Items.Select(i => new BillItem
            {
                Id        = i.Id,
                BillId    = dto.Id,
                CatalogId = i.CatalogId,
                Name      = i.Name,
                Quantity  = i.Quantity,
                UnitPrice = i.UnitPrice,
                Category  = i.Category,
            }).ToList(),
        };

        db.Bills.Add(bill);
        await db.SaveChangesAsync();
        return ToDto(bill);
    }

    /// <summary>Replaces all mutable fields and line items of an existing bill.</summary>
    public async Task<BillDto?> UpdateAsync(string id, UpdateBillDto dto, string userId, string role)
    {
        var bill = await db.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        if (bill is null) return null;
        if (role != "Admin" && bill.CreatedByUserId != userId) return null;

        bill.Status        = dto.Status;
        bill.UpdatedAt     = DateTime.UtcNow;
        bill.CustomerName  = dto.Customer.Name;
        bill.CustomerPhone = dto.Customer.Phone;
        bill.CustomerEmail = dto.Customer.Email;
        bill.DiscountType  = dto.Discount.Type;
        bill.DiscountValue = dto.Discount.Value;
        bill.TaxRate       = dto.TaxRate;
        bill.Notes         = dto.Notes;

        // Replace items wholesale
        db.BillItems.RemoveRange(bill.Items);
        bill.Items = dto.Items.Select(i => new BillItem
        {
            Id        = i.Id,
            BillId    = bill.Id,
            CatalogId = i.CatalogId,
            Name      = i.Name,
            Quantity  = i.Quantity,
            UnitPrice = i.UnitPrice,
            Category  = i.Category,
        }).ToList();

        await db.SaveChangesAsync();
        return ToDto(bill);
    }

    /// <summary>Updates only the status field of a bill.</summary>
    public async Task<BillDto?> UpdateStatusAsync(string id, string status, string userId, string role)
    {
        var bill = await db.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        if (bill is null) return null;
        if (role != "Admin" && bill.CreatedByUserId != userId) return null;

        bill.Status    = status;
        bill.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return ToDto(bill);
    }

    /// <summary>Hard-deletes a bill and its items (cascade).</summary>
    public async Task<bool> DeleteAsync(string id)
    {
        var bill = await db.Bills.FindAsync(id);
        if (bill is null) return false;
        db.Bills.Remove(bill);
        await db.SaveChangesAsync();
        return true;
    }
}
