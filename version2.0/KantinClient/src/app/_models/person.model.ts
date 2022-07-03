import { Order } from "./order.model";

export class Person{
id:number;
firstName:string;
lastName:string;
borc:number;
isActive:boolean;
description:string;
dateAdded:Date;
orders:Order[]
}
