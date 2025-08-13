import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (data) => this.products = Array.isArray(data) ? data : [],
      error: (err) => {
        console.error('Fel vid hämtning av produkter:', err);
        this.error = 'Kunde inte hämta produkter. Försök igen.';
      },
      complete: () => this.isLoading = false
    });
  }

  handleDeleteProduct(productId: number): void {
    if (!window.confirm('Är du säker på att du vill ta bort denna produkt?')) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
      },
      error: (err) => {
        console.error('Fel vid borttagning av produkt:', err);
        this.error = 'Kunde inte ta bort produkten. Försök igen.';
      },
      complete: () => this.isLoading = false
    });
  }
}
