import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';  

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Öppna databasen
const db = new Database('./freakyfashion.db', { verbose: console.log });

// Hämta alla produkter ELLER sök via ?q=
app.get('/api/products', (req, res) => {
  try {
    const q = req.query.q?.toString().trim();
    let products;

    if (q) {
      const like = `%${q}%`;
      // OBS: kolumnen heter 'item' (inte 'name')
      products = db
        .prepare('SELECT * FROM products WHERE item LIKE ? OR description LIKE ?')
        .all(like, like);
    } else {
      products = db.prepare('SELECT * FROM products').all();
    }

    res.json(products);
  } catch (err) {
    console.error('Fel i /api/products:', err);
    res.status(500).json({ error: 'Kunde inte hämta produkter' });
  }
});

// Hämta endast featured (exempel: första 8 produkterna)
app.get('/api/products/featured', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products LIMIT 8').all();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta featured produkter' });
  }
});

// Hämta en produkt via slug
app.get('/api/products/:slug', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produkten hittades inte' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta produkt' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    console.log('POST /api/products body:', req.body);
    const { item, description = '', image, brand = '', sku, price } = req.body;

    if (!item || !image || !sku || !price) {
      return res.status(400).json({ error: 'item, image, sku och price krävs' });
    }

    // enkel slugifiering
    const slug = String(item)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // created_at i ISO (du kan använda annat format om du vill)
    const created_at = new Date().toISOString();

    // OBS: kolumnordning och antal ? matchar exakt
    const stmt = db.prepare(`
      INSERT INTO products (image, item, brand, description, price, slug, sku, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      image,
      item,
      brand,
      description,
      String(price), 
      slug,
      sku,
      created_at
    );

    const created = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/products error:', err);
    res.status(500).json({ error: 'Kunde inte lagra produkt' });
  }
});


app.delete('/api/products/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const info = stmt.run(req.params.id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Produkten hittades inte' });
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte ta bort produkt' });
  }
});

// Starta servern (EN gång)
app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});

