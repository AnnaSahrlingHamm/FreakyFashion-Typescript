import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: any[] = [];
  @Input() isLoading: boolean = false;

  constructor(private router: Router) {}

  // Laddar om sidan, som i Reacts window.location.reload()
  handleRefresh(): void {
    window.location.reload();
  }

  // Navigerar till formuläret för att lägga till ny produkt
  navigateToAddProduct(): void {
    this.router.navigate(['/admin/products/add-product']);
  }

  // Anropas av HTML-komponenten och emitterar vidare till förälder
  @Input() onDeleteProduct: (productId: string) => void = () => {};

  deleteProduct(id: string): void {
    if (this.onDeleteProduct) {
      this.onDeleteProduct(id);
    }
  }
}
