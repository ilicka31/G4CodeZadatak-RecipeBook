using Back.DTOs.Ingredient;
using Back.Models;

namespace Back.Services.Interfaces
{
    public interface IIngredientService
    {
        Task<IngredientDTO> AddIngredient(NewIngredientDTO ingredient);
        Task<List<IngredientDTO>> GetAll();
        Task DeleteIngredient(int ingredientId);
    }
}
