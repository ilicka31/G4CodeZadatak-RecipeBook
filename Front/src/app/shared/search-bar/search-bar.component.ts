import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeGet } from 'src/app/models/recipe/recipe-get.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
 @Output() recipes : EventEmitter<RecipeGet[]> = new EventEmitter<RecipeGet[]>();
 constructor(private _recipeService: RecipeService){}

  search(formValue: any){

    if(formValue.search !== null){
      this._recipeService.searchRecipes(formValue.search).subscribe(
      (response)=>{
        this.recipes.emit(response);
      },
      (error)=>{
        console.log(error);
      }
      )
    }
    else
    {
      
    }
  }
}
