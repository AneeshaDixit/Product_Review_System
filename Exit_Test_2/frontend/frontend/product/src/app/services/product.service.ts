import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:7070"

  constructor(private httpClient: HttpClient) { }

  public addProduct1(productObject: any) {
    return this.httpClient.post<Product>(this.baseUrl + "/product/add", productObject);
  }
  
  public getProductById(pid:any){
    return this.httpClient.get<Product>(this.baseUrl + "/product/getProductsById/"+ pid)
  }

  public checkAvailability(pid:any, pinCode:any){
    return this.httpClient.get(this.baseUrl + "/product/check-pincode/"+ pid + '/' + pinCode)
  }

  public getAllProduct(){
    return this.httpClient.get<Product[]>(this.baseUrl + "/product/all")
  }
}
