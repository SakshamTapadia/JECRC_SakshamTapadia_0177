using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BillGenerator.API.DTOs;
using BillGenerator.API.Services;

namespace BillGenerator.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CatalogsController(ICatalogService catalogs) : ControllerBase
{
    /// <summary>Returns all catalog items, optionally filtered by category query param.</summary>
    [HttpGet]
    public async Task<ActionResult<List<CatalogItemDto>>> GetAll([FromQuery] string? category) =>
        Ok(await catalogs.GetAllAsync(category));

    /// <summary>Adds a new custom catalog item — Admin only.</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CatalogItemDto>> Create([FromBody] CreateCatalogItemDto dto)
    {
        var item = await catalogs.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), item);
    }

    /// <summary>Updates a custom catalog item — Admin only.</summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CatalogItemDto>> Update(string id, [FromBody] UpdateCatalogItemDto dto)
    {
        var item = await catalogs.UpdateAsync(id, dto);
        return item is null ? NotFound() : Ok(item);
    }

    /// <summary>Deletes a custom (non-default) catalog item — Admin only.</summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(string id)
    {
        var ok = await catalogs.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}
