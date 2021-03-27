import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from './../../../app/_service/api.service';
import { AlertService } from './../../../app/_service/alert.service';
import { Router } from '@angular/router';

export class CreateRoute{
  name: string
  warehouse: string
  openTime: string
  closeTime: string
  locations: string[]
}

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {

  RouterValid: any = true;
  newRoute: CreateRoute = new CreateRoute();
  DropPointList:string[] = ["","",""];

  addRoute: FormGroup;
  submitted: boolean;
  loading: boolean;

  constructor(
    private apiService:ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.addRoute = this.formBuilder.group({
      warehouse: ['', Validators.required],
      name: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required]
    });
  }

  addDropPoint(index:any):void{
    this.DropPointList[index]
    if(this.DropPointList.length < 5){
      this.DropPointList.push("");
    }
  }

  dropPoint(event:any, i:any){
    alert('test');
    console.log(i);
    this.DropPointList[i] = event.target.value;
    console.log(this.DropPointList)
  }

  onNewRouteSubmit():void{
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.addRoute.invalid) {
      return;
    }
    this.loading = true;
    this.addRoute.value.locations=this.DropPointList;
    console.log(this.addRoute.value)
    this.apiService
      .create("route", this.addRoute.value)
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
