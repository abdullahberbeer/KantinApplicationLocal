import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService,private router:Router, private toastr: ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  login() {
    this.spinnerService.show();
    this.authService.login(this.model).subscribe(
      (next) => {
        this.spinnerService.hide();
        this.toastr.success("Giriş Başarılı")
        this.router.navigate(['/'])
      },
      (error) => {
        this.spinnerService.hide();
        this.toastr.error("Giriş Başarısız oldu!")
        console.log(error);
      }
    );
  }
}
