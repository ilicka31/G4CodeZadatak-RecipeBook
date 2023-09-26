import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { RecipeModalService } from 'src/app/services/modals/recipe-modal.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
ingredients: Ingredient[]=[];
selectedIngredientIds: number[] = [];
constructor(private _ingredientService: IngredientService,private _recipeService: RecipeService, private _snackBar: MatSnackBar, private _modalService: RecipeModalService){
  
}
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
  
  toggleCheckbox(ingredientId: number): void {
    const index = this.selectedIngredientIds.indexOf(ingredientId);

    if (index === -1) {
      this.selectedIngredientIds.push(ingredientId);
    } else {
      this.selectedIngredientIds.splice(index, 1);
    }
  }

  saveRecipe(formValue: any){
    if(formValue.name && formValue.description )
    {
    
      this._recipeService.addRecipe(formValue).subscribe(
        (response) => {
         // let u = new Ingredient(response.id,response.name, response.quantity, response.unit);
         // this.user.emit(u);
          this._modalService.closeModal();
            this._snackBar.open("Recipe add successfully",undefined, {
              duration: 2000,
              verticalPosition: 'top'
            }) 
        },
        (error) =>{
          this._snackBar.open(error,undefined, {
            duration: 2000,
            verticalPosition: 'top'
          })
         
        }
      ); 
    }
    else{
      alert("All fields are required!")
    }

  }
}
