// Här importerar vi det vi behöver från Angular och andra paket.
// import betyder att vi plockar in färdiga byggklossar.
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Här importeras en "produktbilder-tabell", som mappar filnamn till olika storlekar.
// T.ex. "woman-coat-4" → { small: "...", medium: "...", large: "..." }
import { productImages } from '../../../products/product-images';

// Vår egen "Product"-typ, så TypeScript vet vilka fält en produkt har.
import { Product } from '../../../products/product.model';

// Font Awesome – biblioteket vi använder för att visa hjärtikonen.
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// @Component är en "dekoration" (decorator). Den talar om för Angular
// att detta är en komponent och hur den ska kopplas ihop med HTML och CSS.
@Component({
  standalone: true,                     // "Standalone" betyder att den kan stå själv utan NgModule.
  selector: 'app-product-card',         // <app-product-card> blir HTML-taggen för den här komponenten.
  imports: [CommonModule, RouterModule, FontAwesomeModule], // Andra byggklossar vi behöver i HTML:en.
  templateUrl: './product-card.component.html', // HTML-filen
  styleUrls: ['./product-card.component.css']   // CSS-filen
})
// Här börjar själva klassen. All logik vi skriver här hör till den här komponenten.
export class ProductCardComponent implements OnChanges {
  // @Input betyder att föräldern kan skicka in data till den här komponenten.
  // I vårt fall skickas ett Product-objekt in, alltså en produkt.
  // "!" betyder "det här värdet kommer att finnas, jag lovar", för att slippa null-varningar.
  @Input() product!: Product;

  // När komponenten skapas får den en "ikonbibliotek"-instans.
  // Vi registrerar hjärt-ikonen så att vi kan använda <fa-icon> i HTML.
  constructor(library: FaIconLibrary) {
    library.addIcons(faHeart);
  }

  // Den här funktionen körs om man klickar på hjärtat.
  // preventDefault() stoppar länken från att navigera,
  // stopPropagation() stoppar klicket från att bubbla upp till föräldern.
  // (Annars hade hela kortet blivit klickat.)
  onHeartClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  // Startvärden för bilder: här används en placeholder (tom bild).
  // Den byts ut om vi hittar riktiga produktbilder.
  images = {
    small: '/assets/images/placeholder.webp',
    medium: '/assets/images/placeholder.webp',
    large:  '/assets/images/placeholder.webp'
  };

  // Angular kallar på ngOnChanges när en @Input ändras.
  // Här: när vi får in en produkt, kolla om den har en bild.
  ngOnChanges(): void {
    if (this.product?.image) {
      // Tar bort ".webp" från slutet för att få basnamnet.
      const base = this.product.image.replace('.webp', '');
      // Hämtar rätt bildstorlekar ur productImages-tabellen.
      // Om vi inte hittar något → behåll placeholder.
      this.images = productImages[base] || this.images;
    }
  }

  // En liten hjälpfunktion: om man skickar in en trasig sökväg
  // returnerar den alltid en giltig placeholder istället.
  getSafeImagePath(p: string) {
    return p || '/assets/images/placeholder.webp';
  }

  // Om en <img> misslyckas att laddas (error-event) → byt bild till placeholder.
  handleImageError(ev: Event) {
    const img = ev.target as HTMLImageElement; // "as HTMLImageElement" säger till TypeScript vilken typ det är.
    img.src = '/assets/images/placeholder.webp';
    img.srcset = '/assets/images/placeholder.webp';
  }

  // Några privata fält med "basväg" (prefix) och fallback.
  private readonly base = 'assets/images/';
  private readonly fallback = 'assets/images/placeholder.webp';

  // En annan variant för att bygga en säker sökväg till en bild.
  safeSrc(product: any): string {
    const raw = (product?.image ?? '').toString().trim();

    if (!raw) return this.fallback;            // ingen bild → fallback
    if (raw.startsWith('http')) return raw;    // om det redan är en webbadress
    if (raw.startsWith('assets/')) return raw; // om det redan pekar på assets/
    return this.base + raw;                    // annars: lägg till vår basväg
  }

  // När bilden laddats klart kan vi lägga till en CSS-klass
  // så vi kan göra en fade-in-effekt i CSS.
  onImageLoad(evt: Event) {
    const img = evt.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  // Kollar om produkten är "ny" (mindre än 30 dagar gammal).
  // TypeScript: vi hämtar created_at eller createdAt om det finns.
  isNewProduct(product: any): boolean {
    const createdRaw = product?.created_at ?? product?.createdAt;
    if (!createdRaw) return false;

    // Gör om text → Date-objekt i JavaScript
    const created = new Date(createdRaw);

    // Räknar skillnaden i dagar
    const days = (Date.now() - created.getTime()) / 86400000;

    // Returnerar true om det är < 30 dagar.
    return days < 30;
  }
}
