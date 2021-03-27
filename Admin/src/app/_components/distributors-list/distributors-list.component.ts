import { Component, OnInit } from '@angular/core';
import { BrandService, BrandsType } from 'src/app/_service/brand.service';

@Component({
  selector: 'app-distributors-list',
  templateUrl: './distributors-list.component.html',
  styleUrls: ['./distributors-list.component.scss']
})
export class DistributorsListComponent implements OnInit {
  seletedBrand: BrandsType;
  
  constructor(private _brand:BrandService) {
    this.seletedBrand = this._brand.getBrand()
   }

  ngOnInit(): void {}

}
