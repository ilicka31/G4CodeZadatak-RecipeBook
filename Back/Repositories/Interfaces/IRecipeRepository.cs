using Back.DTOs.Recipe;
using Back.Models;

namespace Back.Repositories.Interfaces
{
    public interface IRecipeRepository
    {
        Task<Recipe> AddRecipe(Recipe recipe);
        Task DeleteRecipe(int recipeId);
        Task<List<Recipe>> GetAllRecipes();
        Task<List<Recipe>> GetMyRecipes(int userId);
        Task<List<Recipe>> GetSavedRecipes(int userId);
        Task<Recipe> AddRecipeToCollection(int recipeId, int userId);
    }
}
