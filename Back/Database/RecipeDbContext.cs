using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.Database
{
    public class RecipeDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set;}
        public DbSet<UserSavedRecipe> UserSavedRecipes { get; set; }

        public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>()
                .HasOne(r => r.User)
                .WithMany(u => u.Recipes)
                .HasForeignKey(r => r.IdUser)
                .IsRequired();

            modelBuilder.Entity<User>()
     .HasMany(u => u.SavedRecipes)
     .WithMany(r => r.Users)
     .UsingEntity<UserSavedRecipe>(
         ur => ur.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId"),
         ur => ur.HasOne<User>().WithMany().HasForeignKey("UserId"),
         ur =>
         {
             ur.HasKey("UserId", "RecipeId");
             ur.ToTable("UserSavedRecipes");
             ur.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Restrict);
             ur.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId").OnDelete(DeleteBehavior.Restrict);
         });


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
                        ri.HasOne<Ingredient>().WithMany().HasForeignKey("IngredientId").OnDelete(DeleteBehavior.Cascade);
                        ri.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId").OnDelete(DeleteBehavior.Cascade);

                    });

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipeDbContext).Assembly);
        }

    }
}
