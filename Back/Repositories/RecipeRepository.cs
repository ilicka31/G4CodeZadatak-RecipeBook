using Back.Database;
using Back.DTOs.Recipe;
using Back.Models;
using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly RecipeDbContext _dbContext;
        public async Task<Recipe> AddRecipe(Recipe recipe)
        {
            await _dbContext.Recipes.AddAsync(recipe);
            await _dbContext.SaveChangesAsync(); // proveri treba li
            return recipe;
        }


        public async Task DeleteRecipe(int recipeId)
        {
            var r = await _dbContext.Recipes.FirstOrDefaultAsync(x => x.RecipeId == recipeId);
            if (r != null)
            {
                _dbContext.Recipes.Remove(r);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            return await _dbContext.Recipes.ToListAsync();
        }

        public async Task<List<Recipe>> GetMyRecipes(int userId)
        {
            var r = _dbContext.Recipes.Where(x => x.UserId == userId);
            return await r.ToListAsync();
        }
    }
}
