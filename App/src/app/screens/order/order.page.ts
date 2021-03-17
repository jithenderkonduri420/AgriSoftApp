import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  cartAddedProducts = [];
  cartAmount: Number = 0;
  constructor(private storage: Storage) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.storage.get('cart-products').then(res => {
      if (res) {
        this.cartAddedProducts = res;
        let total = 0;
        for (let product of res) {
          total = total + (product.qty * product.price);
        }
        this.cartAmount = total;
      }
    })
  }

}
