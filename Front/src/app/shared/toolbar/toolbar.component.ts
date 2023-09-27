import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecipeGet } from 'src/app/models/recipe/recipe-get.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
@Output() allRecipes: EventEmitter<RecipeGet[]> = new EventEmitter<RecipeGet[]>();
  userRole: string;
  constructor(private auth: AuthService, private _router: Router, private _recipeService: RecipeService){
    this.userRole='';
  }
  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
  }

    refresh(){
      this._recipeService.allRecipes().subscribe(
        (response) =>{
          this.allRecipes.emit(response);
        },
      (error)=>{
        console.log(error);
      }
      )
    }
  logout(){
    this.userRole ='';

    this.auth.logout();
    this._router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
      this.refresh();
    });
  }
  
}
