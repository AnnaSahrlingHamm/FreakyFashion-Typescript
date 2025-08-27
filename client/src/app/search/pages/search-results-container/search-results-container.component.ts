import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDisplayComponent } from '../../../shared/components/product-display/product-display.component';
import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-search-results-container',
  templateUrl: './search-results-container.component.html',
  styleUrls: ['./search-results-container.component.css'],
  imports: [CommonModule, ProductDisplayComponent]
})
export class SearchResultsContainerComponent implements OnChanges {
  @Input() searchTerm: string = '';
  @Output() resultsCount = new EventEmitter<number>();

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.fetchProducts();
    }
  }

  private fetchProducts() {
    if (!this.searchTerm) return;

    this.loading = true;
    this.error = null;

    this.productService.searchProducts(this.searchTerm).subscribe({
      next: (data) => {
        this.products = data;
        this.resultsCount.emit(this.products.length); // 🔥 skicka antal träffar
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta produkter.';
        this.resultsCount.emit(0); // fallback
        this.loading = false;
      }
    });
  }
}
