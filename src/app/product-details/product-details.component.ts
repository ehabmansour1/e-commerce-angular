import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product, Review } from '../product.model';
import { DiscountPricePipe } from '../discount-price.pipe';
import { ProductsRequestsService } from '../services/products-requests.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DiscountPricePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  reviews: Review[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productsRequestsService: ProductsRequestsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsRequestsService.getProductDetails(id).subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart({ ...this.product, quantity: this.quantity });

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
