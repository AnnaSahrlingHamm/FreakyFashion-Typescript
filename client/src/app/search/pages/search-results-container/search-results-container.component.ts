import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductDisplayComponent } from '../../../shared/components/product-display/product-display.component';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-search-results-container',
  templateUrl: './search-results-container.component.html',
  styleUrls: ['./search-results-container.component.css'],
  imports: [CommonModule, RouterModule, ProductDisplayComponent]
})
export class SearchResultsContainerComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = '';
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  private subscription: Subscription | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lyssna på queryParams för ?q=...
    this.route.queryParams.subscribe(params => {
      const term = params['q'];
      if (term) {
        this.searchTerm = term;
        this.fetchProducts();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // ✅ När <app-search (search)="onSearch($event)"> triggas
  onSearch(term: string): void {
    this.searchTerm = term;
    this.fetchProducts();
  }

  private fetchProducts(): void {
    if (!this.searchTerm) return;

    this.loading = true;
    this.subscription?.unsubscribe(); // avbryt ev. tidigare request

    this.subscription = this.http
      .get<Product[]>(`http://localhost:8000/api/products?q=${encodeURIComponent(this.searchTerm)}`)
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
}
