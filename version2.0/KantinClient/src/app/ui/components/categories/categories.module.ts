import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CategoryAddModule } from './category-add/category-add.module';
import { MatIconModule } from '@angular/material/icon';



const routes:Routes=[
  {
    path:'',component:CategoriesComponent
  }
]



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CategoryAddModule,
    MatIconModule


  ],schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],exports:[
    CategoriesComponent

  ]
})
export class CategoriesModule { }
