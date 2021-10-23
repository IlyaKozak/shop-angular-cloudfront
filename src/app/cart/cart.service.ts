import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from '../core/api.service';
import { Product } from '../products/product.interface';
import { Cart } from './cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  #cartSource = new BehaviorSubject<Cart>({ id: '', items: [] });
  cart$ = this.#cartSource.asObservable();
  url;

  totalInCart$: Observable<number> = this.cart$.pipe(
    map((cart) => cart.items.reduce((count, item) => count + item.count, 0)),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  constructor(protected readonly injector: Injector) {
    super(injector);

    this.url = this.getUrl('cart', 'profile/cart');
    this.http
      .get<{ data: { cart: Cart } }>(this.url)
      .subscribe(({ data: { cart } }) => this.#cartSource.next(cart));
  }

  addItem(product: Product): void {
    this.updateCount(product, 1);
  }

  removeItem(product: Product): void {
    this.updateCount(product, -1);
  }

  empty(): void {
    const cart = this.#cartSource.getValue();
    this.#cartSource.next({ id: cart.id, items: [] });
  }

  private updateCount(product: Product, type: 1 | -1): void {
    const { id, items } = this.#cartSource.getValue();
    const cartItem = items.find((item) => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += type;
    } else {
      items.push({ product, count: 1 });
    }

    const body = { id, items };
    this.http
      .put<{ data: { cart: Cart } }>(this.url, body)
      .subscribe(({ data: { cart } }) => this.#cartSource.next(cart));
  }
}
