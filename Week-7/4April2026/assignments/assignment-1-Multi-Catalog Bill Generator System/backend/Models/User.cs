namespace BillGenerator.API.Models;

/// <summary>Application user with role-based access control.</summary>
public class User
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    /// <summary>Role: "Admin" or "Employee".</summary>
    public string Role { get; set; } = "Employee";
    public string? FullName { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; } = true;
}
