import { LoadingController } from '@ionic/angular';
import { ApiService } from './../../shared/services/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-deliveryboy',
  templateUrl: './deliveryboy.page.html',
  styleUrls: ['./deliveryboy.page.scss'],
})
export class DeliveryboyPage implements OnInit {
  currentUser: any;
  isLogin: boolean = false;
  pendingOrders = [];
  completedOrder = [];
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private loadingController: LoadingController
  ) {}
  ngOnInit() {}
  ionViewWillEnter() {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.isLogin = this.authService.currentUserValue;
      this.loadingController
        .create({ keyboardClose: true, message: 'Loading ...' })
        .then((loadingEl) => {
          loadingEl.present();
          this.apiService.getDeliveryBoyOrders(this.currentUser._id).subscribe(
            (res) => {
              this.pendingOrders = res.orders.filter(
                (res) => res._id.orderType == 'accept'
              );
              this.completedOrder = res.orders.filter(
                (res) => res._id.orderType == 'completed'
              );
              loadingEl.dismiss();
            },
            (err) => {
              console.log(err);
              loadingEl.dismiss(); // hide loading
            }
          );
        });
    });
  }
  logout() {
    this.authService.logout();
  }
  callNumber(phoneNumber) {
    window.open('tel:' + phoneNumber, '_system');
  }
}
