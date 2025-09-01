/* import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Se till att du har denna


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { SpotsComponent } from './shared/components/spots/spots.component';
import { NotFoundComponent } from './search/not-found/not-found.component';
import { AdminModule } from './admin/admin.module';
import { FooterComponent } from './shared/components//footer/footer.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { SearchResultsComponent } from './search/pages/search-results/search-results.component';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';
import { AllProductsComponent } from './admin/pages/all-products/all-products.component';
import { IconLinksComponent } from './shared/components/icon-links/icon-links.component';


// Lägg till fler här när du bygger vidare

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IconLinksComponent,
    NavBarComponent,
    HeroComponent,
    SpotsComponent,
    ProductCardComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    SearchResultsComponent,
    HomeComponent,
    AddProductComponent,
    AllProductsComponent

    // Lägg till andra komponenter här
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //HttpClientModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 */