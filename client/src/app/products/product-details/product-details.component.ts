import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SimilarProductsComponent } from '../similar-products/similar-products.component';
import { Product } from '../product.model';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, SimilarProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

// product-details.component.ts (inne i ngOnInit)
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const slug = params.get('slug');
    if (!slug) {
      this.error = 'Ingen produkt angiven';
      this.product = null;
      return;
    }

    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe({
      next: (p) => { this.product = p; this.loading = false; },
      error: (err) => {
        console.error(err);
        this.error = 'Produkten kunde inte hämtas.';
        this.loading = false;
      }
    });
  });
}

   handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.webp';
  }

    addToCart(): void {
    if (!this.product) return;
    // Simulerad cart-action (ingen riktig varukorg i detta projekt)
    const cartItem = {
      id: this.product.id,
      item: this.product.item,
      price: this.product.price,
      image: this.product.image,
      slug: this.product.slug
    };
    console.log('Lägger i varukorg (simulerat):', cartItem);
    alert(`"${this.product.item}" lades (simulerat) i varukorgen.`);
  }
}
