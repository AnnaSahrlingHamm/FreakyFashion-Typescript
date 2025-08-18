import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.css']
})
export class SpotsComponent {
  eyeImg = 'assets/images/nonProductImgs/eye300w.jpg';
  shoeImg = 'assets/images/nonProductImgs/shoe300w.jpg';
  catImg = 'assets/images/nonProductImgs/cat300w.jpg';

  preventDefault(event: Event): void {
    event.preventDefault();
  }
}
