import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAddDto } from '../_dto/productDto/productAddDto.model';
import { ProductListDto } from '../_dto/productDto/productListDto.model';
import { ProductUpdateDto } from '../_dto/productDto/productUpdateDto.model';
import { Product } from '../_models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl:string='https://localhost:44343';
  constructor( @Inject("baseUrl") private baseUrl:string,private http:HttpClient) { }
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/Product');
  }

  addProduct(productAddDto:ProductAddDto):Observable<ProductAddDto>{
    return this.http.post<ProductAddDto>(this.baseUrl+'/Product/productAdd',productAddDto);
  }

  getProduct(productId:number):Observable<ProductListDto>{
return this.http.get<ProductListDto>(this.baseUrl+'/Product/'+productId);
  }
  getProductbyCategory(categoryId:number):Observable<ProductListDto[]>{
    return this.http.get<ProductListDto[]>(this.baseUrl+'/Product/getbycategoy/'+categoryId);
      }

  updateProduct(productId:number,productUpdateDto:ProductUpdateDto):Observable<ProductUpdateDto>{
    return this.http.post<ProductUpdateDto>(this.baseUrl+'/Product/productUpdate/'+productId,productUpdateDto);
  }

  deleteProduct(productId:number):Observable<Product>{
    return this.http.post<Product>(this.baseUrl+'/Product/productDelete/'+productId,productId);
  }
}
