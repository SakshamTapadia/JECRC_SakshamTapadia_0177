using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BillGenerator.API.Data;
using BillGenerator.API.DTOs;
using BillGenerator.API.Models;

namespace BillGenerator.API.Services;

public class AuthService(AppDbContext db, IConfiguration config) : IAuthService
{
    /// <summary>Verifies password and returns a signed JWT token if valid.</summary>
    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await db.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return null;

        var token = GenerateToken(user);
        var expiry = DateTime.UtcNow.AddMinutes(config.GetValue<int>("Jwt:ExpiryMinutes"));

        return new LoginResponse(token, user.Id, user.Username, user.FullName, user.Role, expiry);
    }

    /// <summary>Creates a new user with a bcrypt-hashed password.</summary>
    public async Task<UserDto> CreateUserAsync(CreateUserRequest request)
    {
        var user = new User
        {
            Id           = $"usr-{Guid.NewGuid():N}",
            Username     = request.Username.Trim().ToLower(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role         = request.Role,
            FullName     = request.FullName,
            CreatedAt    = DateTime.UtcNow,
            IsActive     = true,
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();
        return ToDto(user);
    }

    /// <summary>Returns all users mapped to public DTOs.</summary>
    public async Task<List<UserDto>> GetUsersAsync() =>
        (await db.Users.OrderBy(u => u.CreatedAt).ToListAsync()).Select(ToDto).ToList();

    /// <summary>Flips the active flag and persists, returns false if user not found.</summary>
    public async Task<bool> ToggleUserActiveAsync(string userId)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null) return false;
        user.IsActive = !user.IsActive;
        await db.SaveChangesAsync();
        return true;
    }

    /// <summary>Builds a signed JWT for the given user with role claim.</summary>
    private string GenerateToken(User user)
    {
        var key     = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!));
        var creds   = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiry  = DateTime.UtcNow.AddMinutes(config.GetValue<int>("Jwt:ExpiryMinutes"));

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,  user.Id),
            new Claim(JwtRegisteredClaimNames.Name, user.Username),
            new Claim(ClaimTypes.Role,              user.Role),
            new Claim("fullName",                   user.FullName ?? string.Empty),
        };

        var token = new JwtSecurityToken(
            issuer:    config["Jwt:Issuer"],
            audience:  config["Jwt:Audience"],
            claims:    claims,
            expires:   expiry,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static UserDto ToDto(User u) =>
        new(u.Id, u.Username, u.FullName, u.Role, u.IsActive, u.CreatedAt);
}
