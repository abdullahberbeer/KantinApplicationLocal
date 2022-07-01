import { Category } from "./category.model";

export class Product{
  id:number;
  name:string;
  price:string;
  stock:number;
  dateAdded:Date;
  isActive:boolean;
  categoryId:number;
  category:Category
}
