import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-display',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() products: any[] = [];

  /**
   * Hanterar fallback-bild om en produktbild inte kan laddas
   */
  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/placeholder.webp';
    target.srcset = '/placeholder.webp'; // bra att sätta båda
  }

  /**
   * Returnerar true om produkten ska markeras som ny
   */
  isNewProduct(product: any): boolean {
    if (!product?.createdAt) return false;
    const created = new Date(product.createdAt);
    const daysSince = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince < 30; // Nyhet om den är yngre än 30 dagar
  }
}
