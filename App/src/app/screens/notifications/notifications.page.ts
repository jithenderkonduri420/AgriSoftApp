import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {
  currentUser: any;
  notifications: any = [];
  count: any = 0;
  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.notifications = [];
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.loadingController
        .create({ keyboardClose: true, message: 'Loading ...' })
        .then((loadingEl) => {
          loadingEl.present();
          this.apiService.getAllNotifications(this.currentUser).subscribe(
            (res) => {
              this.notifications = res.notifications;
              this.count = this.notifications.map((res: any) => {
                return res.records.filter((n: any) => !n.isRead).length;
              });
              this.notificationsReadUpdate();
              loadingEl.dismiss(); // hide loading
            },
            (err) => {
              console.log(err);
              loadingEl.dismiss(); // hide loading
            }
          );
        });
    });
  }
  notificationsReadUpdate() {
    this.apiService
      .notificationsReadUpdate(this.currentUser)
      .subscribe((res) => {});
  }
}
