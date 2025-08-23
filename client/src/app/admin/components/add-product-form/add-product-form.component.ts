import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-add-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {
  productForm!: FormGroup;   // <-- deklarera först
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // <-- initiera här, när fb finns
    this.productForm = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      image: ['', [Validators.required]],
      brand: [''],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
      price: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    this.isSubmitting = true;
    const v = this.productForm.value;
    const payload = {
      item: v.item!,
      description: v.description ?? '',
      image: v.image!,
      brand: v.brand ?? '',
      sku: v.sku!,
      price: v.price!,
    };

    this.http.post('http://localhost:8000/api/products', payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.productForm.reset();
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err?.error?.error ?? 'Kunde inte spara produkten.';
        console.error(err);
      }
    });
  }
}
