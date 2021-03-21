import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {
  notifications: [];
  constructor(private apiService: ApiService, private authService: AuthenticationService) { }

  ionViewWillEnter() {
    this.notifications = [];
    this.authService.userDetails().then((res: any) => {
      this.apiService.getAllNotifications(res.user).subscribe((res) => {
        this.notifications = res.notifications;
        console.log(this.notifications);
        });
    });
  }

}
