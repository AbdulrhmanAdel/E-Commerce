import { IOrder } from './../shared/models/order';
import { OrderService } from './order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe(orders => {
      this.orders = orders;
    }, error => console.log(error));
  }

}
