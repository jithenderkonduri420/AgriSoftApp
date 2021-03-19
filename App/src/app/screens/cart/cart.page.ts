import { environment } from './../../../environments/environment';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any;
  cartAddedProducts = [];
  cartAmount: Number = 0;
  serverImagePath = `${environment.serverUploads}/uploads`;
  orderProducts = [];
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.authService.userDetails().then((res: any) => {
      this.apiService.getDistributorDetails(res.user).subscribe((res) => {
        this.products = res.distributor.products;
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
}
