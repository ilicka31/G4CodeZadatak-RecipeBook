using Back.DTOs.Ingredient;
using Back.DTOs.Recipe;
using Back.Services;
using Back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;
        private readonly IUserService _userService;

        public IngredientController(IIngredientService ingredientService, IUserService userService)
        {
            _ingredientService = ingredientService;
            _userService = userService;
        }
        /*  Task<IngredientDTO> AddIngredient(IngredientDTO ingredient);
        Task<List<IngredientDTO>> GetAll();
        Task DeleteIngredient(int ingredientId);*/
        [Authorize(Roles ="ADMIN")]
        [HttpPost("add")]
        public async Task<IActionResult> AddIngredient(NewIngredientDTO ingredientDTO)
        {
            try
            {
                return Ok(await _ingredientService.AddIngredient(ingredientDTO));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }
        [Authorize(Roles = "ADMIN, COOK")]
        [HttpGet("all")]
        public async Task<IActionResult> AllIngredients()
        {
            try
            {
                return Ok(await _ingredientService.GetAll());
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }
        [Authorize(Roles = "ADMIN")]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            try
            {
                await _ingredientService.DeleteIngredient(id);
                return Ok();
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

    }
}
