import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './leakage.page.html',
  styleUrls: ['./leakage.page.scss'],
})
export class LeakageComponent implements OnInit {
  orders: any = [];
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private storage: Storage,
  ) {}

  ngOnInit() {
    this.navParams.data.products.map((res) => {
      return res.product.map((list) => {
        this.orders.push(list);
      });
    });
    this.orders = _.uniqBy(this.orders, 'productId._id');
    this.storage.set('leakage-products', this.orders).then((res) => {
      console.log(res);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  submit() {
    this.storage.set('leakage-products', this.orders);
    this.modalCtrl.dismiss();
  }
  addLeakageCount(index, count) {
    this.orders[index]['leakageCount'] = count.target.value;
  }
}
