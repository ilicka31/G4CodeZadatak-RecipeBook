import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  units: string[] = ['ml', 'g', 'pc'];
ingredients: Ingredient[]=[];
selectedIngredients: any = [];
constructor(private _ingredientService: IngredientService,private _recipeService: RecipeService, private _snackBar: MatSnackBar,private _router: Router, private _modalService: RecipeModalService){
  
}
  ngOnInit(): void {
    this._ingredientService.allIngredients().subscribe(
      (data: any) => {
        this.ingredients = data;
      },
      (error) => {
        console.error('Error fetching ingredients:', error);
      }
    );
   
  }
  

  saveRecipe(formValue: any){
    if(formValue.name && formValue.description && formValue.ingredients)
    {
    
      this._recipeService.addRecipe(formValue).subscribe(
        (response) => {
          this._modalService.closeModal();
            this._router.navigate(['/main']);
       
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
