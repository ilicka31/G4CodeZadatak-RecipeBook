using Back.DTOs.Recipe;
using Back.Models;

namespace Back.Services.Interfaces
{
    public interface IRecipeService
    {
        Task<RecipeDTO> AddRecipe(RecipeDTO recipe);
        Task DeleteRecipe(int recipeId);
        Task<List<RecipeDTO>> GetAllRecipes();
        Task<List<RecipeDTO>> GetMyRecipes(int id);
        Task<RecipeDTO> AddRecipeToCollection(int recipeId);
    }
}
