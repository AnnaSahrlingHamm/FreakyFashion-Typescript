import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  hero500w = 'assets/images/nonProductImgs/hero500w.jpg';
  heroLarge = 'assets/images/nonProductImgs/hero_large.jpg';
}
