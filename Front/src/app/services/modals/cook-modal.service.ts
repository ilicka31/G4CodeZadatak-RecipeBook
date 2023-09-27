import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCookComponent } from 'src/app/pages/new-cook/new-cook.component';

@Injectable({
  providedIn: 'root'
})
export class CookModalService {

  constructor(private _dialog: MatDialog) { }
  openModal(): void {
    this._dialog.open(NewCookComponent);
  }
  closeModal(): void {
    this._dialog.closeAll();
  }
}
