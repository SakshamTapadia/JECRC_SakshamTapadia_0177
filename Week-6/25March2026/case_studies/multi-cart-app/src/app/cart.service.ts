import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  private items: string[] =[];

  addToCart(product: string) {
    this.items.push(product);
  }
  getItems() {
    return this.items;
  }
  clearCart() {
    this.items = [];
  }
  
}
