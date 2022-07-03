import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderItem{
id:number;
orderId:number;
order:Order;
productId:number;
product:Product;
price:number;
quantity:number;
}
