import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLeftBarComponent } from './components/admin-left-bar/admin-left-bar.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminHeaderComponent,
    AdminLeftBarComponent,
    AddProductFormComponent
  ]
})
export class AdminModule { }
