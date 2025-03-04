import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ProductsGridComponent } from '../products-grid/products-grid.component';

@Component({
  selector: 'app-products-container',
  imports: [SearchComponent, ProductsGridComponent],
  templateUrl: './products-container.component.html',
  styleUrl: './products-container.component.css',
})
export class ProductsContainerComponent {}
