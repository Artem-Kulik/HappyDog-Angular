import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private notifier: NotifierService
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  checkLogin(url: string): boolean {
    if (this.userService.isUser()) {
      return true;
    }
    this.router.navigate(['/error-page']);
    return false;
  }
}
