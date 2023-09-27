import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewIngredientComponent } from 'src/app/pages/new-ingredient/new-ingredient.component';

@Injectable({
  providedIn: 'root'
})
export class IngredientModalService {

  constructor(private _dialog: MatDialog) { }
  openModal(): void {
    this._dialog.open(NewIngredientComponent);
  }
  closeModal(): void {
    this._dialog.closeAll();
  }
}
