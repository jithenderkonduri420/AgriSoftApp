import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandService, BrandsType } from 'src/app/_service/brand.service';
import { ApiService } from '../../_service/api.service';

@Component({
  selector: 'app-distributors-list',
  templateUrl: './distributors-list.component.html',
  styleUrls: ['./distributors-list.component.scss']
})
export class DistributorsListComponent implements OnInit {
  seletedBrand: BrandsType;
  distributorsList: any[] = [];

  constructor(
    private _brand:BrandService,
    private _api: ApiService
    ) {

      this.seletedBrand = this._brand.getBrand();
      this.getDistributors();
   }

   getDistributors():void{
    this._api.readAll("distributor").subscribe(data => {
      this.distributorsList = data.distributors;
      console.log(this.distributorsList);
    })
   }

   delDistributor(id:string):void{
    if(confirm("Conform delete distributor")){
      this._api.deleteIndex("distributor",id).subscribe(data=>{
        console.log(data);
        this.getDistributors();
      });
    }
   }

  ngOnInit(): void {}

}
