import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/_service/brand.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  
  seletedBrand:any;
  serverImagePath = `${environment.serverUploads}/uploads`;
  
  Testimage: string = "../../assets/images/uploadImage.png";

  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]

  constructor(
    public _brands: BrandService,
  ) {
    this.seletedBrand = this._brands.getBrand();
   }

  ngOnInit(): void {
  }

}
