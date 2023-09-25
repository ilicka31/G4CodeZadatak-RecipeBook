﻿using Back.DTOs.Ingredient;
using Back.Models;

namespace Back.DTOs.Recipe
{
    public class RecipeDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<IngredientDTO> Ingredients { get; set; }
       
    }
}
