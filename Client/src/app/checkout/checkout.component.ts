import { Observable } from 'rxjs';
import { IBasketTotals } from './../shared/models/basket';
import { BasketService } from './../basket/basket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  UserBasket = false;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.basketTotals$ = this.basketService.basketTotal$;
    if (localStorage.getItem('basket_id')) {
      this.UserBasket = true;
    }
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        street: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, [Validators.required]],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

}
