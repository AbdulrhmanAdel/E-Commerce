import { BasketService } from './../../basket/basket.service';
import { IProduct } from './../../shared/models/product';
import { Component, Input, OnInit } from '@angular/core';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

}
