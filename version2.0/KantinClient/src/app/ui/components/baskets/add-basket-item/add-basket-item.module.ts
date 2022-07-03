import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBasketItemComponent } from './add-basket-item.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes:Routes=[
  {
    path:'',component:AddBasketItemComponent
  }
]

@NgModule({
  declarations: [
    AddBasketItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
     FormsModule,
     MatInputModule,
    MatSelectModule
  ],exports:[
    AddBasketItemComponent

  ]
})
export class AddBasketItemModule { }
