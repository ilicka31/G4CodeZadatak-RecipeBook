import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RecipeModalService } from 'src/app/services/modals/recipe-modal.service';
import { RecipeGet } from 'src/app/models/recipe/recipe-get.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe/recipe.model';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
 userRole: string;
 allRecipes: RecipeGet[];
 title: string;
 recipeType: string;
 constructor(private auth: AuthService, private _recipeService: RecipeService, private _modalService: RecipeModalService,private route: ActivatedRoute){
  this.userRole='';
  this.allRecipes=[];
  this.title='';
  this.recipeType='';
 }
  ngOnInit(): void {

   const recipeType = this.route.snapshot.data['recipeType'];
   this.recipeType= recipeType;
   this.userRole= this.auth.getUserRole();
   if(recipeType ==='all' && this.userRole === 'USER'){
    this.title= "ALL RECIPES";
    this._recipeService.notSavedRecipes().subscribe(
      (response: any) => {
        this.allRecipes = response;
        
      },
      (error) => {
       
      }
    );
  }
   else if(recipeType ==='all' ){
    this.title= "ALL RECIPES";
   this._recipeService.allRecipes().subscribe(
    (response: any) => {
      this.allRecipes = response;
     
    },
    (error) => {});
  } 
  else if(recipeType ==='my'){
    this.title= "MY RECIPES";
    this._recipeService.myRecipes().subscribe(
      (response: any) => {
        this.allRecipes = response;
        
      },
      (error) => {
       
      }
    );
  }
  else if(recipeType ==='saved'){
    this.title= "SAVED RECIPES";
    this._recipeService.savedRecipes().subscribe(
      (response: any) => {
        this.allRecipes = response;
        
      },
      (error) => {
       
      }
    );
  }

}
onRecipesChanged(newRecipes: RecipeGet[]){
this.allRecipes= newRecipes;
console.log(this.allRecipes);
}
 
  openAddModal(){
    this._modalService.openModal();
  }
}
