import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/product.model';

@Component({
  standalone: true,
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
    console.log('HomeComponent renderas');

    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Fel vid hämtning av produkter:', err);
        this.error = 'Något gick fel vid hämtning av produkter';
        this.loading = false;
      }
    });
  }
}
