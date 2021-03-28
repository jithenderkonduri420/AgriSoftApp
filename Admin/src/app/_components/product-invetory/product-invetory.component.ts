import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BrandService, BrandsType } from './../../_service/brand.service';

@Component({
  selector: 'app-product-invetory',
  templateUrl: './product-invetory.component.html',
  styleUrls: ['./product-invetory.component.scss']
})
export class ProductInvetoryComponent implements OnInit {

  seletedBrand: BrandsType;
  closeResult: string = "Model";

  constructor(
    private modalService: NgbModal,
    public _brands: BrandService
    ) { 
      this.seletedBrand = this._brands.getBrand();
    }
  

  ngOnInit(): void {}

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
