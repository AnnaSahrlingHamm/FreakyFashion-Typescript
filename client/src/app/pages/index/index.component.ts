import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  featuredProducts: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    document.title = 'Freaky Fashion';
    console.log('Test - IndexComponent renderas');

    this.fetchFeaturedProducts();
  }

  fetchFeaturedProducts(): void {
    this.http.get<any[]>('http://localhost:8000/api/products/featured')
      .subscribe({
        next: (data) => {
          this.featuredProducts = data;
        },
        error: (err) => {
          this.error = 'Något gick fel vid hämtning av produkter';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
