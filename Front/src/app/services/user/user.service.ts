import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Register } from 'src/app/models/user/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: Register) : Observable<any> {
    var url = 'http://localhost:5157/api/User/register';
    var body = user;

    return this.http.post(url, body, {responseType: 'text'}).pipe(
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

  allUsers() : Observable<any> {
    var url = 'http://localhost:5157/api/User/users';

    return this.http.get(url).pipe(
      map((response: any) => {
      //  this.users = response;
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
  allCooks() :Observable<any>{
    var url = 'http://localhost:5157/api/User/all-cooks';

    return this.http.get(url).pipe(
      map((response: any) => {
      //  this.users = response;
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
  addCook(register:Register): Observable<any> {
    var url = 'http://localhost:5157/api/User/add-cook';
    var body = register;

    return this.http.post(url, body, {responseType: 'text'}).pipe(
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
