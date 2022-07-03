import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonAddDto } from '../_dto/personDto/personAddDto.model';
import { PersonListDto } from '../_dto/personDto/personListDto.model';
import { PersonUpdateDto } from '../_dto/personDto/personUpdateDto.model';
import { Person } from '../_models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // baseUrl:string='https://localhost:5001';
  constructor(  @Inject("baseUrl") private baseUrl:string,private http:HttpClient) { }
  getPersons():Observable<PersonListDto[]>{
    return this.http.get<PersonListDto[]>(this.baseUrl+'/Person');
  }

  addPerson(personAddDto:PersonAddDto):Observable<PersonAddDto>{
    return this.http.post<PersonAddDto>(this.baseUrl+'/Person/personAdd',personAddDto);
  }

  getPerson(personId:number):Observable<PersonListDto>{
return this.http.get<PersonListDto>(this.baseUrl+'/Person/'+personId);
  }

  updatePerson(personId:number,personUpdateDto:PersonUpdateDto):Observable<PersonUpdateDto>{
    return this.http.post<PersonUpdateDto>(this.baseUrl+'/Person/personUpdate/'+personId,personUpdateDto);
  }

  deletePerson(personId:number):Observable<Person>{
    return this.http.post<Person>(this.baseUrl+'/Person/personDelete/'+personId,personId);
  }
  getToplamBorc(personId:number):Observable<any>{
    return this.http.get(this.baseUrl+'/Person/toplamBorc/'+personId);
  }
}
