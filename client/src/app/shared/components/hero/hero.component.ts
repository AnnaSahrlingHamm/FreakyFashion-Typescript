import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type HeroSlide = {
  imgSmall: string;   // 500w
  imgLarge: string;   // större
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaLink?: string | any[];
  alt: string;
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = [
    {
      imgSmall: 'assets/images/nonProductImgs/hero/hero500w.jpg',
      imgLarge: 'assets/images/nonProductImgs/hero/hero_large.jpg',
      heading: 'Freaky Fashion',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur delectus fuga officia.',
      alt: 'Modell i lång kappa'
    },
    {
      imgSmall: 'assets/images/nonProductImgs/hero/hero2-500w-brian-wangenheim-CIfJMx4qKRY-unsplash.jpg',
      imgLarge: 'assets/images/nonProductImgs/hero/hero2-large-brian-wangenheim-CIfJMx4qKRY-unsplash.jpg',
      heading: 'Freaky Fashion',
      body: '…sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
     /*  ctaLabel: 'Se kappor',
      ctaLink: ['/search'],  */// t.ex. { q: 'kappa' } via egen sökkomponent om du vill
      alt: 'Modell i tube top'
    }
  ];

  index = 0;
  private timerId: any = null;
  private readonly intervalMs = 6000;

  get current(): HeroSlide { return this.slides[this.index]; }

  ngOnInit(): void { this.start(); }
  ngOnDestroy(): void { this.stop(); }

  next(): void { this.index = (this.index + 1) % this.slides.length; }
  prev(): void { this.index = (this.index - 1 + this.slides.length) % this.slides.length; }

  start(): void {
    if (this.timerId) return;
    this.timerId = setInterval(() => this.next(), this.intervalMs);
  }
  stop(): void {
    if (!this.timerId) return;
    clearInterval(this.timerId);
    this.timerId = null;
  }
}
