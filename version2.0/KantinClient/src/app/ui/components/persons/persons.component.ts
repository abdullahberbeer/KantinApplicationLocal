import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PersonListDto } from 'src/app/_dto/personDto/personListDto.model';
import { Person } from 'src/app/_models/person.model';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons:PersonListDto[]=[];
  displayedColumns: string[] = [ 'firstName','lastName','edit','delete','details'];
  dataSource:MatTableDataSource<PersonListDto>=new MatTableDataSource<PersonListDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString='';

  constructor(private personService:PersonService,private toastr:ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPersons();
  }
  getPersons(){
    this.spinnerService.show();
    this.personService.getPersons().subscribe((success)=>{
      this.spinnerService.hide();
      this.persons=success;
      this.dataSource=new MatTableDataSource<PersonListDto>(this.persons);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },(err)=>{
      this.spinnerService.hide();
      this.toastr.error(err);
    })}
    filterPersons(){
      this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
      // this.dataSource.filterPredicate=(data,filter)=>{
      //   return data.name.toLocaleLowerCase().includes(filter)
      // }
    }
    deletePerson(personId:number){

      this.spinnerService.show();
      this.personService.deletePerson(personId).subscribe((success)=>{
        this.spinnerService.hide();
        this.getPersons();


        this.toastr.success("Silme işlemi başarıyla gerçekleşti");
      },(err)=>{
        this.spinnerService.hide();
        this.toastr.error(err);
      })
    }

}
