import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export class BrandsType {
  name: string;
  _id: string;
  image: string;
} 

@Injectable({ providedIn: 'root' })
export class BrandService {
  constructor(private _api: ApiService){}
  public currentBrandData: BrandsType;
  
  setBrand(data: BrandsType): void{
    this.currentBrandData = data;
  }

  getBrand(): BrandsType{
    return this.currentBrandData;
  }
}
