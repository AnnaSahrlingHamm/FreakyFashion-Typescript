import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { Product } from '../../../products/product.model';
@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule], 
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() products: Product[] = [];

  isNewProduct(product: Product): boolean {
    if (!product.created_at) return false;
    const createdDate = new Date(product.created_at);
    const now = new Date();
    const diffDays = Math.abs(+now - +createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }
}
