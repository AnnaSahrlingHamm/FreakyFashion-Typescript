import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm = '';

  faHeart = faHeart;
  faShoppingBasket = faShoppingBasket;

  constructor(private router: Router) {}

  onSearch(): void {
    const query = this.searchTerm.trim();
    if (!query) return;

    console.log('Söker efter:', query);

    // Navigera till /search?q=searchTerm
    this.router.navigate(['/search'], { queryParams: { q: query } });
    
    // Rensa fältet (valfritt)
    this.searchTerm = '';
  }
}
