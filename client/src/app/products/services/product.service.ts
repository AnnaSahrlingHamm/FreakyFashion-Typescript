import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Hämta alla produkter
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Hämta utvalda produkter (featured)
  getFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/featured`);
  }

  // Lägg till en ny produkt
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Ta bort en produkt
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}

