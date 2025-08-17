import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductDisplayComponent } from '../../../shared/components/product-display/product-display.component';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-search-results-container',
  templateUrl: './search-results-container.component.html',
  styleUrls: ['./search-results-container.component.css'],
  imports: [CommonModule, HttpClient, ProductDisplayComponent]
})
export class SearchResultsContainerComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = '';
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  private subscription: Subscription | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.searchTerm) return;

    this.loading = true;

    this.subscription = timer(300)
      .pipe(
        switchMap(() =>
          this.http.get<Product[]>(`http://localhost:8000/api/products?q=${encodeURIComponent(this.searchTerm)}`)
        )
      )
      .subscribe({
        next: (data) => {
          this.products = Array.isArray(data) ? data : [];
          this.error = null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Fel vid hämtning av produkter:', err);
          this.error = 'Kunde inte hämta produkter.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
