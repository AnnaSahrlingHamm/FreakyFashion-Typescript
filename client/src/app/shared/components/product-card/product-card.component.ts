import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productImages } from '../../../products/product-images';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;

  images = {
    small: '/assets/images/placeholder.webp',
    medium: '/assets/images/placeholder.webp',
    large:  '/assets/images/placeholder.webp'
  };

  ngOnChanges(): void {
    if (this.product?.image) {
      const base = this.product.image.replace('.webp', '');
      this.images = productImages[base] || this.images;
    }
  }

  getSafeImagePath(p: string) { return p || '/assets/images/placeholder.webp'; }
  handleImageError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    img.src = '/assets/images/placeholder.webp';
    img.srcset = '/assets/images/placeholder.webp';
  }
}
