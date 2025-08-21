import { Routes } from '@angular/router';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './search/pages/search-results/search-results.component';

// Shared / Public
import { ProductDetailsComponent } from './products/product-details/product-details.component';

// Admin
import { ProductTableComponent } from './admin/components/product-table/product-table.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';


export const routes: Routes = [
  
  { path: '', component: HomeComponent },

  { path: 'search', component: SearchResultsComponent },

  { path: 'products/:id', component: ProductDetailsComponent }, 
  // :id = dynamisk route för enskild produkt

  
  {
    path: 'admin',
    children: [
      { path: 'products', component: ProductTableComponent },
      { path: 'products/add-product', component: AddProductComponent }
    ]
  },

  // Fallback (om ingen route matchar)
  { path: '**', redirectTo: '' }
];
