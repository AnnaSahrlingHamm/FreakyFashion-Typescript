import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  hero500w = 'assets/images/nonProductImgs/hero500w.jpg';
  heroLarge = 'assets/images/nonProductImgs/hero_large.jpg';
}
