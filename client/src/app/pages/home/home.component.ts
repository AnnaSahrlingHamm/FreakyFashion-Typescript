import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/product.model';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ProductDisplayComponent } from '../../shared/components/product-display/product-display.component';
import { SpotsComponent } from '../../shared/components/spots/spots.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    ProductDisplayComponent,
    SpotsComponent,
  ],
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
    this.loading = true;
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;   // här är det max 8 st
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta produkter.';
        this.loading = false;
      }
    });
  }
}