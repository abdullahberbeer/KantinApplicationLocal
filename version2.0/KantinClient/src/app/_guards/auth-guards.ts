import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../_services/auth.service";
;

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate,CanActivateChild{
constructor(private authService:AuthService,private router:Router){

}
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree>| Promise<boolean|UrlTree>|boolean|UrlTree{
    if(this.authService.loggedIn()){
    return true;

    }
    console.log("auth guard")
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(childRoute:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree>| Promise<boolean|UrlTree>|boolean|UrlTree {
  return this.canActivate(childRoute,state);
  }
}
