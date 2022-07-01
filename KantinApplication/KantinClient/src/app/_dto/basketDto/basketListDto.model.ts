import { BasketItem } from "src/app/_models/basketItem.model";
import { PersonListDto } from "../personDto/personListDto.model";

export class BasketListDto{
id:number;
totalPaye:number;

personId:number;
person:PersonListDto;
basketItems:BasketItem[];
}
