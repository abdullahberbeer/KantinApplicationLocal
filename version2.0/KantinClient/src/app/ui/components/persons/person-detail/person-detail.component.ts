import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderListDto } from 'src/app/_dto/orderDto/orderListDto.model';

import { OrderService } from 'src/app/_services/order.service';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  page:number=1;
  count:number=0;
  tableSize:number=3;
   tableSizes:any=[3,6,9,12];


  personId:number;
  personListDto:any=[];
  orderListDto:any=[];
  toplamBorc:any='';

  displayedColumns: string[] = [ 'personId'];
  dataSource:MatTableDataSource<OrderListDto>=new MatTableDataSource<OrderListDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString='';
  filterStringDate='';

  constructor(private personService:PersonService,private orderService:OrderService,private toastr:ToastrService,private spinnerService:NgxSpinnerService,private activatedRoute:ActivatedRoute) { }



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((success)=>{
     this.personId=+success.get('id');
     this.getOrders();
     this.getToplamBorc();
    })

  }

  getOrders(){
    this.spinnerService.show();
    this.orderService.getOrdersPersonelId(this.personId).subscribe((success)=>{
      this.spinnerService.hide();
      this.orderListDto=success;
      this.dataSource=new MatTableDataSource<OrderListDto>(this.orderListDto.filter(x=>x.isActive));
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })}
    filterOrders(){
      this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
      this.dataSource.filterPredicate=(data,filter)=>{


        return data.person.firstName.toLocaleLowerCase().includes(filter) ||
        data.person.lastName.toLocaleLowerCase().includes(filter)

      }

      // this.dataSource.filterPredicate=(data,filter)=>{
      //   return data.name.toLocaleLowerCase().includes(filter)
      // }
    }
    filterOrdersDate(){
      this.dataSource.filter=this.filterStringDate.trim().toLocaleLowerCase();
      this.dataSource.filterPredicate=(data,filter)=>{

        return  data.orderAdded.includes(filter)
      }
    }
    onTableDataChange(event:any)
    {
      this.page=event;
    }


    onTableSizeChange(event:any):void{
      this.tableSize=event.target.value;
      this.page=1;
    }

    addPayment(orderId:number){

      this.spinnerService.show();
      this.orderService.addPayment(orderId).subscribe((success)=>{
        this.spinnerService.hide();
        this.toastr.success("Ödeme işlemi başarıyla gerçekleşti");
        this.getOrders();
        this.getToplamBorc();
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err);
    })}

    getToplamBorc(){
      this.spinnerService.show();
      this.personService.getToplamBorc(this.personId).subscribe((success)=>{
        this.spinnerService.hide();
       this.toplamBorc=success
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err);
    })
    }
}
