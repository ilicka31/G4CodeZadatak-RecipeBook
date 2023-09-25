﻿using Back.DTOs.Recipe;
using Back.Models;

namespace Back.Services.Interfaces
{
    public interface IRecipeService
    {
        Task<RecipeDTO> AddRecipe(RecipeDTO recipe, int userId);
        Task DeleteRecipe(int recipeId);
        Task<List<RecipeDTO>> GetAllRecipes();
        Task<List<RecipeDTO>> GetMyRecipes(int id);
        Task<List<RecipeDTO>> GetSavedRecipes(int id);
        Task<RecipeDTO> AddRecipeToCollection(int recipeId, int userId);

    }
}
