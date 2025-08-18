import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGlobeAmericas, faPlane, faShieldAlt, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-links',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './icon-links.component.html',
  styleUrls: ['./icon-links.component.css']
})
export class IconLinksComponent {
  constructor(private library: FaIconLibrary) {
    this.library.addIcons(faGlobeAmericas, faPlane, faShieldAlt, faSmile);
  }
}
