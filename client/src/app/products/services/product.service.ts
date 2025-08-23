import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../product.model'; 

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  /** Featured */
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`);
  }

  /** All */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /** By slug */
 getProductBySlug(slug: string): Observable<Product> {
  return this.http.get<Product>(`http://localhost:8000/api/products/${encodeURIComponent(slug)}`);
}


  /** Search (server expects ?q=...) */
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?q=${encodeURIComponent(query)}`);
  }

  /** Delete by id (you don't have a DELETE endpoint yet—add it when needed) */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Add product (you don't have a POST /api/products in server.js yet—add it if you need it) */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}
