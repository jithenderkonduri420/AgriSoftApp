import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './leakage.component.html',
  styleUrls: ['./leakage.component.scss'],
})
export class LeakageComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
