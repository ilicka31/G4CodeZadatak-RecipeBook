using Back.Models;

namespace Back.DTOs.Recipe
{
    public class RecipeDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Back.Models.Ingredient> Ingredients { get; set; }
        public int UserId { get; set; }
    }
}
