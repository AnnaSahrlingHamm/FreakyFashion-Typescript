import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../products/product.model';
import { RouterModule, Router } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() isLoading = false;
  @Output() deleteProduct = new EventEmitter<number>();

  constructor(private router: Router) {}

  handleRefresh(): void {
    window.location.reload();
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/admin/products/add-product']);
  }

  onDelete(id: number): void {
    this.deleteProduct.emit(id);
  }
}
