namespace BillGenerator.API.DTOs;

/// <summary>Login request payload.</summary>
public record LoginRequest(string Username, string Password);

/// <summary>Successful auth response carrying the JWT and user profile.</summary>
public record LoginResponse(
    string Token,
    string UserId,
    string Username,
    string? FullName,
    string Role,
    DateTime ExpiresAt
);

/// <summary>Admin-only request to create a new user.</summary>
public record CreateUserRequest(
    string Username,
    string Password,
    string Role,       // "Admin" | "Employee"
    string? FullName
);

/// <summary>Public user profile (no password hash).</summary>
public record UserDto(
    string Id,
    string Username,
    string? FullName,
    string Role,
    bool IsActive,
    DateTime CreatedAt
);
