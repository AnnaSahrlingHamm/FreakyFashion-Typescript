import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productImages } from '../../../products/product-images';
import { Product } from '../../../products/product.model';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;

  constructor(library: FaIconLibrary) {
  library.addIcons(faHeart);
  }

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

    // Basväg där dina produktbilder ligger
  private readonly base = 'assets/images/';
  private readonly fallback = 'assets/images/placeholder.webp';

  /** Bygger en säker bildsökväg och trimmar ev. whitespace */
  safeSrc(product: any): string {
    const raw = (product?.image ?? '').toString().trim();
    // Om image saknas -> fallback direkt
    if (!raw) return this.fallback;

    // Undvik dubbla/inga slashar
    if (raw.startsWith('http')) return raw;                   // extern URL
    if (raw.startsWith('assets/')) return raw;                // redan absolut i assets
    return this.base + raw;                                   // normaliserad lokal fil
  }

  /** Gör snygg fade-in när bilden laddats */
  onImageLoad(evt: Event) {
    const img = evt.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  /** Nyhetsbadge-logik – tål både created_at och createdAt */
  isNewProduct(product: any): boolean {
    const createdRaw = product?.created_at ?? product?.createdAt;
    if (!createdRaw) return false;
    const created = new Date(createdRaw);
    const days = (Date.now() - created.getTime()) / 86400000;
    return days < 30;
  }
}
