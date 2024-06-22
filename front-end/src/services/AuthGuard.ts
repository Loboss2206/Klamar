import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(segments.join('/'));
  }

  checkLogin(url: string): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = JSON.parse(sessionStorage.getItem('currentUser') as string);
    if (token) {
      let valid = this.userService.verifyTokenValidity(token, true);
      if (valid) {
        return true;
      }
    }
    console.log('AuthGuard: User not logged in, redirecting to login page');
    // Since the login system is not working on the dockerized version of the test environment, we need to disable the redirection to the login page
    if (environment.production || (environment.docker && environment.production)) {
      this.router.navigate(['/login', { returnUrl: url }]);
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }
}
