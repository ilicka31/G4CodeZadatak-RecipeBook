import { Ingredient } from "../ingredient/ingredient.model";

export class RecipeGet {
    recipeId: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    constructor(id : number,name: string, desc: string, ing: Ingredient[]) {
      this.recipeId = id;
      this.name = name;
      this.description = desc;
      this.ingredients = ing;
    }
}