import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './leakage.component.html',
  styleUrls: ['./leakage.component.scss'],
})
export class LeakageComponent implements OnInit {
  products: any;
  constructor(private modalCtrl: ModalController,public navParams : NavParams) {}

  ngOnInit() {
    console.log(this.navParams.data);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
