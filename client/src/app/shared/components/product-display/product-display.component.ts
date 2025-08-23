import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../products/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-display',
  imports: [CommonModule, RouterModule, ProductCardComponent], // ⬅️ VIKTIGT
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() products: Product[] = [];

  handleImageError(evt: Event) {
    (evt.target as HTMLImageElement).src = 'assets/placeholder.webp';
  }
  isNewProduct(p: Product): boolean {
    if (!p.created_at) return false;
    const d = new Date(p.created_at);
    return (Date.now() - d.getTime()) / 86400000 < 30;
  }
}
