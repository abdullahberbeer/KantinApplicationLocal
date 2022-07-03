import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PersonUpdateDto } from 'src/app/_dto/personDto/personUpdateDto.model';
import { Person } from 'src/app/_models/person.model';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  persons:Person[]=[];
 personId:number;
personUpdateDto:PersonUpdateDto={
  id:0,
  firstName:'',
  lastName:'',
  description:''


}
  constructor(private personService:PersonService,private toastr:ToastrService,private spinnerService:NgxSpinnerService,private router:Router,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((success)=>{
     this.personId=+success.get('id');
     this.getPerson();
    })

  }

  getPerson(){
  this.spinnerService.show();
this.personService.getPerson(this.personId).subscribe((success)=>{
  this.spinnerService.hide();
this.personUpdateDto=success;

},(err)=>{
  this.spinnerService.hide();
  this.toastr.error(err);
})
 }
 updatePerson(){
  this.spinnerService.show();
  this.personService.updatePerson(this.personId,this.personUpdateDto).subscribe((success)=>{
    this.spinnerService.hide();
    this.toastr.success("Güncelleme işlemi başarılı..");
    this.router.navigate(['/persons']);
  },(err)=>{
    this.spinnerService.hide();
    this.toastr.error(err);

  })
 }

}
