import { IDeliveryMethod } from './../shared/models/deliveryMethod';
import { map } from 'rxjs/operators';
import { IBasket, IBasketItem, Basket, IBasketTotals } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  createPaymentIntent() {
    return this.http.post<IBasket>(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
        })
      );
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  // Delete bakset from client browser
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice;
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => console.log(error));
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAddd: IBasketItem = this.mapProductITemToBasket(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAddd, quantity);
    this.setBasket(basket);
  }

  incrementQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const findItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[findItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const findItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[findItemIndex].quantity > 1) {
      basket.items[findItemIndex].quantity--;
    } else {
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(x => x.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => console.log(error));
  }

  // Calculate total price and subtotal and shipping price
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({shipping, subtotal, total});
  }

  // Add item to basket or update its quantity if it already there
  private addOrUpdateItem(items: IBasketItem[], itemToAddd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAddd.id);
    if (index === -1) {
      itemToAddd.quantity = quantity;
      items.push(itemToAddd);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  // Create basket and add it to localstorage
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  // Convert product to basketItem
  private mapProductITemToBasket(Item: IProduct, quantity: number): IBasketItem {
    return {
      id: Item.id,
      productName: Item.name,
      price: Item.price,
      imageUrl: Item.imageUrl,
      quantity,
      brand: Item.productBrand,
      type: Item.productType
    };
  }
}
