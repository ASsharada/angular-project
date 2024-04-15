import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

    url="http://localhost:3000/product";
  
  constructor(private http:HttpClient) { }

  addNewProduct(data:any){
    return this.http.post(this.url, data);
    

    
}
deleteProduct(data:any){
  return this.http.post(this.url, data);
}
}