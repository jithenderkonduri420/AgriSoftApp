import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

export const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    return this.authService.userDetails().then((res: any) => {
      if (res.role === "distributor") {
        return true;
      } else {
        this.router.navigateByUrl('/deliveryboy', { replaceUrl:true });
         return false;
      }
    });

  }
}
