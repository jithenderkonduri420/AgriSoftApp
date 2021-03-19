import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/_models/brands.model';
import { ApiService } from "../../_service/api.service"
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  brands:Brands[] = [];
  serverImagePath = environment.serverUploads;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(){
    this._api.readAll("brands").subscribe(
      data => {
        this.brands = data.brands;
        console.log(this.brands)
      }
    );
  }

}
