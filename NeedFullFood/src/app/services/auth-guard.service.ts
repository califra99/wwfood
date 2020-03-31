import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticateService } from '../services/authentication.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  userEmail: string;

  constructor(
    private router: Router,
    private authService: AuthenticateService,) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
 

    let authInfo = {
      authenticated: false
    };

   if (this.authService.userDetails() ) {
			this.userEmail = this.authService.userDetails().email;
		} else {
      this.router.navigate([""]);
      return false;
    }
    
    return true;
  }
}