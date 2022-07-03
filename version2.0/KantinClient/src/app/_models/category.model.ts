import { Product } from "./product.model";

export class Category{
  id:number;
  name:string;
  description:string;
  isActive:boolean;
  products:Product[];
}
