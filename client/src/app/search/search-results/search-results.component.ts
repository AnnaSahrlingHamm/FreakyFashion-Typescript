import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/product.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query = '';
  results: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.search();
      }
    });
  }

  search(): void {
    this.loading = true;
    this.productService.searchProducts(this.query).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta sökresultat';
        this.loading = false;
      }
    });
  }
}
