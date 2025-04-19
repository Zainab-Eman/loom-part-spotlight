
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
let db;
async function setupDatabase() {
  db = await open({
    filename: path.join(__dirname, 'db/parts.db'),
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS parts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      main_image TEXT,
      label TEXT,
      FOREIGN KEY (category) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS part_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      part_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      FOREIGN KEY (part_id) REFERENCES parts(id)
    );
  `);

  // Seed some initial data if tables are empty
  const categoryCount = await db.get('SELECT COUNT(*) as count FROM categories');
  if (categoryCount.count === 0) {
    await seedData();
  }
}

async function seedData() {
  // Insert categories
  const categories = [
    { id: 'loom', name: 'Loom Machine Parts', description: 'Spare parts for various loom machines', image: '/assets/images/categories/loom.jpg' },
    { id: 'feeder', name: 'Feeder Machine Parts', description: 'Reliable parts for industrial feeders', image: '/assets/images/categories/feeder.jpg' },
    { id: 'motor', name: 'Electric Motors', description: 'High performance motors for industrial machines', image: '/assets/images/categories/motor.jpg' },
    { id: 'bearings', name: 'Bearings & Bushings', description: 'Long-lasting bearings for all applications', image: '/assets/images/categories/bearings.jpg' }
  ];

  // Insert parts
  const parts = [
    { 
      id: 'LM001', 
      name: 'Thread Guide', 
      category: 'loom', 
      description: 'High-quality thread guide suitable for loom machines. Made from durable stainless steel with ceramic insert to reduce friction and extend thread life. Compatible with most industrial loom models.', 
      main_image: '/assets/images/parts/thread-guide-main.jpg', 
      label: 'New' 
    },
    { 
      id: 'LM002', 
      name: 'Heddle Frame', 
      category: 'loom', 
      description: 'Sturdy heddle frame manufactured from lightweight aluminum. Features precision engineering for smooth operation and reduced maintenance. Available in multiple sizes to fit various loom models.', 
      main_image: '/assets/images/parts/heddle-frame-main.jpg', 
      label: 'Popular' 
    },
    { 
      id: 'FM001', 
      name: 'Feed Roller Assembly', 
      category: 'feeder', 
      description: 'Complete feed roller assembly with hardened steel rollers. Provides consistent material feeding with minimal slippage. Suitable for high-speed production environments.', 
      main_image: '/assets/images/parts/feed-roller-main.jpg', 
      label: '' 
    },
    { 
      id: 'MT001', 
      name: '2HP Industrial Motor', 
      category: 'motor', 
      description: 'Heavy-duty 2HP electric motor designed for continuous operation. Features thermal protection, sealed bearings, and high torque output. Compatible with standard mounting configurations.', 
      main_image: '/assets/images/parts/motor-2hp-main.jpg', 
      label: 'Best Seller' 
    },
    { 
      id: 'BR001', 
      name: 'Precision Bearing Set', 
      category: 'bearings', 
      description: 'Set of precision ball bearings manufactured to strict tolerances. Includes inner and outer races, ball cage assembly, and dust seals. Suitable for high-speed and high-load applications.', 
      main_image: '/assets/images/parts/bearing-set-main.jpg', 
      label: 'New' 
    }
  ];

  // Insert additional images
  const partImages = [
    { part_id: 'LM001', image_url: '/assets/images/parts/thread-guide-angle.jpg' },
    { part_id: 'LM001', image_url: '/assets/images/parts/thread-guide-close.jpg' },
    { part_id: 'LM002', image_url: '/assets/images/parts/heddle-frame-side.jpg' },
    { part_id: 'FM001', image_url: '/assets/images/parts/feed-roller-detail.jpg' },
    { part_id: 'FM001', image_url: '/assets/images/parts/feed-roller-assembly.jpg' },
    { part_id: 'MT001', image_url: '/assets/images/parts/motor-2hp-side.jpg' },
    { part_id: 'MT001', image_url: '/assets/images/parts/motor-2hp-mount.jpg' },
    { part_id: 'BR001', image_url: '/assets/images/parts/bearing-set-exploded.jpg' }
  ];

  // Insert into database
  const insertCategory = await db.prepare('INSERT INTO categories (id, name, description, image) VALUES (?, ?, ?, ?)');
  for (const category of categories) {
    await insertCategory.run(category.id, category.name, category.description, category.image);
  }
  await insertCategory.finalize();

  const insertPart = await db.prepare('INSERT INTO parts (id, name, category, description, main_image, label) VALUES (?, ?, ?, ?, ?, ?)');
  for (const part of parts) {
    await insertPart.run(part.id, part.name, part.category, part.description, part.main_image, part.label);
  }
  await insertPart.finalize();

  const insertPartImage = await db.prepare('INSERT INTO part_images (part_id, image_url) VALUES (?, ?)');
  for (const image of partImages) {
    await insertPartImage.run(image.part_id, image.image_url);
  }
  await insertPartImage.finalize();
}

// API Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.all('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/parts', async (req, res) => {
  try {
    const { category } = req.query;
    let parts;
    
    if (category) {
      parts = await db.all('SELECT * FROM parts WHERE category = ?', category);
    } else {
      parts = await db.all('SELECT * FROM parts');
    }
    
    res.json(parts);
  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
});

app.get('/api/parts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const part = await db.get('SELECT * FROM parts WHERE id = ?', id);
    
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    
    // Get additional images
    const additionalImages = await db.all('SELECT image_url FROM part_images WHERE part_id = ?', id);
    
    // Format response
    const response = {
      ...part,
      additionalImages: additionalImages.map(img => img.image_url)
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching part details:', error);
    res.status(500).json({ error: 'Failed to fetch part details' });
  }
});

// Server initialization
async function startServer() {
  try {
    await setupDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();

module.exports = app;
