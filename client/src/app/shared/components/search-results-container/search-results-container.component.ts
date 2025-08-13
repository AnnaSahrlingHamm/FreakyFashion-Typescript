import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results-container',
  templateUrl: './search-results-container.component.html',
  styleUrls: ['./search-results-container.component.scss']
})
export class SearchResultsContainerComponent implements OnChanges {
  @Input() searchTerm: string = '';

  products: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  private abortController: AbortController | null = null;
  private debounceTimer: any;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.handleSearch();
    }
  }

  handleSearch(): void {
    console.log('[SearchResultsContainer] Initializing with searchTerm:', this.searchTerm);

    if (this.abortController) {
      console.log('[Abort] Cancelling previous request');
      this.abortController.abort();
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (!this.searchTerm) {
      console.log('[handleSearch] Empty searchTerm, clearing products');
      this.products = [];
      return;
    }

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    this.debounceTimer = setTimeout(() => {
      console.log('[fetchProducts] Starting fetch for:', this.searchTerm);
      this.loading = true;

      const url = `http://localhost:8000/api/products?q=${encodeURIComponent(this.searchTerm)}`;

      fetch(url, { signal })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const results = Array.isArray(data) ? data : data.products || [];
          console.log('[fetchProducts] Processed results:', results);
          this.products = results;
          this.error = null;
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('[fetchProducts] Fetch error:', err);
            this.error = err.message;
          } else {
            console.log('[fetchProducts] Request was aborted');
          }
        })
        .finally(() => {
          this.loading = false;
          console.log('[fetchProducts] Fetch completed');
        });
    }, 300);
  }
}
