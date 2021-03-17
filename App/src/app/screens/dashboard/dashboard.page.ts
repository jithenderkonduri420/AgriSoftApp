import { ApiService } from './../../shared/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  currentUser: any;
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    @Inject(HomePage) private parent: HomePage
  ) {

  }
  ngOnInit() {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
    });
  }
}
