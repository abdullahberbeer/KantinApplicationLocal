import { Component,AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[]=[];
  displayedColumns: string[] = [ 'name','price','stock','edit','delete'];
  dataSource:MatTableDataSource<Product>=new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString:string='';
  constructor(private productService:ProductService,private toastr:ToastrService,private spinnerService:NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.spinnerService.show();
    this.productService.getProducts().subscribe((success)=>{
      this.spinnerService.hide();
      this.products=success;
      this.dataSource=new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })
  }
  filterProducts(){
    this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate=(data,filter)=>{
      return data.name.toLocaleLowerCase().includes(filter)
    }
  }
  deleteProduct(productId:number){
    console.log(productId)
    this.spinnerService.show();
    this.productService.deleteProduct(productId).subscribe((success)=>{
      this.spinnerService.hide();
      this.getProducts();


      this.toastr.success("Silme işlemi başarıyla gerçekleşti");
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })
  }
}
