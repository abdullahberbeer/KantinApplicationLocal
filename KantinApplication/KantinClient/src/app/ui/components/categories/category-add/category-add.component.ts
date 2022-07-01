import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddDto } from 'src/app/_dto/categoryDto/categoryAddDto.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddDto:CategoryAddDto={
    name:'',
    description:''
  }

  constructor(private categoryService:CategoryService,private toastr:ToastrService,private spinnerService:NgxSpinnerService,private router:Router) { }

  ngOnInit(): void {

  }


  addCategory(){
    this.spinnerService.show();
    this.categoryService.addCategory(this.categoryAddDto).subscribe((success)=>{
      this.toastr.success("Ekleme işlemi başarılı..");
      this.spinnerService.hide();

      this.router.navigate(['/categories']);

    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })
  }
}
