using Back.DTOs.Ingredient;
using Back.DTOs.Recipe;
using Back.DTOs.User;
using Back.Models;
using Back.Services;
using Back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase       
    {
        private readonly IRecipeService _recipeService;
        private readonly IUserService _userService;

        public RecipeController(IRecipeService recipeService, IUserService userService)
        {
            _recipeService = recipeService;
            _userService = userService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "COOK")]
        public async Task<IActionResult> AddRecipe(RecipeDTO recipeDTO)
        {
            try
            {
                return Ok(await _recipeService.AddRecipe(recipeDTO, _userService.GetUserId(User)));
            }
            catch (Exception e)
            {

                return Conflict(e.Message);
            }

        }

        [Authorize(Roles = "COOK, USER")]
        [HttpGet("my-recipes")]
        public async Task<IActionResult> MyRecipes()
        {
            try
            {
                return Ok(await _recipeService.GetMyRecipes(_userService.GetUserId(User)));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

        [Authorize(Roles = "USER")]
        [HttpGet("saved-recipes")]
        public async Task<IActionResult> SavedRecipes()
        {
            try
            {
                return Ok(await _recipeService.GetSavedRecipes(_userService.GetUserId(User)));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }
        [Authorize(Roles = "USER")]
        [HttpGet("other")]
        public async Task<IActionResult> NotSavedRecipes()
        {
            try
            {
                return Ok(await _recipeService.GetNotSavedRecipes(_userService.GetUserId(User)));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

 
        [HttpGet("all-recipes")]
        public async Task<IActionResult> AllRecepies()
        {
            try
            {
                return Ok(await _recipeService.GetAllRecipes());
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

        [HttpGet("search-recipes/{search}")]
        public async Task<IActionResult> SearchRecepies(string search)
        {
            try
            {
                return Ok(await _recipeService.SearchRecipes(search));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

        [HttpPost("save-recipe/{recipeid}")]
        public async Task<IActionResult> SaveRecipe(int recipeId)
        {
            try
            {
                return Ok(await _recipeService.AddRecipeToCollection(recipeId, _userService.GetUserId(User)));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }



        [Authorize(Roles = "ADMIN, COOK")]
        [HttpDelete("delete/{recipeId}")]
        public async Task<IActionResult> DeleteRecipe(int recipeId)
        {
            try
            {
                await _recipeService.DeleteRecipe(recipeId);
                return Ok();
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

        [HttpPost("filter")]
        public async Task<IActionResult> FilterRecipe([FromBody]List<IngredientDTO> ingredients)
        {
            try
            {
                var x = await _recipeService.FilterRecipes(ingredients);
                if (x == null)
                    return Ok(await _recipeService.GetAllRecipes());
            return Ok(x);
            }
            catch (Exception e)
            {

                return Conflict(e.Message);
            }

        }
    }
}
