import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {
  DropPointList:any[] = [
    {},
    {}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addDropPoint():void{
    if(this.DropPointList.length < 10){
      this.DropPointList.push({});
    }
  }

  onSubmit(formData: NgForm):void{
    console.log(formData.value);
    console.log(formData.valid);
  }

}
