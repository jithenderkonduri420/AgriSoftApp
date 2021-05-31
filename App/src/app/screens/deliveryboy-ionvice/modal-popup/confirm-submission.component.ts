import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-submission.component.html',
  styleUrls: ['./confirm-submission.component.scss'],
})
export class ConfirmSubmissionComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
