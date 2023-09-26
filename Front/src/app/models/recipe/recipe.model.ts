import { Ingredient } from "../ingredient/ingredient.model";

export class Recipe {
    name: string;
    description: string;
    ingredients: Ingredient[];
    constructor(name: string, desc: string, ing: Ingredient[]) {
      this.name = name;
      this.description = desc;
      this.ingredients = ing;
    }
}