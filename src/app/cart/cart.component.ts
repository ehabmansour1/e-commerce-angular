import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, (product.quantity || 1) + 1);
    }
  }

  decreaseQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      this.cartService.updateQuantity(productId, product.quantity - 1);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
  }
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
