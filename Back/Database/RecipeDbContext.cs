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
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipeDbContext).Assembly);

           /* modelBuilder.Entity<Recipe>()
            .HasMany(r => r.Ingredients)
            .WithMany(i => i.Recipes)
            .UsingEntity(j =>
            {
                j.ToTable("RecipeIngredient"); // Specify the name of the joining table.
                j.HasOne<Ingredient>().WithMany().HasForeignKey("IngredientId");
                j.HasOne<Recipe>().WithMany().HasForeignKey("RecipeId");
            });*/
        }

    }
}
