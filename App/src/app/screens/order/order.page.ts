import { AuthenticationService } from './../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  currentUser: any;
  cartAddedProducts = [];
  cartAmount: any = 0;
  constructor(
    private storage: Storage,
    private apiService: ApiService,
    private route: Router,
    private authService: AuthenticationService

  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
    });
    this.storage.get('cart-products').then((res) => {
      if (res) {
        this.cartAddedProducts = res;
        let total = 0;
        for (let product of res) {
          total = total + product.qty * product.price;
        }
        this.cartAmount = total;
      }
    });
  }
  placeOrder() {
    let total = 0;
    const products = this.cartAddedProducts.map((products) => {
      let orderProducts = {};
      orderProducts['productId'] = products.productId._id;
      orderProducts['qty'] = products.qty;
      orderProducts['total_packets'] = products.productId.packet;
      total += products.qty * products.price;
      return orderProducts;
    });
    const orderProducts = {
      distributorId: this.currentUser._id,
      product: products,
      outstanding_price: 0,
      total: total,
    };
    this.storage.remove('cart-products').then(() => {
      this.apiService.orderPlace(orderProducts);
    });


  }
}
