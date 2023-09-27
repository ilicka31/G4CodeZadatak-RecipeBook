import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { RecipeGet } from 'src/app/models/recipe/recipe-get.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(private _ingredientService: IngredientService, private _recipeService: RecipeService){}

  units: string[] = ['ml', 'g', 'pc'];
  ingredients: Ingredient[]=[];
  selectedIngredients: Ingredient[] = [];
  @Output() recipes : EventEmitter<RecipeGet[]> = new EventEmitter<RecipeGet[]>();
   ngOnInit(): void {
      this._ingredientService.allIngredients().subscribe(
        (data: any) => {
          this.ingredients = data; // Populate the ingredients array with the data from the observable
        },
        (error) => {
          console.error('Error fetching ingredients:', error);
        }
      );
     
    }
    onSelectionChange(event: any) {
      this._recipeService.filter(this.selectedIngredients).subscribe(
        (response) =>{
          this.recipes.emit(response);
        },
      (error)=>{
        console.log(error);
      }
      )
    }
}
