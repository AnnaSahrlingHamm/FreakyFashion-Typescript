import { Component, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  getSafeImagePath(imgPath: string | undefined): string {
    if (!imgPath || typeof imgPath !== 'string') return '/assets/placeholder.webp';
    return imgPath;
  }

  getImageVariants(base: string) {
    return {
      small: `/assets/${base}_300w.webp`,
      medium: `/assets/${base}_400w.webp`,
      large: `/assets/${base}_500w.webp`
    };
  }
}
