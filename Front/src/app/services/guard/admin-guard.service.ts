import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private auth: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.auth.token.pipe(
          take(1),
          map((token : any) =>{
   
          if(token && token.userRole === "ADMIN")
          {
            return true;
          }
          else
          {
            return this.router.createUrlTree(['/main']);
          }
        })
        );
}
}
