import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAddComponent } from './product-add.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


const routes:Routes=[
  {
    path:'',component:ProductAddComponent
  }
]

@NgModule({
  declarations: [
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
     FormsModule,
     MatInputModule,
    MatSelectModule
  ],exports:[
    ProductAddComponent
  ]
})
export class ProductAddModule { }
