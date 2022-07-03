import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductUpdateDto } from 'src/app/_dto/productDto/productUpdateDto.model';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  categories:Category[]=[];
  productId:number;
productUpdateDto:ProductUpdateDto={
  id:0,
  name: '',
  price: 0,
  stock: 0,
  categoryId: 0



}
  constructor(private categoryService:CategoryService,private productService:ProductService,private toastr:ToastrService,private spinnerService:NgxSpinnerService,private router:Router,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((success)=>{
     this.productId=+success.get('id');
     this.getProduct();
    })
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((success)=>{
      this.categories=success;
    },(err) => {

      this.toastr.error(err);
    })
  }
  getProduct(){
  this.spinnerService.show();
this.productService.getProduct(this.productId).subscribe((success)=>{
  this.spinnerService.hide();
this.productUpdateDto=success;

},(err)=>{
  this.spinnerService.hide();
  this.toastr.error(err);
})
 }
 updateProduct(){
  this.spinnerService.show();
  this.productService.updateProduct(this.productId,this.productUpdateDto).subscribe((success)=>{
    this.spinnerService.hide();
    this.toastr.success("Güncelleme işlemi başarılı..");
    this.router.navigate(['/products']);
  },(err)=>{
    this.spinnerService.hide();
    this.toastr.error(err);

  })
 }

}
