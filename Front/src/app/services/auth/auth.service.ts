import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Token } from 'src/app/models/user/token.model';
import { Login } from 'src/app/models/user/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: BehaviorSubject<Token | null> = new BehaviorSubject<Token | null>(null);
  constructor(private http: HttpClient) { 
    this.setUser();
  }

  
  loginUser(user: Login) : Observable<any> 
  {
    var url = 'http://localhost:5157/api/User/login';
    var body = user;

    return this.http.post(url, body).pipe(
      tap((response: any ) : any => {// tap -> ne mora vratiti objekat, omogucava pristup podacima 
      
        let token = new Token(response.token, response.userRole);
        this.token.next(token);
        localStorage.setItem("token", JSON.stringify(response));
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError(error.error);
        } 
        else
  
        return throwError('Server error:  ' + error.error);
      })

    );
  }
  setUser(){
    let token = localStorage.getItem("token");
    if(token == null)
     { this.token.next(null);
    } else {
      let parsedToken = JSON.parse(token);
      this.token.next(parsedToken.token);
    }
  }
  getUserRole(){
    let token = localStorage.getItem("token");
    if(token == null)
     { this.token.next(null);
    } else {
      let parsedToken = JSON.parse(token);
      return parsedToken.userRole;
    }
  }
  
  logout()
  {
    localStorage.removeItem('token');
    this.token.next(null);

  }
}
