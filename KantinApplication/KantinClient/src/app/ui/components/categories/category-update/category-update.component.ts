import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryUpdateDto } from 'src/app/_dto/categoryDto/categoryUpdateDto.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
categoryId:number;
categoryUpdateDto:CategoryUpdateDto={
  id:0,
  name:'',
  description:''
}
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private spinnerService:NgxSpinnerService,private router:Router,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((success)=>{
     this.categoryId=+success.get('id');
     this.getCategory();
    })
  }
 getCategory(){
  this.spinnerService.show();
this.categoryService.getCategory(this.categoryId).subscribe((success)=>{
  this.spinnerService.hide();
this.categoryUpdateDto=success;
},(err)=>{
  this.spinnerService.hide();
  this.toastr.error(err);
})
 }
 updateCategory(){
  this.spinnerService.show();
  this.categoryService.updateCategory(this.categoryId,this.categoryUpdateDto).subscribe((success)=>{
    this.spinnerService.hide();
    this.toastr.success("Güncelleme işlemi başarılı..");
    this.router.navigate(['/categories']);
  },(err)=>{
    this.spinnerService.hide();
    this.toastr.error(err);

  })
 }
}
