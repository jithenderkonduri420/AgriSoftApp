import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../_service/api.service';
import { AlertService } from '../../_service/alert.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  RoutesList: any[] = [];
  WarehouseData: any;
  warehouseID: string;
  warehouseName: string;

  constructor(
    private apiService:ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
      this.WarehouseData =  JSON.parse(localStorage.getItem('selectedWarehouse') || '[]');
      this.warehouseID = this.WarehouseData.WarehouseID;
      this.warehouseName = this.WarehouseData.WarehouseName;;
      this.getRoutesList()
   }

  getRoutesList():void{
    this.apiService.readAllByWareHouseId("route",this.warehouseID).subscribe(data => {
      this.RoutesList = data.routes;
    })
  }

  deleteWarehouse():void{
    this.apiService.deleteIndex("warehouse",this.warehouseID).subscribe(data => {
      this.router.navigate(["/warehouses"]);
      this.alertService.success(data)
    });
  }

  ngOnInit(): void {}

  dropRoute(id: string, name: string){
    if(confirm(`Conform delete ${name}`)){
      this.apiService.deleteIndex("route",id).subscribe(data=>{
        this.getRoutesList();
      },(error)=>{
        this.alertService.error(error);
      });
    }
  }

}
