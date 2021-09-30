import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TwitterGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.getUserInfo().pipe(
      
        map(user => user !== null),
        tap(result => {
          if (!result) {
            this.router.navigateByUrl('signin');
            return result;
          } else {
            return result;
          }
        })
      );
  }

}
