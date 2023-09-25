using Microsoft.AspNetCore.Identity;

namespace Back.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role UserRole { get; set; } 

        public List<Recipe> Recipes { get; set; }

        public List<Recipe> SavedRecipes { get; set; } // sacuvani recepti

    }
}
