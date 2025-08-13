import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
//import { productImages } from 'src/app/shared/data/product-images'; // Anpassa sökväg vid behov

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnChanges {
  @Input() products: any[] = [];
  @Input() isCarouselItem: boolean = false;

  processedProducts: {
    id: string;
    slug: string;
    name: string;
    price: string | number;
    brand?: string;
    imagePath: string;
    imageOriginal?: string;
    isNew: boolean;
  }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.prepareProducts();
    }
  }

  prepareProducts(): void {
    if (!Array.isArray(this.products)) {
      console.error('Invalid products input:', this.products);
      this.processedProducts = [];
      return;
    }

    this.processedProducts = this.products
      .filter(product => product && typeof product === 'object')
      .map(product => {
        const imageBase = product.image?.replace('.webp', '') || '';
        //const imagePath = productImages[imageBase] || '/placeholder.webp';

        const id = product.id || Math.random().toString(36).substr(2, 9);
        const slug = product.slug || 'saknas';
        const name = product.item || 'Namn saknas';
        const price = product.price !== undefined ? product.price : 'Pris saknas';
        const brand = product.brand;

        return {
          id,
          slug,
          name,
          price,
          brand,
          //imagePath,
          imageOriginal: product.image,
          isNew: this.isNewProduct(product)
        };
      });

    if (this.processedProducts.length === 0) {
      console.warn('Inga produkter att visa i ProductDisplay');
    }
  }

  isNewProduct(product: any): boolean {
    if (!product.created_at) return false;

    const createdDate = new Date(product.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }

  handleImageError(event: Event, image?: string): void {
    const target = event.target as HTMLImageElement;
    target.src = '/placeholder.webp';
    console.error('Bilden kunde inte laddas:', image);
  }
}
