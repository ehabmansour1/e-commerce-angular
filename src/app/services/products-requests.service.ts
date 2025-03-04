import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  constructor(private http: HttpClient) {}

  getProductsList(limit: number = 10, skip: number = 0): Observable<any> {
    return this.http.get(`${environment.baseURL}/products`, {
      params: {
        limit: limit.toString(),
        skip: skip.toString(),
      },
    });
  }

  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/products/${id}`);
  }
  searchProducts(query: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/products/search`, {
      params: {
        q: query,
      },
    });
  }
}
