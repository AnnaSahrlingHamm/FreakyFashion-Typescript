import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-similar-products',
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnChanges {
  @Input() product: Product | null = null;

  loading = true;
  error: string | null = null;
  similar: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.fetchSimilar(this.product);
    }
  }

  private fetchSimilar(current: Product) {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (all) => {
        const primary = all.filter(p =>
          p.slug !== current.slug && p.brand && current.brand && p.brand === current.brand
        );
        const fallback = all.filter(p =>
          p.slug !== current.slug && !primary.some(x => x.slug === p.slug)
        );

        const pick = (arr: Product[], n: number) => arr.slice(0, n);

        const selected: Product[] = [];
        selected.push(...pick(primary, 3));
        if (selected.length < 3) selected.push(...pick(fallback, 3 - selected.length));

        this.similar = selected.slice(0, 3);
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta liknande produkter.';
        this.loading = false;
      }
    });
  }
}
