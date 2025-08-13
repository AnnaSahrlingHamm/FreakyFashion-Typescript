import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  products: any[] = [];
  query: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q') || '';
      if (this.query) {
        this.fetchResults();
      }
    });
  }

  fetchResults(): void {
    this.isLoading = true;
    this.error = null;
    this.searchService.searchProducts(this.query).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Kunde inte hämta sökresultat.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

