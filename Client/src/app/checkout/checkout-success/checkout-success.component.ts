import { IOrder } from './../../shared/models/order';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  order: IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {
  }

}
