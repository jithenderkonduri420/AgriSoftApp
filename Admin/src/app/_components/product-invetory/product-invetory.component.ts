import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../_service/api.service';
import { BrandService, BrandsType } from './../../_service/brand.service';
import { AlertService } from 'src/app/_service/alert.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-invetory',
  templateUrl: './product-invetory.component.html',
  styleUrls: ['./product-invetory.component.scss']
})
export class ProductInvetoryComponent implements OnInit {

  seletedBrand: BrandsType;
  closeResult: string = "Model";
  products: any[];
  addProductform: FormGroup;
  loading:boolean;
  submitted: boolean;
  uploadedProductImage: File;
  productImage: string = "../../../assets/images/uploadImage.png";
  serverImagePath = `${environment.serverUploads}/uploads`;

  constructor(
    private modalService: NgbModal,
    public _brands: BrandService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    ) {
      this.seletedBrand = this._brands.getBrand();
      this.loadProducts();
    }

  loadProducts():void{
    this.apiService.readAll(`products?brandId=${this.seletedBrand._id}`).subscribe(data => {
      this.products = data.products;
      console.log(this.products);
    })
  }


  ngOnInit(): void {
    this.addProductform = this.formBuilder.group({
      name: ['', Validators.required],
      packet: ['', Validators.required],
      image: [""],
      brandId: [this.seletedBrand._id]
    });
  }

  get f() {
    return this.addProductform.controls;
  }

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

  uploadImage(event:any):void{
    if(event.target.files){
      console.log(event.target.files[0])
      this.loadProducts();
      let reader = new FileReader();
      this.uploadedProductImage = <File>event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any)=>{
        this.productImage = event.target.result;
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    if(this.uploadedProductImage){
      this.addProductform.value.image = this.uploadedProductImage;
    }

    const formData:FormData = new FormData();
    formData.append('image', this.addProductform.value.image);
    formData.append('name', this.addProductform.get('name')?.value);
    formData.append('packet', this.addProductform.get('packet')?.value);
    formData.append('brandId', this.addProductform.get('brandId')?.value);

    // stop here if form is invalid
    if (this.addProductform.invalid) {
      return;
    }

    this.loading = true;
    this.apiService
      .create("products", formData)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loadProducts();
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
