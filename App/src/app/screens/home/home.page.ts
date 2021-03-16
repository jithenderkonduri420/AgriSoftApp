import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  currentUser: any;
  isLogin: boolean = false;
  constructor(private authService: AuthenticationService) {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.isLogin = this.authService.currentUserValue;
    })

  }
  logout() {
    this.authService.logout();
  }

}
