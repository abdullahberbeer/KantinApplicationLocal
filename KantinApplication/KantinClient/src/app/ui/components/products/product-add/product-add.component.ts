import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductAddDto } from 'src/app/_dto/productDto/productAddDto.model';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories:Category[]=[];
  productAddDto: ProductAddDto = {
    name: '',
    price: 1,
    stock: 1,
    categoryId: 0
  }

  constructor(private categoryService:CategoryService,private productService: ProductService, private toastr: ToastrService, private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((success)=>{
      this.categories=success;
    },(err) => {

      this.toastr.error(err);
    })
  }
  addProduct() {
    this.spinnerService.show();
    this.productService.addProduct(this.productAddDto).subscribe((success) => {
      this.toastr.success("Ekleme işlemi başarılı..");
      this.spinnerService.hide();

      this.router.navigate(['/products']);

    }, (err) => {
      this.spinnerService.hide();
      this.toastr.error(err);
    })
  }
}
