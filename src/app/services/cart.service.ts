import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  constructor() {}

  // Add a product to the cart
  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1; // Increment quantity if product already exists
    } else {
      product.quantity = 1; // Set initial quantity to 1
      this.cartItems.push(product);
    }
  }

  // Remove a product from the cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  // Update the quantity of a product in the cart
  updateQuantity(productId: number, quantity: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      product.quantity = quantity;
    }
  }

  // Get the current cart items
  getCartItems(): Product[] {
    return this.cartItems;
  }

  // Get the total number of items in the cart
  getCartItemCount(): number {
    return this.cartItems.reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );
  }

  // Calculate the total price of the cart
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
  }
}
