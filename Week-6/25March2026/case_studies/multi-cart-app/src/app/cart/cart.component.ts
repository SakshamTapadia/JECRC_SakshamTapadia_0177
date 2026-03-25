import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartService]
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  getItems() {
    return this.cartService.getItems();
  }
  addToCart(product: string) {
    this.cartService.addToCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
