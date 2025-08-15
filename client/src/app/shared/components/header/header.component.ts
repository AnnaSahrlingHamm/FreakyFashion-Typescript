import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // för ngIf/ngFor/ngClass
import { FormsModule } from '@angular/forms'; // för ngModel
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm = '';
}
