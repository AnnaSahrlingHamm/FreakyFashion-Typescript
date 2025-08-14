import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Se till att du har denna

// Dina komponenter:
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductCarouselComponent } from './shared/components/product-carousel/product-carousel.component';
import { NotFoundComponent } from './search/not-found/not-found.component';
import { AdminModule } from './admin/admin.module';
// Lägg till fler här när du bygger vidare

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductCarouselComponent,
    NotFoundComponent
    // Lägg till andra komponenter här
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
