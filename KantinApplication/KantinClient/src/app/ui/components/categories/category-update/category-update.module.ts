import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryUpdateComponent } from './category-update.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes:Routes=[
  {
    path:'',component:CategoryUpdateComponent
  }
]

@NgModule({
  declarations: [
    CategoryUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],exports:[
    CategoryUpdateComponent
  ]
})
export class CategoryUpdateModule { }
