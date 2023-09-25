using AutoMapper;
using Back.DTOs.Recipe;
using Back.Models;
using Back.Repositories.Interfaces;
using Back.Services.Interfaces;

namespace Back.Services
{
    // getovanje sastojaka i cuvanje recepta!!
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository recipeRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _mapper = mapper;
        }

        public async Task<RecipeDTO> AddRecipe(RecipeDTO recipe, int userId)
        {
            var r = _mapper.Map<Recipe>(recipe);
            r.IdUser = userId;
            
            await _recipeRepository.AddRecipe(r);
            return recipe;

        }

        public async Task<RecipeDTO> AddRecipeToCollection(int recipeId, int userId)
        {
           return  _mapper.Map<RecipeDTO>(await _recipeRepository.AddRecipeToCollection(recipeId, userId));
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

        public async Task<List<RecipeDTO>> GetSavedRecipes(int id)
        {
            return _mapper.Map<List<RecipeDTO>>(await _recipeRepository.GetSavedRecipes(id));
        }
    }
}
