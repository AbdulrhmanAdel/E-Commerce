import { BasketService } from './../../basket/basket.service';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantiy = 1;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private crumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.crumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (product) => {
          this.product = product;
          this.crumbService.set('@productDetails', product.name);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantiy);
  }

  increment() {
    this.quantiy++;
  }

  decrement() {
    if (this.quantiy > 1) {
      this.quantiy--;
    }
  }
}
