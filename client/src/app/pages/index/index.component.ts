import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/services/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    document.title = 'Freaky Fashion';
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta produkter';
        this.loading = false;
      }
    });
  }
}
