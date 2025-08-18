// generate-product-images.js
import fs from "fs";
import path from "path";

const imagesDir = path.resolve("src/assets/images");
const outputFile = path.resolve("src/app/products/product-images.ts");

// Filtrera fram endast .webp
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith(".webp"));

/**
 * Objektstruktur:
 * {
 *   produkt1: { small: "...", medium: "...", large: "..." },
 *   produkt2: { small: "...", medium: "...", large: "..." }
 * }
 */
const groupedImages = {};

files.forEach(file => {
  const baseName = file.replace(".webp", "");
  const productKey = baseName.replace(/_\d+w$/, ""); // ta bort _300w osv.

  if (!groupedImages[productKey]) {
    groupedImages[productKey] = {
      small: "assets/images/placeholder.webp",
      medium: "assets/images/placeholder.webp",
      large: "assets/images/placeholder.webp"
    };
  }

  if (baseName.endsWith("_300w")) {
    groupedImages[productKey].small = `assets/images/${file}`;
  } else if (baseName.endsWith("_400w")) {
    groupedImages[productKey].medium = `assets/images/${file}`;
  } else if (baseName.endsWith("_500w")) {
    groupedImages[productKey].large = `assets/images/${file}`;
  } else {
    // fallback-bild utan suffix
    groupedImages[productKey].medium = `assets/images/${file}`;
  }
});

// Generera TypeScript-kod
let content = `// Auto-genererad fil — ändra inte manuellt!
// Kör "npm run generate:images" för att uppdatera
export const productImages: Record<string, { small: string; medium: string; large: string }> = {\n`;

for (const [key, variants] of Object.entries(groupedImages)) {
  content += `  "${key}": ${JSON.stringify(variants)},\n`;
}

content += "};\n";

fs.writeFileSync(outputFile, content, "utf-8");

console.log(`✅ product-images.ts uppdaterad med ${Object.keys(groupedImages).length} produkter.`);
