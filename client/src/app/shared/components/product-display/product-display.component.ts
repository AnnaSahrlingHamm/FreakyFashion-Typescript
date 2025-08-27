import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-display',
  imports: [CommonModule, RouterModule, ProductCardComponent], // ⬅️ VIKTIGT
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() products: any[] = [];


}