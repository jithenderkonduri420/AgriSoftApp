import { ApiService } from './../../_service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_service/alert.service';
import { first } from 'rxjs/operators';
import { BrandService, BrandsType } from 'src/app/_service/brand.service';

class productdata{
  productId:string;
  price: string;
}

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.scss'],
})
export class AddDistributorComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  routeList: any[];
  DropPoint: any[];
  seletedBrand: BrandsType;
  brandProducts: any[];
  productValue: productdata[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private apiService: ApiService,
    public _brands: BrandService
  ) {
    this.seletedBrand = this._brands.getBrand();
    this.apiService.readAll(`products?brandId=${this.seletedBrand._id}`).subscribe(data =>{ 
      this.brandProducts = data.products;
      for(let product of this.brandProducts){
        this.productValue.push({productId:product._id, price:"0"})
      }
    })
    this.apiService.readAll("route").subscribe(data => this.routeList = data.routes )
  }

  onChangeRoute(value:any){
    this.DropPoint = this.routeList.filter(item => item._id === value)[0]["locations"];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [{value: this.seletedBrand.name, disabled: true}, Validators.required],
      route: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      crateLimit: ['', Validators.required],
      cashLimit: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onChangeEvent(event: any, productId: any){
    this.productValue.filter(item => item.productId === productId)[0].price = event.target.value;
    console.log(this.productValue)
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.form.value.brand = this.seletedBrand._id;
    this.form.value.products = this.productValue;
    console.log(this.form.value)
    this.apiService
      .create("distributor", this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['home']);
        },
        (error) => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
