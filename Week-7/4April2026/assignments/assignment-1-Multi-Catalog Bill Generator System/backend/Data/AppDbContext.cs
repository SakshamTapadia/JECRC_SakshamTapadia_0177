using Microsoft.EntityFrameworkCore;
using BillGenerator.API.Models;

namespace BillGenerator.API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User>        Users        => Set<User>();
    public DbSet<Bill>        Bills        => Set<Bill>();
    public DbSet<BillItem>    BillItems    => Set<BillItem>();
    public DbSet<CatalogItem> CatalogItems => Set<CatalogItem>();

    protected override void OnModelCreating(ModelBuilder m)
    {
        // User
        m.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.HasIndex(u => u.Username).IsUnique();
        });

        // Bill
        m.Entity<Bill>(e =>
        {
            e.HasKey(b => b.Id);
            e.Property(b => b.DiscountValue).HasPrecision(18, 2);
            e.Property(b => b.TaxRate).HasPrecision(5, 2);
            e.HasMany(b => b.Items)
             .WithOne(i => i.Bill)
             .HasForeignKey(i => i.BillId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // BillItem
        m.Entity<BillItem>(e =>
        {
            e.HasKey(i => i.Id);
            e.Property(i => i.UnitPrice).HasPrecision(18, 2);
        });

        // CatalogItem
        m.Entity<CatalogItem>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Price).HasPrecision(18, 2);
        });

        // Seed default catalog items (IsEditable = false — cannot be deleted by users)
        m.Entity<CatalogItem>().HasData(
            // Entrance Fees
            new CatalogItem { Id = "ef-adult",   Name = "Adult Entry",         Price = 500,  Category = "entrance", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "ef-child",   Name = "Child Entry",         Price = 250,  Category = "entrance", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "ef-senior",  Name = "Senior Citizen Entry",Price = 300,  Category = "entrance", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "ef-student", Name = "Student Entry",       Price = 200,  Category = "entrance", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "ef-vip",     Name = "VIP Entry",           Price = 1200, Category = "entrance", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "ef-group",   Name = "Group Entry (10+)",   Price = 3500, Category = "entrance", IsCustomPrice = false, IsEditable = false },
            // Donations
            new CatalogItem { Id = "dn-bronze",   Name = "Bronze Donation",   Price = 100,  Category = "donation", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "dn-silver",   Name = "Silver Donation",   Price = 500,  Category = "donation", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "dn-gold",     Name = "Gold Donation",     Price = 1000, Category = "donation", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "dn-platinum", Name = "Platinum Donation", Price = 5000, Category = "donation", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "dn-custom",   Name = "Custom Donation",   Price = 0,    Category = "donation", IsCustomPrice = true,  IsEditable = false },
            // Products & Services
            new CatalogItem { Id = "sp-tshirt",   Name = "T-Shirt",              Price = 599, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-cap",      Name = "Cap",                  Price = 299, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-mug",      Name = "Mug",                  Price = 199, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-poster",   Name = "Poster / Print",       Price = 350, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-snack",    Name = "Snack Pack",           Price = 150, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-beverage", Name = "Beverage",             Price = 80,  Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-tour",     Name = "Guided Tour",          Price = 800, Category = "selling", IsCustomPrice = false, IsEditable = false },
            new CatalogItem { Id = "sp-photo",    Name = "Photography Package",  Price = 500, Category = "selling", IsCustomPrice = false, IsEditable = false }
        );
    }
}
