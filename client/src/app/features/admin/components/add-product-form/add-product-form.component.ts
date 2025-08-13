import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(25)]],
      description: [''],
      image: ['', [Validators.required]],
      brand: [''],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
      price: [''],
      published: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      console.warn('Formuläret är ogiltigt');
      return;
    }

    const formData = this.productForm.value;

    // Format: yyyy-mm-dd → dd-mm-yyyy
    const [year, month, day] = formData.published.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    const product = {
      ...formData,
      published: formattedDate
    };

    console.log("Skickar produkt:", product);

    this.http.post('http://localhost:8000/api/products', product).subscribe({
      next: () => console.log('Produkt tillagd'),
      error: (err) => console.error('Fel vid tillägg:', err)
    });
  }
}
