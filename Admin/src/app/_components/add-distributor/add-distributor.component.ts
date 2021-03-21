import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.scss']
})
export class AddDistributorComponent implements OnInit {
  
  addDistributor: FormGroup;
  isSubmitted: boolean;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.addDistributor = this.fb.group({
      Distributorname: ['', [Validators.required]],
      Distributorbrand: ['', [Validators.required]],
      Distributorroute: ['', [Validators.required]],
      DistributordropPoint: ['', [Validators.required]],
      DistributorEmailAddress: ['', [Validators.required]],
      DistributorContactNo: ['', [Validators.required]],
      DistributorAddress: ['', [Validators.required]],
      DistributorCreditLimit: ['', [Validators.required]],
      DistributorCashLimit: ['', [Validators.required]]
    })

    this.addDistributor.valueChanges.subscribe(data=>console.log(data));
  }

  onSubmit(formValue:any):any{
    this.isSubmitted = true;
    if (!this.addDistributor.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.addDistributor.value))
    }
    console.log("submitted");
  }

}
