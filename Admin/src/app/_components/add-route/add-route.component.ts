import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/_service/api.service';

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
  DropPointList:any[] = [
    {},
    {}
  ];
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
  }

  addDropPoint():void{
    if(this.DropPointList.length < 10){
      this.DropPointList.push({});
    }
  }

  onSubmit(formData: NgForm):void{
    this.RouterValid =  formData.valid;
    for (let index = 0; index < this.DropPointList.length; index++) {
      console.log(formData.value.DropPoint+""+index)
    }
    if (formData.valid){
      
      console.log(formData.value);
      
      this.newRoute.name = formData.value.RouteName;
      this.newRoute.warehouse = formData.value.Wearhouse;
      this.newRoute.openTime = formData.value.OpenTime;
      this.newRoute.closeTime = formData.value.CloseTime;
      this.newRoute.locations = [
        "Test1",
        "Test2",
        "Test3"
      ]

      this._api.create("route", this.newRoute);

    }
  }

}
