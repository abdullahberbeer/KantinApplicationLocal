import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  constructor(private authService:AuthService,private router:Router, private toastr: ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    // if(this.authService.loggedIn()){
    //   this.router.navigate(['/']);
    // }
  }
  register(){
    this.spinnerService.show();
    this.authService.register(this.model).subscribe(
      ()=>{
        this.spinnerService.hide();
       this.toastr.success("Kullanıcı Eklendi..")
      },
      error=>{
        this.spinnerService.hide();
       this.toastr.error(error)
      }
      // ,()=>{
      //   this.authService.login(this.model).subscribe(()=>{
      //    this.router.navigate(['/'])
      //   })

      // }
    )
   }
}
