import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../_service/api.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  brands:[] = [];
  constructor(private _api: ApiService) {
    this._api.readAll("brands").subscribe(
      data => {
        this.brands = data.brands;
        console.log(this.brands)
      } 
    );
   }

  ngOnInit(): void {}

}
