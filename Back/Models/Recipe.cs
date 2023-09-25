namespace Back.Models
{
    public class Recipe
    { 
        public int RecipeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Ingredient> Ingredients { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }
       
    }
}
