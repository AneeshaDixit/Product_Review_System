
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {

  productName = "One Plus 9r";
  pcity = "Patna,Bihar";
  pdatepost = "";
  pcoin = 20000;
  description =
    " Operating System: OxygenOS based on Android 11 CPU: Qualcomm® Snapdragon™ 870.. GPU: Adreno 650. RAM: 8GB/12GB";
  brand = "";
  image: string = "";
  pid = 2;
  public productdata: any;
  searchForm: FormGroup;
  pincode: any;
  avail: boolean = false;
  unavail: boolean = false;

  constructor(
    private _productdetailsService: ProductService,
    private domSanitizer: DomSanitizer,
    private productService: ProductService,
    private _route: ActivatedRoute
  ) { 
    this.searchForm = new FormGroup({
      search: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.pid = this._route.snapshot.params['id'];

    this.productService.getProductById(this.pid).subscribe((data) => {
      this.productdata = data;
      console.log(data);

      this.productName = this.productdata.productName
      this.brand = this.productdata.brand
      this.pcoin = this.productdata.price
      this.description = this.productdata.description
      this.image = this.productdata.image
    })
  }

  onClickForm() {
    if (this.searchForm.valid) {

       this.pincode =  this.searchForm.value.search

        this.productService.checkAvailability(this.pid, this.pincode).subscribe((data) => {
          console.log(data);
        },
          (error: any) => {
            if(error.status == 200){
                 this.avail = true;
                 this.unavail = false;
            }else{
              this.unavail = true;
              this.avail = false;
            }
            
          });

      } 

  }


}
