import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

 
  constructor(private authService: AuthService) {
  }

 intercept(req: HttpRequest<any>, next: HttpHandler) {
   return this.authService.token.pipe(
     take(1),
     exhaustMap( token => {
       if(!token) {
         return next.handle(req);
       }

       let modifiedReq = req.clone({
         setHeaders: {
           'Authorization' :  'Bearer ' + token.token,
         }
       })

       return next.handle(modifiedReq);
     })
   )
 }
}
