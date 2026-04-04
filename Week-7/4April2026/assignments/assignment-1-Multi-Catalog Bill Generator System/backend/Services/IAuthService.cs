using BillGenerator.API.DTOs;

namespace BillGenerator.API.Services;

public interface IAuthService
{
    /// <summary>Validates credentials and returns a signed JWT on success.</summary>
    Task<LoginResponse?> LoginAsync(LoginRequest request);

    /// <summary>Creates a new user account (Admin only).</summary>
    Task<UserDto> CreateUserAsync(CreateUserRequest request);

    /// <summary>Returns all registered users (Admin only).</summary>
    Task<List<UserDto>> GetUsersAsync();

    /// <summary>Toggles the IsActive flag on a user account.</summary>
    Task<bool> ToggleUserActiveAsync(string userId);
}
