import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../products/product.model';
import { ProductService } from '../../../products/services/product.service';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { AdminLeftBarComponent } from '../../components/admin-left-bar/admin-left-bar.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, AdminHeaderComponent, AdminLeftBarComponent, ProductService ],
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.products = data;
        } else {
          console.error('API returnerade ingen array:', data);
          this.products = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fel vid hämtning av produkter:', err);
        this.error = 'Kunde inte hämta produkter. Försök igen.';
        this.isLoading = false;
      }
    });
  }

  handleDeleteProduct(productId: number): void {
    if (!confirm('Är du säker på att du vill ta bort denna produkt?')) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== productId);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fel vid borttagning av produkt:', err);
        this.error = 'Kunde inte ta bort produkten. Försök igen.';
        this.isLoading = false;
      }
    });
  }
}
