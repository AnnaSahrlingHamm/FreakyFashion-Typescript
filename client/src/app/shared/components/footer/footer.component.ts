import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type LinkItem = { label: string; to?: string; href?: string };

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeIndex: number | null = null;

  // Samma innehåll som din gamla footer
  shopping: LinkItem[] = [
    { label: 'Vinterjackor', to: '/category/vinterjackor' },
    { label: 'Pufferjackor', to: '/category/pufferjackor' },
    { label: 'Kappor', to: '/category/kappor' },
    { label: 'Trenchcoats', to: '/category/trenchcoats' },
  ];

  minaSidor: LinkItem[] = [
    { label: 'Mina ordrar', to: '/orders' },
    { label: 'Mitt konto', to: '/account' },
  ];

  kundtjanst: LinkItem[] = [
    { label: 'Returnpolicy', to: '/returns' },
    { label: 'Integritetspolicy', to: '/privacy' },
  ];

    currentYear = new Date().getFullYear();

    toggleAccordion(i: number): void {
    this.activeIndex = this.activeIndex === i ? null : i; 
  }
}
