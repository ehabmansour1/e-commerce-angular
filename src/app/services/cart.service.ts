import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  constructor() {}
  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }
  updateQuantity(productId: number, quantity: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      product.quantity = quantity;
    }
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }
  clearCart(): void {
    this.cartItems = [];
  }
}
