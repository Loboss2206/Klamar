import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user-service.service';

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
    const currentUser = this.userService.getCurrentAdmin();
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return this.router.parseUrl('/login');
  }
}
