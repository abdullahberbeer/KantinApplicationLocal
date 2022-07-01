import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PersonAddDto } from 'src/app/_dto/personDto/personAddDto.model';
import { PersonListDto } from 'src/app/_dto/personDto/personListDto.model';
import { Person } from 'src/app/_models/person.model';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  persons:PersonListDto[]=[];
personAddDto: PersonAddDto = {
    firstName:'',
    lastName:'',
    description:''

  }

  constructor(private personService:PersonService, private toastr: ToastrService, private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
this.getPersons();
  }

  getPersons(){
    this.personService.getPersons().subscribe((success)=>{
      this.persons=success;
    },(err) => {

      this.toastr.error(err);
    })
  }
  addPerson() {
    this.spinnerService.show();
    this.personService.addPerson(this.personAddDto).subscribe((success) => {
      this.toastr.success("Ekleme işlemi başarılı..");
      this.spinnerService.hide();

      this.router.navigate(['/persons']);

    }, (err) => {
      this.spinnerService.hide();
      this.toastr.error(err);
    })
  }
}
