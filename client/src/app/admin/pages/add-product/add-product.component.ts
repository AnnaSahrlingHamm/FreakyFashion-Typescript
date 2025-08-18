import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { AdminLeftBarComponent } from '../../components/admin-left-bar/admin-left-bar.component';
import { AddProductFormComponent } from '../../components/add-product-form/add-product-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, AdminHeaderComponent, AdminLeftBarComponent, AddProductFormComponent],
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {}
