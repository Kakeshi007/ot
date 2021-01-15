import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if(!this.auth.checklogin())
    {
      Swal.fire('', 'กรุณา Login ใหม่', 'warning');
      this.router.navigateByUrl('/login');
      return false;
    }  
    
    return true;

  }
  
}
