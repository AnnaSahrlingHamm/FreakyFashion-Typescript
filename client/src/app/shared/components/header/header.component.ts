import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  handleSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.searchTerm.trim()) {
      const encodedQuery = encodeURIComponent(this.searchTerm);
      this.router.navigate(['/search'], { queryParams: { q: encodedQuery } });
    }
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }
}
