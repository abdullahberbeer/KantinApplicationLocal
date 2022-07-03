import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../_services/auth.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  menuClick(event:any){
    console.log(event);
  }
  navClick(event){


  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.toastr.success("Giriş Başarılı")
        this.router.navigate(['/home'])
      },
      (error) => {
        this.toastr.error("Giriş Başarısız")
        console.log(error);
      }
    );
  }
  loggedIn(){
  return this.authService.loggedIn();
  }
  logout(){
    localStorage.removeItem("token");
    this.toastr.warning("Çıkış yapıldı..")
    this.router.navigate(['/login'])
  }
}
