import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { IconLinksComponent } from './shared/components/icon-links/icon-links.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet, HeaderComponent, NavBarComponent, IconLinksComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
