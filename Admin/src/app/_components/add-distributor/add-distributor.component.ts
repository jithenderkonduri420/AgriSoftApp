import { ApiService } from './../../_service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_service/alert.service';
import { first } from 'rxjs/operators';
import { BrandService, BrandsType } from 'src/app/_service/brand.service';
import { CookieService } from 'ngx-cookie-service';

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
  id: string;
  formType: string = "Add New";
  routeList: any[];
  DropPoint: any[];
  seletedBrand: BrandsType;
  brandProducts: any;
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
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if(this.id) {
        this.loadDistributorDetails();
      }
    })

    this.apiService.readAll(`products?brandId=${this.seletedBrand._id}`).subscribe(data =>{ 
      this.brandProducts = data.products;
      console.log(data)
      if(!this.id){
        for(let product of this.brandProducts){
          this.productValue.push({productId:product._id, price:"0"})
        }
      }
    })
    this.apiService.readAll("route").subscribe(data => this.routeList = data.routes )
  }

  onChangeRoute(value:any){
    this.DropPoint = this.routeList.filter(item => item._id === value)[0]["locations"];
  }

  loadDistributorDetails() {
    this.apiService
      .readSingle("distributor", this.id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.f.name.setValue(data.distributor.name);
          this.f.route.setValue(data.distributor.route._id);
          this.f.email.setValue(data.distributor.email);
          this.f.phone.setValue(data.distributor.phone);
          this.f.address.setValue(data.distributor.address);
          this.f.crateLimit.setValue(data.distributor.crateLimit);
          this.f.cashLimit.setValue(data.distributor.cashLimit);
          this.formType = `Edit ${data.distributor.name}`;
          this.brandProducts = [];
          this.brandProducts = data.distributor.products;
          console.log(this.brandProducts)
          
        },
        (error) => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
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

    if(!this.id) {
      this.apiService
        .create("distributor", this.form.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate(['distributors']);
          },
          (error) => {
            console.log(error)
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }else{
      this.apiService
      .update("distributor", this.form.value, this.id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['distributors']);
        },
        (error) => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
    }
  }
}
