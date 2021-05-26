import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../_service/api.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  RoutesList: any[] = [];
  id: string;

  constructor(
    private apiService:ApiService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(data => {
      this.id = data.wharehouseID;
      this.getRoutesList()
    })
   }

  getRoutesList():void{
    console.log(this.id)
    this.apiService.readAllByWareHouseId("route",this.id).subscribe(data => {
      this.RoutesList = data.routes;
    })
  }

  ngOnInit(): void {}

  dropRoute(id: string, name: string){
    if(confirm(`Conform delete ${name}`)){
      this.apiService.deleteIndex("route",id).subscribe(data=>{
        console.log(data)
        this.getRoutesList();
      },(error)=>{
        console.error(error);
      });
    }
  }

}
