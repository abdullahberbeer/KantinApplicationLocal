import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListDto } from '../_dto/orderDto/orderListDto.model';
import { Order } from '../_models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // baseUrl:string='https://localhost:44343';
  constructor(@Inject("baseUrl") private baseUrl:string,private http:HttpClient) { }
  getOrders():Observable<OrderListDto>{
    return this.http.get<OrderListDto>(this.baseUrl+'/Order');
  }
  addPayment(orderId:number):Observable<any>{
    return this.http.post(this.baseUrl+'/Order/orderDelete/'+orderId,orderId);
  }

  getOrdersPersonelId(personId:number):Observable<any>{
    return this.http.get(this.baseUrl+'/Order/getOrdersPersonel/'+personId);
  }

}
