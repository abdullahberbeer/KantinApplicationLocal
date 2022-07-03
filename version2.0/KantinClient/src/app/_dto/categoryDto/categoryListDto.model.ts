
import { ProductListDto } from "../productDto/productListDto.model";

export class CategoryListDto{
  id:number;
  name:string;
  description:string;
  products:ProductListDto[];
}
