import { Component, OnInit } from '@angular/core';

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
    if(this.DropPointList.length <= 10){
      this.DropPointList.push({});
    }
  }

}
