import { ApiService } from './../../shared/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {
  currentUser: any;
  notifications: [];
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    @Inject(HomePage) private parent: HomePage
  ) {}
  ionViewWillEnter() {
    this.authService.userDetails().then((res: any) => {
      this.apiService.getDistributorDetails(res.user).subscribe((res) => {
        this.currentUser = res.distributor;
        this.getLatestNotifications();
      });
    });
  }
  getLatestNotifications() {
    const limit = 3;
    this.apiService.getAllNotifications(this.currentUser, limit).subscribe((res) => {
      this.notifications = res.notifications;
    });
  }
}
