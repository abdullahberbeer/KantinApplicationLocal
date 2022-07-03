import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductUpdateComponent } from './product-update.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes:Routes=[
  {
    path:'',component:ProductUpdateComponent
  }
]


@NgModule({
  declarations: [
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],exports:[
    ProductUpdateComponent
  ]
})
export class ProductUpdateModule { }
