import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(25)]],
      description: [''],
      image: ['', [Validators.required]],
      brand: [''],
      sku: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)
        ]
      ],
      price: [''],
      published: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    // Konvertera datum från yyyy-mm-dd till dd-mm-yyyy
    const formValue = { ...this.productForm.value };
    const [year, month, day] = formValue.published.split('-');
    formValue.published = `${day}-${month}-${year}`;

    this.productService.addProduct(formValue).subscribe({
      next: () => {
        console.log('Product added');
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }
}
