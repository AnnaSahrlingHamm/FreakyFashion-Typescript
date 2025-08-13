import { Component, Input } from '@angular/core';
import { CartService } from '../../../core/cart.service'; 

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;

  images: { small: string; medium: string; large: string } = {
    small: '/placeholder.webp',
    medium: '/placeholder.webp',
    large: '/placeholder.webp'
  };

  constructor(private cartService: CartService) {}

  ngOnChanges(): void {
    if (this.product && this.product.image) {
      const imageBase = this.product.image.replace('.webp', '');
      this.images = this.getImageVariants(imageBase);
    }
  }

  getSafeImagePath(path: string): string {
    if (!path || typeof path !== 'string') return '/placeholder.webp';
    return path;
  }

  getImageVariants(base: string): { small: string; medium: string; large: string } {
    if (images[base]) {
      return {
        small: '/placeholder.webp',
        medium: '/placeholder.webp',
        large: '/placeholder.webp'
      };
    }

    return {
      small: productImages[`${base}_300w`] || productImages[base],
      medium: productImages[`${base}_400w`] || productImages[base],
      large: productImages[`${base}_500w`] || productImages[base]
    };
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/placeholder.webp';
    target.srcset = '/placeholder.webp';
  }

  addToCart(): void {
    if (!this.product || !this.product.id) {
      console.error('Ogiltig produkt:', this.product);
      return;
    }

    const cartItem = {
      id: this.product.id,
      item: this.product.item,
      name: this.product.item,
      price: typeof this.product.price === 'number'
        ? this.product.price
        : Number(this.product.price),
      image: this.product.image,
      slug: this.product.slug
    };

    console.log('Lägger till i varukorgen:', cartItem);
    this.cartService.addToCart(cartItem);
  }
}
