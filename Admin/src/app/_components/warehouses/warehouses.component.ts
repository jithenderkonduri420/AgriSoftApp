import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  warehouses:any[];
  serverImagePath = environment.serverUploads;

  constructor(private _api: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.loadWareHouses();
  }

  loadWareHouses(){
    this._api.readAll("warehouse").subscribe(
      data => {
        this.warehouses = data.warehouses;
      }
    );
  }

  gotoRoute(id:string){
    this.route.navigate(['/routes'],{queryParams: {wharehouseID: id}})
  }

}
