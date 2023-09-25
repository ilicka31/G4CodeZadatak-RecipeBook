using AutoMapper;
using Back.DTOs.Ingredient;
using Back.Models;
using Back.Repositories;
using Back.Repositories.Interfaces;
using Back.Services.Interfaces;

namespace Back.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IMapper _mapper;

        public IngredientService(IIngredientRepository ingredientRepository, IMapper mapper)
        {
            _ingredientRepository = ingredientRepository;
            _mapper = mapper;
        }
        public async Task<IngredientDTO> AddIngredient(IngredientDTO ingredient)
        {
            await _ingredientRepository.AddIngredient(_mapper.Map<Ingredient>(ingredient));
            return ingredient;
        }
        public async Task DeleteIngredient(int ingredientId)
        {
            var i = await _ingredientRepository.GetById(ingredientId);
            if(i != null)
            {
                await _ingredientRepository.DeleteIngredient(ingredientId);
            }
        }

        public async Task<List<IngredientDTO>> GetAll()
        {
            return _mapper.Map<List<IngredientDTO>>(await _ingredientRepository.GetAll());
        }
    }
}
