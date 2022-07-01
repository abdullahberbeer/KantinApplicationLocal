import { OrderItem } from "src/app/_models/orderItem.model";
import { PersonListDto } from "../personDto/personListDto.model";

export class OrderListDto{
  id:number;
  personId:number;
totalPaye:number;
orderAdded:string;
isActive:boolean;
person:PersonListDto;
orderItems:OrderItem[];
}
