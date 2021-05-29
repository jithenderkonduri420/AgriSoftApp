import { LoadingController } from '@ionic/angular';
import { ApiService } from './../../shared/services/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deliveryboy-ionvice',
  templateUrl: './deliveryboy-ionvice.page.html',
  styleUrls: ['./deliveryboy-ionvice.page.scss'],
})
export class DeliveryboyIonvicePage implements OnInit {
  distributor: any;
  orders: any;
  currentUser: any;
  isLogin: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.isLogin = this.authService.currentUserValue;
    });
    this.route.params.subscribe((params) => {
      this.loadingController
        .create({ keyboardClose: true, message: 'Loading ...' })
        .then((loadingEl) => {
          loadingEl.present();
          this.apiService.getDistributorOrderDetails(params.id).subscribe(
            (res) => {
              this.distributor = res.distributor;
              this.orders = res.orders;
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
  ngOnInit() {}
  logout() {
    this.authService.logout();
  }
  callNumber(phoneNumber) {
    window.open('tel:' + phoneNumber, '_system');
  }
}
