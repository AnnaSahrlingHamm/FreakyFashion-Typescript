export interface Product {
  id: number;
  item: string;               // obligatorisk
  image: string;              // t.ex. "woman-coat-4.webp" – obligatorisk
  price: number | string;     // din DB har TEXT → tillåt båda
  slug: string;               // obligatorisk

  brand?: string;
  description?: string;
  created_at?: string;
  sku?: string;
}
