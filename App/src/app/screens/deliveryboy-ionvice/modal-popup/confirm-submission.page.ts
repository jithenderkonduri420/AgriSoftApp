import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-submission.page.html',
  styleUrls: ['./confirm-submission.page.scss'],
})
export class ConfirmSubmissionComponent implements OnInit {
  orders: any = [];
  otpValid: boolean = true;
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private storage: Storage,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.orders.push(this.navParams.data.addEntry);
    this.storage.get('leakage-products').then((res) => {
      this.orders['leakages'] = res;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  otpChecking($event) {
    const otp = $event.target.value;
    this.otpValid = true;
    if (otp.length === 4) {
      console.log(this.navParams.data.distributor);
      const data = {
        otp,
        distributorId: this.navParams.data.distributor._id,
      };
      this.apiService.otpVerify(data).subscribe((res: any) => {
        this.otpValid = res.checkOTP.otp !== otp;
      });
    }
  }
  orderDelivery() {
    const order = {
      returns : this.navParams.data.addEntry,
      orders: this.navParams.data.orders
    }
    this.loadingController
      .create({ keyboardClose: true, message: 'Loading ...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.apiService.orderDelivery(order).subscribe(
          (res) => {
            loadingEl.dismiss(); // hide loading
            this.utilsService.presentToastSuccess(res.message);
            this.modalCtrl.dismiss();
            this.router.navigate(['deliveryboy']);
          },
          (err) => {
            console.log(err);
            loadingEl.dismiss(); // hide loading
          }
        );
      });
  }
}
