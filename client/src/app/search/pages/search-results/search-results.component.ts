import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; 
//import { HeaderComponent } from '../../../shared/components/header/header.component';
//import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
//import { IconLinksComponent } from '../../../shared/components/icon-links/icon-links.component';
//import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { SearchResultsContainerComponent } from '../../pages/search-results-container/search-results-container.component';

@Component({
  standalone: true,
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    //HeaderComponent,
    //NavBarComponent,
    //IconLinksComponent,
    //FooterComponent,
    SearchResultsContainerComponent
  ]
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  count: number = 0;  // 🔥 nytt fält

  constructor(private route: ActivatedRoute) {} 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
    });
  }
}
