import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export class BrandsType {
  name: string;
  _id: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class BrandService {
  BrandWherehouses: any[] = [];
  constructor(private _api: ApiService){
    this._api.readAll("warehouse").subscribe(data => this.BrandWherehouses = data.warehouses)
  }

  public currentBrandData: BrandsType;

  setBrand(data: BrandsType): void{
    localStorage.setItem('selectedBrand', JSON.stringify(data));
  //  this.currentBrandData = data;
  }

  getBrand(): BrandsType{
    return JSON.parse(localStorage.getItem('selectedBrand') || '{}');
   // return this.currentBrandData;
  }

  getWearhouses(): any{
    return this.BrandWherehouses;
  }

}
