import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  abc: any;
  public getproduct: any[] = [];
  nameSearch: string = '';


  constructor(
    private httpClient: HttpClient,
    private productService: ProductService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((data: any) => {
      console.log(data)
      this.getproduct = data;
    })
  }

  goToProduct(pid: any) {
    this.router.navigate(["detail/" + pid]);
  }

}
