import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/product.model';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ProductDisplayComponent } from '../../shared/components/product-display/product-display.component';
import { SpotsComponent } from '../../shared/components/spots/spots.component';
import { IconLinksComponent } from '../../shared/components/icon-links/icon-links.component';

@Component({
  standalone: true,
  imports: [
    NavBarComponent,
    HeroComponent,
    ProductDisplayComponent,
    SpotsComponent,
    IconLinksComponent
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
    document.title = 'Freaky Fashion';
    console.log('HomeComponent renderas');

    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Något gick fel vid hämtning av produkter';
        this.loading = false;
      }
    });
  }
}
