using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BillGenerator.API.DTOs;
using BillGenerator.API.Services;

namespace BillGenerator.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService auth) : ControllerBase
{
    /// <summary>Authenticates a user and returns a JWT token.</summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var result = await auth.LoginAsync(request);
        if (result is null)
            return Unauthorized(new { message = "Invalid username or password." });
        return Ok(result);
    }

    /// <summary>Returns all registered users — Admin only.</summary>
    [HttpGet("users")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<UserDto>>> GetUsers() =>
        Ok(await auth.GetUsersAsync());

    /// <summary>Creates a new user account — Admin only.</summary>
    [HttpPost("users")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserRequest request)
    {
        if (request.Role != "Admin" && request.Role != "Employee")
            return BadRequest(new { message = "Role must be 'Admin' or 'Employee'." });
        var user = await auth.CreateUserAsync(request);
        return CreatedAtAction(nameof(GetUsers), user);
    }

    /// <summary>Toggles a user's active status — Admin only.</summary>
    [HttpPatch("users/{userId}/toggle-active")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ToggleActive(string userId)
    {
        var ok = await auth.ToggleUserActiveAsync(userId);
        return ok ? NoContent() : NotFound();
    }
}
