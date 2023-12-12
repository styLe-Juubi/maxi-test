import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserModel } from "src/app/store/auth/models";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  canActivate(): boolean {
    const user = this.authService.getUser();

    if ( !user || user === '' ) {
        
      this.router.navigate(['/']);
      return false;
    } else {

      try {
        const admin: UserModel = JSON.parse( user )
        if ( admin.roles.includes('admin') ) {
                
          return true;
        } else {
              
          this.router.navigate(['/']);
          return false;
        }
      } catch (error) {

        this.router.navigate(['/']);
        return false;
      }
    }

  }
}