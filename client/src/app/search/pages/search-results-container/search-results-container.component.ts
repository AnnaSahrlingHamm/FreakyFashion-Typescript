// src/app/search/pages/search-results-container/search-results-container.component.ts
import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductDisplayComponent } from '../../../shared/components/product-display/product-display.component';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-search-results-container',
  templateUrl: './search-results-container.component.html',
  styleUrls: ['./search-results-container.component.css'],
  imports: [CommonModule, ProductDisplayComponent]
})
export class SearchResultsContainerComponent implements OnChanges, OnDestroy {
  @Input() searchTerm = '';

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  private sub?: Subscription;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('searchTerm' in changes) {
      this.fetchProducts();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private fetchProducts(): void {
    this.sub?.unsubscribe();
    if (!this.searchTerm?.trim()) {
      this.products = [];
      this.error = null;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.sub = this.http
      .get<Product[]>(`http://localhost:8000/api/products?q=${encodeURIComponent(this.searchTerm)}`)
      .subscribe({
        next: data => {
          this.products = Array.isArray(data) ? data : [];
          this.error = null;
          this.loading = false;
        },
        error: err => {
          console.error('Fel vid hämtning av produkter:', err);
          this.products = [];
          this.error = 'Kunde inte hämta produkter.';
          this.loading = false;
        }
      });
  }
}
