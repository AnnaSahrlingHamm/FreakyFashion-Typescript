import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Product {
  id: number;
  item: string;
  description?: string;
  brand?: string;
  price: string;       // DB har TEXT; parsa där du behöver tal
  image: string;       // t.ex. "woman-coat-4.webp"
  slug: string;
  sku?: string;
  created_at?: string; // "2025-08-01"
}

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  get imageSrc(): string {
    // Ligger direkt i assets/images/
    return `assets/images/${this.product?.image ?? 'placeholder.webp'}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.webp';
  }

  get isNew(): boolean {
    if (!this.product?.created_at) return false;
    const created = new Date(this.product.created_at);
    const days = (Date.now() - created.getTime()) / 86400000;
    return days < 30;
  }
}
