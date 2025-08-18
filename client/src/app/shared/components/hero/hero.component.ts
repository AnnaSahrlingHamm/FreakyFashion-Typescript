import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  hero500w = 'assets/images/nonProductImgs/hero500w.jpg';
  heroLarge = 'assets/images/nonProductImgs/hero_large.jpg';
}
