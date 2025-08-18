import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  selector: 'app-icon-links',
  templateUrl: './icon-links.component.html',
  styleUrls: ['./icon-links.component.css']
})
export class IconLinksComponent {}
