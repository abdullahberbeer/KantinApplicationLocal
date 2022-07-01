import { OrderItem } from "./orderItem.model";
import { Person } from "./person.model";

export class Order{
id:number;
totalPaye:number;
personId:number;
isActive:boolean;
person:Person;
orderAdded:Date;
orderItems:OrderItem[]
}
