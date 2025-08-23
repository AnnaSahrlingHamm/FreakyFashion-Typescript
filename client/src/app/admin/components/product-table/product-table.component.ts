// src/app/admin/components/product-table/product-table.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() isLoading = false;

  @Output() deleteProduct = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  constructor(private router: Router) {}

  handleRefresh(): void {
    this.refresh.emit();            // <-- istället för window.location.reload()
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/admin/products/add-product']);
  }

  onDelete(id: number | undefined): void {
    if (id == null) return;
    this.deleteProduct.emit(id);
  }
}
