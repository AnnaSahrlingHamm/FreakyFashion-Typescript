import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // behövs för ngClass

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
