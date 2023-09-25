using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.Database
{
    public class RecipeDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set;}
        public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the one-to-many relationship between User and Recipe
            modelBuilder.Entity<Recipe>()
                .HasOne(r => r.User)
                .WithMany(u => u.Recipes)
                .HasForeignKey(r => r.IdUser)
                .IsRequired();

            // Configure the many-to-many relationship between User and Recipe for saved recipes
            modelBuilder.Entity<User>()
                .HasMany(u => u.SavedRecipes)
                .WithMany(r => r.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserSavedRecipe",
                    ur => ur.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId"),
                    ur => ur.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    ur =>
                    {
                        ur.HasKey("UserId", "RecipeId");
                        ur.ToTable("UserSavedRecipes");
                        ur.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Restrict);
                        ur.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId").OnDelete(DeleteBehavior.Restrict);

                    });

            // Configure the many-to-many relationship between Ingredient and Recipe
            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Ingredients)
                .WithMany(i => i.Recipes)
                .UsingEntity<Dictionary<string, object>>(
                    "RecipeIngredient",
                    ri => ri.HasOne<Ingredient>().WithMany().HasForeignKey("IngredientId"),
                    ri => ri.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId"),
                    ri =>
                    {
                        ri.HasKey("IngredientId", "RecipeId");
                        ri.ToTable("RecipeIngredients"); 
                        ri.HasOne<Ingredient>().WithMany().HasForeignKey("IngredientId").OnDelete(DeleteBehavior.Restrict);
                        ri.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId").OnDelete(DeleteBehavior.Restrict);

                    });

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipeDbContext).Assembly);
        }

    }
}
