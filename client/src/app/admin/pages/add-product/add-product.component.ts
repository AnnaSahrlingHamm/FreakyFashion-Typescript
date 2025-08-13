import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private productService: ProductService) {}

  onAddProduct(productData: any): void {
    this.productService.addProduct(productData).subscribe({
      next: () => {
        alert('Produkten har lagts till!');
        // Här kan du navigera tillbaka till listan om du vill
      },
      error: (err) => {
        console.error('Fel vid tillägg av produkt:', err);
        alert('Kunde inte lägga till produkten.');
      }
    });
  }
}
