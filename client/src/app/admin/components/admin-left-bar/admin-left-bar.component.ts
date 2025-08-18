import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-admin-left-bar',
  templateUrl: './admin-left-bar.component.html',
  styleUrls: ['./admin-left-bar.component.css']
})
export class AdminLeftBarComponent {}

