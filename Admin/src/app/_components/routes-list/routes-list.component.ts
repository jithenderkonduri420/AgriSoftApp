import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_service/api.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  RoutesList: any[] = [];

  constructor(
    private apiService:ApiService,
  ) {
      this.getRoutesList()
   }

  getRoutesList():void{
    this.apiService.readAll("route").subscribe(data => {
      this.RoutesList = data.routes;
    })
  }

  ngOnInit(): void {}

  dropRoute(id: string){
    if(confirm("Conform delete distributor")){
      this.apiService.deleteIndex("route",id).subscribe(data=>{
        console.log(data);
        this.getRoutesList();
      });
    }
  }

}
