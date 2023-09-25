using Back.Database;
using Back.Models;
using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private readonly RecipeDbContext _dbContext;

        public IngredientRepository(RecipeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Ingredient> AddIngredient(Ingredient ingredient)
        {
            await _dbContext.Ingredients.AddAsync(ingredient);
            return ingredient;
        }

        public async Task DeleteIngredient(int ingredientId)
        {
         var i = await _dbContext.Ingredients.FirstOrDefaultAsync(x => x.IngredientId == ingredientId); 
            if (i != null)
            {
                _dbContext.Ingredients.Remove(i);
                await _dbContext.SaveChangesAsync();    
            }
        }

        public async Task<List<Ingredient>> GetAll()
        {
            return await _dbContext.Ingredients.ToListAsync();
        }
    }
}
