import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersPaidComponent } from './orders-paid.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

const routes:Routes=[
  {
    path:'',component:OrdersPaidComponent
  }
]

@NgModule({
  declarations: [
    OrdersPaidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    NgxPaginationModule,
    MatIconModule
  ],schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],exports:[
    OrdersPaidComponent
  ]
})
export class OrdersPaidModule { }
