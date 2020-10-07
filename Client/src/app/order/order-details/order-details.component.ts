import { IBasketTotals } from './../../shared/models/basket';
import { OrderService } from './../order.service';
import { IOrder } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;
  orderId: number;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private crumbService: BreadcrumbService
  ) {
    this.crumbService.set('@order', ' ');
  }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrderForUserById(this.orderId).subscribe(
      (order) => {
        this.order = order;
        this.crumbService.set('@order', `Order# ${order.id} - ${order.status}`);
      },
      (error) => console.log(error)
    );
  }

  getOrderSummary(): IBasketTotals {
    return {
      subtotal: this.order.subtotal,
      shipping: this.order.shippingPrice,
      total: this.order.total
    };
  }
}
