import { Component, inject, Input } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  router = inject(Router);
  cartService = inject(CartService);

  getStars(): number[] {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return [];
    }
    const totalRating = this.product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = Math.round(totalRating / this.product.reviews.length);
    return Array(averageRating).fill(0);
  }

  handleRedirect(): void {
    this.router.navigate(['/product-details', this.product.id]);
  }

  addToCart(): void {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product);
      Swal.fire({
        title: 'Added to Cart!',
        text: 'Your product has been added successfully.',
        icon: 'success',
        background: '#121212',
        color: '#fff',
        iconColor: '#ff5f6d',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff5f6d',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button',
        },
      });
    }
  }
}
