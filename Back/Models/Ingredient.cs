namespace Back.Models
{
    public class Ingredient
    {
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public double Quantity { get; set; }
        public Unit MUnit { get; set; }
        public List<Recipe> Recipes { get; set; }

    }
}
