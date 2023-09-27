import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewIngredient } from 'src/app/models/ingredient/new-ingredient.model';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { IngredientModalService } from 'src/app/services/modals/ingredient.service';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})


export class NewIngredientComponent {
  constructor(private _ingredientService: IngredientService,private _snackBar: MatSnackBar, private _modalService: IngredientModalService, private router: Router){}
  units: string[] = ['ml', 'g', 'pc'];
  saveIngredient(formValue: any){
    console.log(formValue)
    if(formValue.name && formValue.quantity && formValue.munit )
    {
      let ni =new NewIngredient(formValue.name,formValue.quantity,0)
    switch (formValue.munit){
      case 'ml':
       ni.mUnit=0;
       break;
       case 'g':
        ni.mUnit=1;
        break;
        case 'pc':
          ni.mUnit=2;
          break;
    }
    
      this._ingredientService.addIngredient(ni).subscribe(
        (response) => {
          this._modalService.closeModal();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/ingredients']); });
            this._snackBar.open("Ingredient add successfully",undefined, {
              duration: 2000,
              verticalPosition: 'top'
            });
           
           
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