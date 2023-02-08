import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private fbA:FirebaseAuthService, private router:Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.fbA.isLoggedIn$.pipe(
        take(1),
        map((isLoggedIn) => {
          if (isLoggedIn) {
            return true;
          }
          return this.router.createUrlTree(['/login']);
        })
      );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  this.canActivate(route, state);
  }

}
