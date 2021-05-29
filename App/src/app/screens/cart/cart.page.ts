import { environment } from './../../../environments/environment';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  isOrderTimeOut = false;
  currentUser: any;
  products: any;
  cartAddedProducts = [];
  cartAmount: any = 0;
  serverImagePath = `${environment.serverUploads}/uploads`;
  orderProducts = [];
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.cartAddedProducts = [];
    this.cartAmount = 0;
    this.authService.userDetails().then((res: any) => {
      this.loadingController
        .create({ keyboardClose: true, message: 'Loading ...' })
        .then((loadingEl) => {
          loadingEl.present();
          this.apiService.getDistributorDetails(res.user).subscribe(
            (res) => {
              this.currentUser = res.distributor;
              this.products = res.distributor.products;
              if (
                this.compareTime(
                  moment(this.currentUser.route.closeTime, ['h:mm A']).format(
                    'HH:MM'
                  ),
                  moment().format('HH:MM')
                ) === -1
              ) {
                this.isOrderTimeOut = true;
              }
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
  addToCart(item, qty) {
    if (qty.value > 0) {
      item.qty = qty.value;
      this.cartAddedProducts.push(item);
      const uniqueProducts = new Set(this.cartAddedProducts);
      let total = 0;
      for (let product of uniqueProducts) {
        total = total + product.qty * product.price;
      }
      this.cartAmount = total;
    }
  }
  placeOrder() {
    const orderProducts = [];
    const uniqueProducts = new Set(this.cartAddedProducts);
    for (let product of uniqueProducts) {
      orderProducts.push(product);
    }
    this.storage.set('cart-products', orderProducts).then(() => {
      this.router.navigate(['order']);
    });
  }
  private compareTime(str1, str2) {
    if (str1 === str2) {
      return 0;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    console.log(time1, time2);
    if (eval(time1[0]) > eval(time2[0])) {
      return 1;
    } else if (
      eval(time1[0]) == eval(time2[0]) &&
      eval(time1[1]) > eval(time2[1])
    ) {
      return 1;
    } else {
      return -1;
    }
  }
}
