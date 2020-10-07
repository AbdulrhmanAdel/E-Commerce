import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from './../shared/shared.module';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order.component';

@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ],
  exports: []
})
export class OrderModule {}
