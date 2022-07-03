import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddBasketItemComponent } from './ui/components/baskets/add-basket-item/add-basket-item.component';
import { BasketsComponent } from './ui/components/baskets/baskets.component';
import { CategoriesComponent } from './ui/components/categories/categories.component';
import { CategoryAddComponent } from './ui/components/categories/category-add/category-add.component';
import { CategoryUpdateComponent } from './ui/components/categories/category-update/category-update.component';
import { HomeComponent } from './ui/components/home/home.component';
import { OrdersPaidComponent } from './ui/components/orders/orders-paid/orders-paid.component';
import { OrdersComponent } from './ui/components/orders/orders.component';
import { PersonAddComponent } from './ui/components/persons/person-add/person-add.component';
import { PersonDetailComponent } from './ui/components/persons/person-detail/person-detail.component';
import { PersonUpdateComponent } from './ui/components/persons/person-update/person-update.component';
import { PersonsComponent } from './ui/components/persons/persons.component';
import { ProductAddComponent } from './ui/components/products/product-add/product-add.component';
import { ProductUpdateComponent } from './ui/components/products/product-update/product-update.component';
import { ProductsComponent } from './ui/components/products/products.component';
import { AuthGuard } from "./_guards/auth-guards";

import { LayoutComponent } from './ui/layout/layout.component';
import { NotFoundComponent } from './ui/components/not-found/not-found.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/components/register/register.component';

const routes: Routes = [
  {
    path:'',component:LayoutComponent,canActivateChild:[AuthGuard],children:[
      {
        path:'',component:HomeComponent,loadChildren:()=> import('./ui/components/home/home.module').then(m=>m.HomeModule)
      },
      {
        path:'products',component:ProductsComponent,loadChildren:()=> import('./ui/components/products/products.module').then(m=>m.ProductsModule)
      },
      {
        path:'productadd',component:ProductAddComponent,loadChildren:()=> import('./ui/components/products/product-add/product-add.module').then(m=>m.ProductAddModule)
      },
      {
        path:'products/update/:id',component:ProductUpdateComponent,loadChildren:()=> import('./ui/components/products/product-update/product-update.module').then(m=>m.ProductUpdateModule
          )
      },
      {
        path:'categories',component:CategoriesComponent,loadChildren:()=> import('./ui/components/categories/categories.module').then(m=>m.CategoriesModule)
      },
      {
        path:'categoryadd',component:CategoryAddComponent,loadChildren:()=> import('./ui/components/categories/category-add/category-add.module').then(m=>m.CategoryAddModule
          )
      },
      {
        path:'categories/update/:id',component:CategoryUpdateComponent,loadChildren:()=> import('./ui/components/categories/category-update/category-update.module').then(m=>m.CategoryUpdateModule
          )
      },
      {
        path:'register',component:RegisterComponent,loadChildren:()=> import('./ui/components/register/register.module').then(m=>m.RegisterModule
          )
      },
      {
        path:'baskets',component:BasketsComponent,loadChildren:()=> import('./ui/components/baskets/baskets.module').then(m=>m.BasketsModule)
      },
      {
        path:'basketadd',component:AddBasketItemComponent,loadChildren:()=> import('./ui/components/baskets/add-basket-item/add-basket-item.module').then(m=>m.AddBasketItemModule)
      },
      {
        path:'orders',component:OrdersComponent,loadChildren:()=> import('./ui/components/orders/orders.module').then(m=>m.OrdersModule)
      },
      {
        path:'orderspaid',component:OrdersPaidComponent,loadChildren:()=> import('./ui/components/orders/orders-paid/orders-paid.module').then(m=>m.OrdersPaidModule)
      },
      {
        path:'persons',component:PersonsComponent,loadChildren:()=> import('./ui/components/persons/persons.module').then(m=>m.PersonsModule
          )
      },
      {
        path:'personadd',component:PersonAddComponent,loadChildren:()=> import('./ui/components/persons/person-add/person-add.module').then(m=>m.PersonAddModule)
      },
      {
        path:'persons/update/:id',component:PersonUpdateComponent,loadChildren:()=> import('./ui/components/persons/person-update/person-update.module').then(m=>m.PersonUpdateModule
          )
      },
      {
        path:'persons/details/:id',component:PersonDetailComponent,loadChildren:()=> import('./ui/components/persons/person-detail/person-detail.module').then(m=>m.PersonDetailModule
          )
      }



    ]
  },
  {
    path:'login',component:LoginComponent,loadChildren:()=>import('./ui/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'**',component:NotFoundComponent,loadChildren:()=>import('./ui/components/not-found/not-found.module').then(m=>m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
