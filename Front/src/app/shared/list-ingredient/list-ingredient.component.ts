import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { IngredientModalService } from 'src/app/services/modals/ingredient.service';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class ListIngredientComponent implements OnInit {


  units: string[] = ['ml', 'g', 'pc'];
  ingredients: Ingredient[];
constructor(private _ingredientService: IngredientService, private _router: Router, private route: ActivatedRoute, private _modalService: IngredientModalService, private _snackBar : MatSnackBar){
  this.ingredients =[]
}
  ngOnInit(): void {
    this._ingredientService.allIngredients().subscribe(
      (response: any) => {
        this.ingredients = response;
       
      },
      (error) => {
      
      });
  }
  deleteIngredient(ingredientId: number){

    this._ingredientService.deleteIngredient(ingredientId).subscribe(
      (response) =>{ 
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/ingredients']);
          this._snackBar.open("Successfuly deleted ingredient!",undefined, {
            duration: 2000,
            verticalPosition: 'top'
          });
        });
     })
    }
  
  openAddIngredientModal(){
  this._modalService.openModal();
  }
}
