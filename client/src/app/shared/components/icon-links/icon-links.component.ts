import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGlobeAmericas, faPlane, faShieldAlt, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-links',
  templateUrl: './icon-links.component.html',
  styleUrls: ['./icon-links.component.css']
})
export class IconLinksComponent {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faGlobeAmericas, faPlane, faShieldAlt, faSmile);
  }
}
