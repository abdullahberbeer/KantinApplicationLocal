import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderListDto } from 'src/app/_dto/orderDto/orderListDto.model';
import { Order } from 'src/app/_models/order.model';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  page:number=1;
  count:number=0;
  tableSize:number=3;
   tableSizes:any=[3,6,9,12];

   orderListDto:any=[];
   personListDto:any={};
  orderItems:any=[];



  displayedColumns: string[] = [ 'personId'];
  dataSource:MatTableDataSource<OrderListDto>=new MatTableDataSource<OrderListDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString='';
  filterStringDate='';
  constructor(private orderService:OrderService,private toastr:ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.spinnerService.show();
    this.orderService.getOrders().subscribe((success)=>{
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
      },(error)=>{
        this.spinnerService.hide();
        console.log(error);
        this.toastr.error("Hata oluştu yöneticinize başvurun!");
    })}

}
