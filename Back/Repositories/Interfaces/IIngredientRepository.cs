using Back.DTOs.Ingredient;
using Back.Models;

namespace Back.Repositories.Interfaces
{
    public interface IIngredientRepository
    {
        Task<Ingredient> AddIngredient(Ingredient ingredient);
        Task<List<Ingredient>> GetAll();
        Task DeleteIngredient(int ingredientId);
        Task<Ingredient> GetById(int ingredientId);

    }
}
