import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importera dina sidkomponenter:
import { IndexComponent } from './pages/index/index.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
//import { AddProductComponent } from './pages/admin/add-product/add-product.component';
//import { AllProductsComponent } from './pages/admin/all-products/all-products.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  //{ path: 'admin/products', component: AllProductsComponent },
  //{ path: 'admin/add-product', component: AddProductComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
