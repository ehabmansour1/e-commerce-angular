import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsRequestsService } from '../services/products-requests.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    PaginationComponent,
    SearchComponent,
  ],
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css'],
})
export class ProductsGridComponent implements OnInit {
  products: Product[] = [];
  productsRequestsService = inject(ProductsRequestsService);
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  searchQuery: string = '';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.searchQuery) {
      this.productsRequestsService
        .searchProducts(this.searchQuery)
        .subscribe((response) => {
          this.products = response.products;
          this.totalItems = response.total;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        });
    } else {
      const skip = (this.currentPage - 1) * this.itemsPerPage;
      this.productsRequestsService
        .getProductsList(this.itemsPerPage, skip)
        .subscribe((response) => {
          this.products = response.products;
          this.totalItems = response.total;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        });
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadProducts();
  }

  recivedFromChild(id: number) {
    console.log('FROM PARENT', id);
  }
}
