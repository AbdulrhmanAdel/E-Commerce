import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', component: OrderDetailsComponent, data: {breadcrumb: {alias: 'order'}}},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
