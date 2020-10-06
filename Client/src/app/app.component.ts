import { AccountService } from './account/account.service';
import { Basket } from './shared/models/basket';
import { BasketService } from './basket/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private basketService: BasketService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.loadUser();
    this.loadBasket();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrnetUser(token).subscribe(() => {
      console.log('loaded user');
    }, error => console.log(error));
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket');
      }, error => console.log(error));
    }
  }
}
