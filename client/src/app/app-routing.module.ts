import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { SearchResultsComponent } from './search/pages/search-results/search-results.component';
import { NotFoundComponent } from './search/not-found/not-found.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';
import { AllProductsComponent } from './admin/pages/all-products/all-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin/all-products', component: AllProductsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
