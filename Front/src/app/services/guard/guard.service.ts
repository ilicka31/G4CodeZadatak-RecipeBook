import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private auth: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.auth.token.pipe(
            take(1),
            map((user : any) =>{
      
            if(user)
            {
              return true;
            }
            else
            {
              return this.router.createUrlTree(['/login']);
            }
          })
          );
}
}
