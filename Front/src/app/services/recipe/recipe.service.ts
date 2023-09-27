import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { Recipe } from 'src/app/models/recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  addRecipe(ingredient: Recipe) : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/add';

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

  
  saveRecipe(recipeId: number) : Observable<any> {
    var url = `http://localhost:5157/api/Recipe/save-recipe/${recipeId}`;

    return this.http.post(url,recipeId, {responseType: 'text'}).pipe(
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

  myRecipes() : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/my-recipes';

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

  
  savedRecipes() : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/saved-recipes';

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
  
  allRecipes() : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/all-recipes';

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
  notSavedRecipes() : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/other';

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

  deleteRecipe(recipeId: number) : Observable<any> {
    var url = `http://localhost:5157/api/Recipe/delete/${recipeId}`;

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
  searchRecipes(search: string) : Observable<any> {
    var url = `http://localhost:5157/api/Recipe/search-recipes/${search}`;;

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

  filter(ingredients: Ingredient[]) : Observable<any> {
    var url = 'http://localhost:5157/api/Recipe/filter';

    return this.http.post(url, ingredients).pipe(
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

}
