import Database from 'better-sqlite3';

// Öppna (eller skapa) databasen
const db = new Database('freakyfashion.db');

// Rensa tabellen om den redan finns
db.exec(`
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    item TEXT,
    brand TEXT,
    description TEXT,
    price TEXT,
    slug TEXT,
    sku TEXT,
    created_at TEXT
);
`);

// Förbered insert
const insert = db.prepare(`
INSERT INTO products (image, item, brand, description, price, slug, sku, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

// Produktdata
const products = [
    ['woman-coat-4.webp', 'Färgstark kappa', 'Fear of God', 'Med färg kommer personlighet!', '4000', 'fargstark-kappa-fear', 'TSH019', '07/08'],
    ['woman-coat-3.webp', 'Färgstark kappa', 'Palm Angels', 'Stilig och märkbar!', '3400', 'fargstark-kappa-palm', 'TSH018', '22/08'],
    ['woman-coat-2.webp', 'Färgstark kappa', 'OffWhite', 'Lys ikapp!', '2900', 'fargstark-kappa-off', 'TSH017', '28/08'],
    ['woman-coat-1.webp', 'Färgstark kappa', 'Stone Island', 'Var en vandrande lavalampa!', '3000', 'fargstark-kappa-stone', 'TSH016', '13/08'],
    ['tshirt4.webp', 'T-shirt med tryck', 'Champion', 'Du kommer aldrig vilja ha något annat!', '130', 't-shirt-champion', 'TSH015', '19/08'],
    ['tshirt3.webp', 'T-shirt med tryck', 'Tommy Hilfiger', 'Med den här är du aldrig felklädd.', '300', 't-shirt-tommy-hilfiger', 'TSH014', '11/08'],
    ['tshirt2.webp', 'T-shirt med tryck', 'Balmain', 'Stilren och lyxig bomull.', '120', 't-shirt-balmain', 'TSH013', '14/08'],
    ['tshirt1.webp', 'T-shirt med tryck', 'Armani', 'Minimalistisk och elegant.', '140', 't-shirt-armani', 'TSH012', '19/08'],
    ['tracksuit4.webp', 'Färgstark träningsoverall', 'Versace', 'Låt alla veta att du finns!', '2100', 'fargstark-traningsoverall-versace', 'TSH011', '08/08'],
    ['tracksuit3.webp', 'Färgstark träningsoverall', 'Gucci', 'Svettas aldrig igen! 20% mer komfort.', '2600', 'fargstark-traningsoverall-gucci', 'TSH010', '21/08'],
    ['tracksuit2.webp', 'Färgstark träningsoverall', 'Calvin Klein', 'Bekväm och lysande!', '1930', 'fargstark-traningsoverall-calvin', 'TSH009', '27/08'],
    ['tracksuit1.webp', 'Färgstark träningsoverall', 'Levis', 'Orsaka trafikolyckor på löpbandet!', '3200', 'fargstark-traningsoverall-levis', 'TSH008', '01/08'],
    ['red-black-blue-suit.webp', 'Röd svart och blå kostym', 'Hugo Boss', 'Få dem att gråta. 100% stil.', '4500', 'rod-svart-bla-kostym-hugo', 'TSH007', '03/08'],
    ['pink-blue-suit.webp', 'Rosa och blå kostym', 'Under Armour', 'För partychefen!', '3200', 'rosa-bla-kostym-under', 'TSH006', '03/08'],
    ['orange-blue-suit.webp', 'Orange och blå kostym', 'Lacoste', 'Gör dig till någon annan.', '2700', 'orange-bla-kostym-lacoste', 'TSH005', '16/08'],
    ['grey-purple-suit.webp', 'Grå och lila kostym', 'Reebok', 'Slående kostym för den modige.', '3120', 'gra-lila-kostym-reebok', 'TSH004', '21/08'],
    ['coral-pink-suit.webp', 'Korall och rosa kostym', 'Puma', 'Som ett andra skinn.', '1875', 'korall-rosa-kostym-puma', 'TSH003', '24/08'],
    ['coral-blue-suit.webp', 'Korall och blå kostym', 'Adidas', 'Underbart bekväm kostym.', '2300', 'korall-bla-kostym-adidas', 'TSH002', '13/08'],
    ['black-orange-suit.webp', 'Svart och orange kostym', 'Balmain', 'Skön och stilig kostym i toppklass.', '1999', 'svart-orange-kostym-balmain', 'TSH001', '21/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Miu miu', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-miu-miu', 'HHH888', '18/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Balenciaga', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-balenciaga', 'GGG777', '23/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Dior', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-dior', 'FFF666', '05/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Bebe', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-bebe', 'EEE555', '10/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Chanel', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-chanel', 'DDD444', '27/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'Carhartt', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-carhartt', 'CCC333', '03/08'],
    ['blacktshirt500w.jpg', 'Svart t-shirt', 'HM', 'Lorem, ipsum dolor sit amet.', '199', 'svart-t-shirt-hm', 'BBB222', '06/08'],
    ['https://placehold.co/500x500', 'Vit t-shirt', 'Gucci', 'Jättevit', '1539kr', 'vit-t-shirt', 'ABC123', '03/08']
];

// Sätt in alla produkter
const insertMany = db.transaction((products) => {
    for (const product of products) {
        insert.run(product);
    }
});

insertMany(products);

console.log('✅ Databasen freakyfashion.db har skapats och fyllts med produkter!');
