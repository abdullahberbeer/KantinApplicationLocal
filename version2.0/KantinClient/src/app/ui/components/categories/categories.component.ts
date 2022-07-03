import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddDto } from 'src/app/_dto/categoryDto/categoryAddDto.model';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories:Category[]=[];
  categoryAddModel:CategoryAddDto;
  displayedColumns: string[] = [ 'name','edit','delete'];
  dataSource:MatTableDataSource<Category>=new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString='';
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.spinnerService.show();
    this.categoryService.getCategories().subscribe((success)=>{
      this.spinnerService.hide();
      this.categories=success;
      this.dataSource=new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })}
    filterCategories(){
      this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
      this.dataSource.filterPredicate=(data,filter)=>{
        return data.name.toLocaleLowerCase().includes(filter)
      }
    }
    // addCategory(){
    //   this.categoryService.addCategory(this.categoryAddModel).subscribe((success)=>{
    //     this.toastr.success("Ekleme işlemi başarıyla gerçekleşti");
    //   },(err)=>{
    //     this.spinnerService.hide();
    //     this.toastr.error(err);
    //   })
    // }
    deleteCategory(categoryId:number){

      this.spinnerService.show();
      this.categoryService.deleteCategory(categoryId).subscribe((success)=>{
        this.spinnerService.hide();
        this.getCategories();


        this.toastr.success("Silme işlemi başarıyla gerçekleşti");
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err);
      })
    }
}
