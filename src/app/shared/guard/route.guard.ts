import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private readonly router: Router,
  ) {  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }

  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }

  private authorize(): boolean {
    
    const authorize: boolean = (sessionStorage.getItem('token')) !== null;

    if (!authorize) {
      alert('Kamu kok belum login?');
      this.router.navigateByUrl('/auth');
    }

    return authorize;
  }
  
}
