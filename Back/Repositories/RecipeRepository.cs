using Back.Database;
using Back.DTOs.Recipe;
using Back.Models;
using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace Back.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly RecipeDbContext _dbContext;

        public RecipeRepository(RecipeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Recipe> AddRecipe(Recipe recipe)
        {
            foreach (var ingredient in recipe.Ingredients)
            {
                _dbContext.Entry(ingredient).State = EntityState.Unchanged;
            }

            await _dbContext.Recipes.AddAsync(recipe);
            await _dbContext.SaveChangesAsync(); 
            return recipe;
        }

        public async Task<Recipe> AddRecipeToCollection(int recipeId, int userId)
        {
            var u =   await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            var r = await _dbContext.Recipes.FirstOrDefaultAsync(x => x.RecipeId == recipeId);
            if(u.SavedRecipes == null)
                u.SavedRecipes = new List<Recipe>();
            if (u.SavedRecipes.Contains(r))
            {
                return null;
            }
            u.SavedRecipes.Add(r);
             _dbContext.Users.Update(u);
            await _dbContext.SaveChangesAsync();
            return r;
        }

        public async Task DeleteRecipe(int recipeId)
        {
            var r = await _dbContext.Recipes.FirstOrDefaultAsync(x => x.RecipeId == recipeId);
            var relatedUserSavedRecipes = _dbContext.UserSavedRecipes.Where(ur => ur.RecipeId == recipeId).ToList();
            _dbContext.UserSavedRecipes.RemoveRange(relatedUserSavedRecipes);

            if (r != null)
            {
                _dbContext.Recipes.Remove(r);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Recipe>> FilterRecipes(List<Ingredient> ingredients)
        {
     
            return await _dbContext.Recipes.Include(x => x.Ingredients).Where(recipe => recipe.Ingredients.Any(ingredient => ingredients.Contains(ingredient))).ToListAsync();
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            return await _dbContext.Recipes.Include(x => x.Ingredients).ToListAsync();
        }

        public async Task<List<Recipe>> GetMyRecipes(int userId)
        {
            var u = await _dbContext.Users.Include(x => x.Recipes).ThenInclude(r=> r.Ingredients).FirstOrDefaultAsync(x => x.UserId == userId);
            return u.Recipes;
        }

        public async Task<List<Recipe>> GetNotSavedRecipes(int userId)
        {
            var savedRecipeIds = await _dbContext.Users.Where(x => x.UserId == userId).SelectMany(x => x.SavedRecipes.Select(r => r.RecipeId)).ToListAsync();
            var recipesNotSavedByUser = await _dbContext.Recipes.Where(recipe => !savedRecipeIds.Contains(recipe.RecipeId)).Include(x=> x.Ingredients).ToListAsync();
           
            return recipesNotSavedByUser;
        }

        public async Task<List<Recipe>> GetSavedRecipes(int userId)
        {
            var u = await _dbContext.Users.Include(x=> x.SavedRecipes).ThenInclude(r => r.Ingredients).FirstOrDefaultAsync(x => x.UserId == userId);

            if (u.SavedRecipes == null)
                return null;
            return u.SavedRecipes;
        }

        public async Task<List<Recipe>> SearchRecipes(string search)
        {
            return await _dbContext.Recipes.Where(x=> x.Name.Contains(search)).Include(x => x.Ingredients).ToListAsync();
        }
    }
}
