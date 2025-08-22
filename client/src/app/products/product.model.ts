export interface Product {
  id: number;                // unik identifierare
  slug?: string;             // URL-slug för produkten
  item?: string;              // produktnamn
  description?: string;      // beskrivning
  image?: string;            // bild-URL
  brand?: string;            // märke
  sku?: string;              // SKU-kod
  price?: number;            // pris i SEK
  created_at?: string;       // datum när produkten skapades (ISO-format)
  published?: string;        // publiceringsdatum (kan vara omformaterat)
}
