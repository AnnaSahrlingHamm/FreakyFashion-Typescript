import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, NgFor], // lägg till Angular-direktiv eller andra komponenter
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
