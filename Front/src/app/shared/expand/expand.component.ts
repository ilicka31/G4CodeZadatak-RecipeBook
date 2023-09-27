import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.css']
})
export class ExpandComponent {
  units = [ 'ml', 'g', 'pc']
  panelOpenState = false;
  @Input() recipeId : number;
  @Input() title: string;
  @Input() description : string;
  @Input() ingredients: Ingredient[];
  @Input() userRole : string;
  @Input() recipeType: string;

  constructor(private _recipeService: RecipeService, private _router : Router, private _snackBar: MatSnackBar){
    this.title="";
    this.description ="";
    this.ingredients =[];
    this.userRole ='';
    this.recipeId=-1;
    this.recipeType='';
  }
  deleteRecipe(recipeId: number){
    this._recipeService.deleteRecipe(recipeId).subscribe(
     (response) =>{
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/main']); });
       this._snackBar.open("Recipe deleted successfully",undefined, {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
    );
  }

  saveRecipe(recipeId: number){
    this._recipeService.saveRecipe(recipeId).subscribe(
      (response) =>{ 
        this._router.navigate(['/saved-recipes']);
        this._snackBar.open("Recipe saved successfully",undefined, {
          duration: 2000,
          verticalPosition: 'top'
        });
     }
     );
  }
}
