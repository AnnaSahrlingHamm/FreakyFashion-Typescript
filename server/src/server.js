import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// Öppna databasen
const db = new Database('./freakyfashion.db', { verbose: console.log });

// Hämta alla produkter
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (err) {
    console.error(err);
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

// Starta servern
app.listen(8000, () => {
  console.log('Server körs på http://localhost:8000');
});


app.get("api/tasks", (req, res) => {

    const tasks = [
        {id: 1, name: "Storstäda"},
        {id: 2, name: "Laga mat"},
    ];

    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})