using Back.Models;

namespace Back.DTOs.Ingredient
{
    public class NewIngredientDTO
    {
        public string Name { get; set; }
        public double Quantity { get; set; }
        public Unit MUnit { get; set; }
    }
}
