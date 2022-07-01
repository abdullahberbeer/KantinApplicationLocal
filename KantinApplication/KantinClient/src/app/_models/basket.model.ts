import { BasketItem } from "./basketItem.model";
import { Person } from "./person.model";

export class Basket{
 id:number;
 totalPaye:number;
 personId:number;
 person:Person;
 basketItems:BasketItem[];
}
