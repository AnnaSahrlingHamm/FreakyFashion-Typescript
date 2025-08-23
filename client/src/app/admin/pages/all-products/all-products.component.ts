// src/app/admin/pages/all-products/all-products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { AdminLeftBarComponent } from '../../components/admin-left-bar/admin-left-bar.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';

import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/product.model';

@Component({
  standalone: true,
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    AdminHeaderComponent,
    AdminLeftBarComponent,
    ProductTableComponent
  ]
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Kunde inte hämta produkter', err);
        this.error = 'Kunde inte hämta produkter.';
        this.isLoading = false;
      }
    });
  }

  onRefresh(): void {
    this.loadProducts();
  }

  onDeleteProduct(id: number): void {
    const ok = window.confirm('Är du säker på att du vill ta bort denna produkt?');
    if (!ok) return;

    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        // Optimistisk uppdatering av listan
        this.products = this.products.filter(p => p.id !== id);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Kunde inte ta bort produkten', err);
        this.error = 'Kunde inte ta bort produkten.';
        this.isLoading = false;
      }
    });
  }
}
