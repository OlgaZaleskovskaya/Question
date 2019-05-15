import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/model/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { };
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     let url: string = state.url;
//     return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
// if(this.authService.currentUser.type = "admin") {return true;}
// // Store the attempted URL for redirecting
// //this.authService.redirectUrl = url;

// // Navigate to the login page with extras
// this.router.navigate(['/main']);
//     return false;
//   }

canActivate(): boolean{

return true;
}

}
