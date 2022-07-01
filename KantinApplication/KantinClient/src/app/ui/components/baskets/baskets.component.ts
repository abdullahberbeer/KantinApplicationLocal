import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketDeleteOneDto } from 'src/app/_dto/basketDto/basketDeleteOneDto.model';
import { BasketListDto } from 'src/app/_dto/basketDto/basketListDto.model';
import { PersonListDto } from 'src/app/_dto/personDto/personListDto.model';
import { Basket } from 'src/app/_models/basket.model';
import { BasketItem } from 'src/app/_models/basketItem.model';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {


 page:number=1;
 count:number=0;
 tableSize:number=3;
  tableSizes:any=[3,6,9,12];


  basketListDto:any=[];
   personListDto:any={};
   basketItems:any=[];
  displayedColumns:string[] = ['personId'];

  dataSource:MatTableDataSource<BasketListDto>=new MatTableDataSource<BasketListDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString='';
  constructor(private basketService:BasketService,private toastr:ToastrService,private spinnerService:NgxSpinnerService) {


  }

  ngOnInit(): void {
    this.getBaskets();


  }
  getBaskets(){
    this.spinnerService.show();
    this.basketService.getAllBasket().subscribe((success)=>{
      this.spinnerService.hide();
      this.basketListDto=success;



      this.dataSource=new MatTableDataSource<BasketListDto>(this.basketListDto);

      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err)
    })}
    filterBaskets(){
      this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
      this.dataSource.filterPredicate=(data,filter)=>{
        return data.person.firstName.toLocaleLowerCase().includes(filter)||
      data.person.lastName.toLocaleLowerCase().includes(filter)
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

    deletebyUserall(element){



      this.spinnerService.show();
      this.basketService.deleteUserAllBasket(element.personId).subscribe((success)=>{
        this.spinnerService.hide();
       this.getBaskets();
        this.toastr.success("Sepet başarı ile silindi..")
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err)
      })


    }
    deletebyUserone(basketId:number,cartId:number){
         var basketDeleteOneDto=new BasketDeleteOneDto();
        basketDeleteOneDto.basketId=basketId;
        basketDeleteOneDto.cartId=cartId;


      this.spinnerService.show();
      this.basketService.deleteUserOneBasket(basketDeleteOneDto).subscribe((success)=>{
        this.spinnerService.hide();
       this.getBaskets();
        this.toastr.success("Sepet ürünü başarı ile silindi..")
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err)
      })
    }
    checkout(personId:number){


      this.spinnerService.show();
      this.basketService.checkout(personId).subscribe((success)=>{
        this.spinnerService.hide();
       this.getBaskets();
        this.toastr.success("Satın alma işlemi başarıyla gerçekleşti..")
      },err=>{
        this.spinnerService.hide();
        console.log(err)
        this.toastr.error("Hata! Yöneticinize başvurun.")
      })
    }
}
