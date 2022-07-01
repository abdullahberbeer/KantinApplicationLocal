
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {




   //baseUrl:string ='http://test.akronsoft.online/api/auth/';
   baseUrl:string ='https://localhost:5001/api/auth/';
  jwtHelper =new JwtHelperService();
  decodedToken:any;
  constructor(private http:HttpClient) { }


  login(model:any){
      return this.http.post(this.baseUrl+"login",model).pipe(
        map((response:any)=>{
          const result = response;
          if(result){
              localStorage.setItem("token",result.token);
              this.decodedToken=this.jwtHelper.decodeToken(result.token);

          }
        })
      );
  }
  register(model:any){
    return this.http.post(this.baseUrl+"register",model);
  }
  loggedIn(){
    const token = localStorage.getItem("token")
    return !this.jwtHelper.isTokenExpired(token!);
  }
}
