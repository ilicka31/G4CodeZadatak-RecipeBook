import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewRecipeComponent } from 'src/app/pages/new-recipe/new-recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipeModalService {

  constructor(private _dialog: MatDialog) { }
  openModal(): void {
    this._dialog.open(NewRecipeComponent);
  }
  closeModal(): void {
    this._dialog.closeAll();
  }
}
