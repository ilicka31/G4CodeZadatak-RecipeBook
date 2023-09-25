using AutoMapper;
using Back.DTOs.Ingredient;
using Back.DTOs.Recipe;
using Back.DTOs.User;
using Back.Models;

namespace Back.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, UserRegisterDTO>().ReverseMap();
            CreateMap<User,UserGetDTO>().ReverseMap();  

            CreateMap<Recipe, RecipeDTO>().ReverseMap();

            CreateMap<Ingredient, IngredientDTO>().ReverseMap();
        }
    }
}
