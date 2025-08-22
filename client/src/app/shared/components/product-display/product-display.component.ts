import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component'; 

import type { Product } from '../product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-display',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() products: Product[] = [];
}
