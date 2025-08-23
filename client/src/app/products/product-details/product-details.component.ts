import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product.model';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');   // <-- Hämta :slug
    if (!slug) {
      this.error = 'Ingen produkt angiven';
      this.loading = false;
      return;
    }

    this.productService.getProductBySlug(slug).subscribe({
      next: (p) => { this.product = p; this.loading = false; },
      error: (err) => {
        console.error(err);
        this.error = 'Produkten kunde inte hämtas.';
        this.loading = false;
      }
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
