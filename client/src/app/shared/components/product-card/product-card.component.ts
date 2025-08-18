import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productImages } from '../../../products/product-images'; // auto-genererad fil

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges {
  @Input() product: any;

  images: { small: string; medium: string; large: string } = {
    small: '/assets/images/placeholder.webp',
    medium: '/assets/images/placeholder.webp',
    large: '/assets/images/placeholder.webp'
  };

  ngOnChanges(): void {
    if (this.product?.image) {
      const imageBase = this.product.image.replace('.webp', ''); // t.ex. "produkt1"
      this.images = productImages[imageBase] || this.images;
    }
  }

  getSafeImagePath(path: string): string {
    return path || '/assets/images/placeholder.webp';
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/images/placeholder.webp';
    target.srcset = '/assets/images/placeholder.webp';
  }
}
