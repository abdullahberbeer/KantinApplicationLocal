import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  constructor(private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // if(this.authService.loggedIn()){
    //   this.router.navigate(['/']);
    // }
  }
  register(){
    this.authService.register(this.model).subscribe(
      ()=>{
       this.toastr.success("Kullanıcı Eklendi..")
      },
      error=>{
       this.toastr.error(error)
      },()=>{
        this.authService.login(this.model).subscribe(()=>{
         this.router.navigate(['/'])
        })

      }
    )
   }
}
