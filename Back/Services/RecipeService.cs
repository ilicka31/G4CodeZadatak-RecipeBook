using AutoMapper;
using Back.DTOs.Recipe;
using Back.Models;
using Back.Repositories.Interfaces;
using Back.Services.Interfaces;

namespace Back.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository recipeRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _mapper = mapper;
        }

        public async Task<RecipeDTO> AddRecipe(RecipeDTO recipe)
        {
           await _recipeRepository.AddRecipe(_mapper.Map<Recipe>(recipe));
            return recipe;

        }

        public Task<RecipeDTO> AddRecipeToCollection(int recipeId)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteRecipe(int recipeId)
        {
            await _recipeRepository.DeleteRecipe(recipeId);
        }

        public async Task<List<RecipeDTO>> GetAllRecipes()
        {
          return _mapper.Map<List<RecipeDTO>>(await _recipeRepository.GetAllRecipes());
        }

        public async Task<List<RecipeDTO>> GetMyRecipes(int id)
        {
            return _mapper.Map<List<RecipeDTO>>(await _recipeRepository.GetMyRecipes(id));
        }
    }
}
