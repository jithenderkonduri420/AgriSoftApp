import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from './../../shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LeakageComponent } from './modal-popup/leakage.page';
import { ConfirmSubmissionComponent } from './modal-popup/confirm-submission.page';

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
  addEntry: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
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
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.addEntry = new FormGroup({
      cratesIn: new FormControl('', []),
      cratesOut: new FormControl('', []),
      cashReceived: new FormControl('', [])
    });
  }
  logout() {
    this.authService.logout();
  }
  callNumber(phoneNumber) {
    window.open('tel:' + phoneNumber, '_system');
  }
  async leakageModal() {
    const modal = await this.modalCtrl.create({
      component: LeakageComponent,
      cssClass: 'my-modal',
      componentProps: { products: this.orders },
    });
    return await modal.present();
  }
  async confirmationModal() {
    const modal = await this.modalCtrl.create({
      component: ConfirmSubmissionComponent,
      cssClass: 'my-modal',
      componentProps: { addEntry: this.addEntry.value, distributor: this.distributor, orders: this.orders},
    });
    return await modal.present();
  }
}
