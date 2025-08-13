import { Component, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnChanges {
  @Input() products: any[] = [];

  validProducts: any[] = [];

  @ViewChild('carouselRef', { static: true }) carouselRef!: ElementRef<HTMLDivElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.validProducts = this.products.filter(product =>
        product && product.image && product.id
      );

      if (this.validProducts.length > 0) {
        const uniqueImages = new Set(this.validProducts.map(p => p.image));
        console.log('Unika bilder i karusellen:', uniqueImages.size);
      } else {
        console.warn('Inga giltiga produkter att visa i karusellen');
      }
    }
  }

  scroll(direction: 'left' | 'right'): void {
    const carousel = this.carouselRef?.nativeElement;
    if (carousel) {
      const scrollAmount = carousel.offsetWidth * 0.8;
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}
