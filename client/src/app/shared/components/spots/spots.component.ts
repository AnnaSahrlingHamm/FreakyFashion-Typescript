import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Spot = { src: string; alt: string; to?: any[]; };

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.css']
})
export class SpotsComponent implements OnInit {
  readonly captions = ['Buy!', 'Our!', 'Clothes!'];

  spots: Spot[] = [
    { src: 'assets/images/nonProductImgs/spots/eye300w.jpg',    alt: 'Närbild öga',         to: ['/search'] },
    { src: 'assets/images/nonProductImgs/spots/shoe300w.jpg',   alt: 'Sko i profil',        to: ['/search'] },
    { src: 'assets/images/nonProductImgs/spots/cat300w.jpg',    alt: 'Katt med mössa',      to: ['/search'] },
    { src: 'assets/images/nonProductImgs/spots/apple-louis-hansel-MardkT836BU-unsplash.jpg', alt: 'Äpple mot turkos bakgrund', to: ['/search'] },
    { src: 'assets/images/nonProductImgs/spots/oldlady-danie-franco-o1PKM7-8AH4-unsplash .jpg', alt: 'Leende gammal dam', to: ['/search'] },
    { src: 'assets/images/nonProductImgs/spots/dog-kyle-smith-SIZ66vF4FKA-unsplash.jpg', alt: 'Hund med stora öron', to: ['/search'] },
  ];

  topSpots: Spot[] = [];

  ngOnInit(): void {
    this.topSpots = this.shuffle(this.spots).slice(0, 3);
  }

  private shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
