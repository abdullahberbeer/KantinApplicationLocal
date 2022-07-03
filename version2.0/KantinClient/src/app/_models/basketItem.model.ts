import { Basket } from "./basket.model";
import { Product } from "./product.model";

export class BasketItem{
id:number;
productId:number;
product:Product;
basketId:number;
basket:Basket;
adet:number;
totalPrice:number;
}
