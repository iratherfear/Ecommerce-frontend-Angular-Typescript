import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItemToAdd: CartItem) {
    let isAlreadyExistsInCart: boolean = false;
    let existingCartItem: any = this.cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    isAlreadyExistsInCart = (existingCartItem != undefined);
    if(isAlreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItemToAdd);
    }

    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartIdem of this.cartItems) {
      totalPriceValue += currentCartIdem.quantity * currentCartIdem.unitPrice;
      totalQuantityValue += currentCartIdem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotal();
    }
  }

}
