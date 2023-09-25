using Back.DTOs.Ingredient;
using Back.Models;

namespace Back.Services.Interfaces
{
    public interface IIngredientService
    {
        Task<IngredientDTO> AddIngredient(IngredientDTO ingredient);
        Task<List<IngredientDTO>> GetAll();
        Task DeleteIngredient(int ingredientId);
    }
}
