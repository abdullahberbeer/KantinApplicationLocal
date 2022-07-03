import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';

import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './_services/error.intercaptor';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './_guards/auth-guards';
import { JwtModule } from '@auth0/angular-jwt';



export function tokenGetter(){
  return localStorage.getItem("token");
}



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut:2000,
      closeButton:true,
      progressBar:true
    }),
    NgbModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        //allowedDomains:["test.akronsoft.online"],
        //disallowedRoutes:["test.akronsoft.online/api/auth"]
        allowedDomains:["localhost:5001"],
        disallowedRoutes:["localhost:5001/api/auth"]
      }
    })




  ],

  providers: [AuthGuard,
    {provide:'baseUrl' ,useValue:'https://localhost:5001'},
    {provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
