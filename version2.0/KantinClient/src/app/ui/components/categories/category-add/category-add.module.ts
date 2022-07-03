import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add.component';
import {  RouterModule, Routes } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const routes:Routes=[
  {
    path:'',component:CategoryAddComponent
  }
]

@NgModule({
  declarations: [
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    MatInputModule

],exports:[
    CategoryAddComponent

  ]

})
export class CategoryAddModule { }
