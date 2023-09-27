import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CookGuardService {

  constructor(private auth: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.auth.token.pipe(
            take(1),
            map((token : any) =>{
            if(token && token.userRole === "COOK")
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
