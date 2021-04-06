import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from './../../../app/_service/api.service';
import { AlertService } from './../../../app/_service/alert.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandService } from '../../_service/brand.service';

export class CreateRoute {
  name: string;
  warehouse: string;
  openTime: string;
  closeTime: string;
  locations: string[];
}

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {

  RouterValid: any = true;
  newRoute: CreateRoute = new CreateRoute();
  DropPointList:string[] = ["","",""];

  addRoute: FormGroup;
  submitted: boolean;
  loading: boolean;
  warehouses: any[] = [{_id:"Test",name:"Sample"}];

  constructor(
    private apiService:ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private brand: BrandService
    ) { 
      this.warehouses = this.brand.BrandWherehouses;
    }
    
  ngOnInit(): void {
    
    this.addRoute = this.formBuilder.group({
      warehouse: [this.warehouses[0]._id, Validators.required],
      name: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required]
    });
  }

  addDropPoint(index:any):void{
    (this.DropPointList.length < 15) ? this.DropPointList.push("") : console.log("Drop Point List Count reached")
  }

  dropPoint(event:any, i:any){
    this.DropPointList[i] = event.target.value;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addRoute.controls;
  }

  onNewRouteSubmit():void{
    this.submitted = true;
    
    console.log(this.addRoute.value)
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.addRoute.invalid) {
      return;
    }
    this.loading = true;

    this.addRoute.value.locations=this.DropPointList;
    this.apiService
    .create("route", this.addRoute.value)
    .pipe(first())
    .subscribe(
      (data) => {
          this.alertService.success("Route Created Succesfully");
          this.router.navigate(['routes']);
        },
        (error) => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
