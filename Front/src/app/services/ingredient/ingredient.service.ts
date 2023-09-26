import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { NewIngredient } from 'src/app/models/ingredient/new-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  allIngredients() : Observable<any> {
    var url = 'http://localhost:5157/api/Ingredient/all';

    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError(error.error);
        } 
        else
        {
        return throwError(error.error);
      }})

    );
  }
  addIngredient(ingredient: NewIngredient) : Observable<any> {
    var url = 'http://localhost:5157/api/Ingredient/add';

    return this.http.post(url, ingredient, {responseType: 'text'}).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError(error.error);
        } 
        else
        {
        return throwError(error.error);
      }})

    );
  }

  deleteIngredient(id: number) : Observable<any> {
    var url = 'http://localhost:5157/api/Ingredient/delete/${id}';

    return this.http.delete(url).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError(error.error);
        } 
        else
        {
        return throwError(error.error);
      }})

    );
  }


}
