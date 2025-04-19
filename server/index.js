
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
let db;

// Initialize database
async function initializeDatabase() {
  // Open database
  db = await open({
    filename: path.join(__dirname, 'db', 'spare_parts.db'),
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
      description TEXT,
      mainImage TEXT,
      category TEXT NOT NULL,
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

  // Insert sample data if tables are empty
  const categoriesCount = await db.get('SELECT COUNT(*) as count FROM categories');
  
  if (categoriesCount.count === 0) {
    // Insert sample categories
    const sampleCategories = [
      {
        id: 'loom',
        name: 'Loom Machine Parts',
        description: 'Spare parts for different models of loom machines including mechanical and electronic looms.',
        image: 'assets/images/categories/loom.jpg'
      },
      {
        id: 'feeder',
        name: 'Feeder Machine Parts',
        description: 'High-quality replacement parts for textile feeder machines to ensure optimal performance.',
        image: 'assets/images/categories/feeder.jpg'
      },
      {
        id: 'conveyor',
        name: 'Conveyor Belt Components',
        description: 'Components and spare parts for industrial conveyor belt systems used in textile manufacturing.',
        image: 'assets/images/categories/conveyor.jpg'
      }
    ];

    for (const category of sampleCategories) {
      await db.run(
        'INSERT INTO categories (id, name, description, image) VALUES (?, ?, ?, ?)',
        [category.id, category.name, category.description, category.image]
      );
    }

    // Insert sample parts
    const sampleParts = [
      {
        id: 'LM001',
        name: 'Thread Guide',
        description: 'High-quality thread guide suitable for loom machines. Made from durable steel for long-lasting performance. These precision-engineered guides ensure smooth thread movement and prevent tangling during operation.',
        mainImage: 'assets/images/parts/thread-guide.jpg',
        category: 'loom',
        label: 'New'
      },
      {
        id: 'LM002',
        name: 'Shuttle',
        description: 'Wooden shuttle for traditional loom machines. Hand-crafted from seasoned hardwood, these shuttles are balanced for optimal performance and reduced wear on threads.',
        mainImage: 'assets/images/parts/shuttle.jpg',
        category: 'loom',
        label: 'Popular'
      },
      {
        id: 'LM003',
        name: 'Reed',
        description: 'Standard reed for various loom models. Our reeds are manufactured to precise specifications with stainless steel dents that resist corrosion and maintain proper spacing.',
        mainImage: 'assets/images/parts/reed.jpg',
        category: 'loom',
        label: null
      },
      {
        id: 'FM001',
        name: 'Feed Wheel',
        description: 'Durable feed wheel for textile feeder machines. Engineered with precision-molded composite materials for consistent feeding rates and reduced fiber damage.',
        mainImage: 'assets/images/parts/feed-wheel.jpg',
        category: 'feeder',
        label: 'New'
      },
      {
        id: 'FM002',
        name: 'Tension Rod',
        description: 'Adjustable tension rod for feeder mechanisms. Made from high-grade aluminum with precision threading that allows for fine tension adjustments to accommodate different materials.',
        mainImage: 'assets/images/parts/tension-rod.jpg',
        category: 'feeder',
        label: null
      },
      {
        id: 'CB001',
        name: 'Roller Bearing',
        description: 'Industrial-grade roller bearings for conveyor systems. These sealed bearings feature double-row ball bearings that handle both radial and axial loads, ensuring smooth operation even under demanding conditions.',
        mainImage: 'assets/images/parts/roller-bearing.jpg',
        category: 'conveyor',
        label: 'Bestseller'
      }
    ];

    for (const part of sampleParts) {
      await db.run(
        'INSERT INTO parts (id, name, description, mainImage, category, label) VALUES (?, ?, ?, ?, ?, ?)',
        [part.id, part.name, part.description, part.mainImage, part.category, part.label]
      );
    }

    // Insert sample additional images
    const sampleAdditionalImages = [
      { part_id: 'LM001', image_url: 'assets/images/parts/thread-guide-side.jpg' },
      { part_id: 'LM001', image_url: 'assets/images/parts/thread-guide-top.jpg' },
      { part_id: 'LM002', image_url: 'assets/images/parts/shuttle-open.jpg' },
      { part_id: 'FM001', image_url: 'assets/images/parts/feed-wheel-close.jpg' },
      { part_id: 'FM001', image_url: 'assets/images/parts/feed-wheel-installed.jpg' }
    ];

    for (const image of sampleAdditionalImages) {
      await db.run(
        'INSERT INTO part_images (part_id, image_url) VALUES (?, ?)',
        [image.part_id, image.image_url]
      );
    }

    console.log('Sample data has been inserted.');
  }
}

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.all('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get parts by category
app.get('/api/parts', async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    
    const parts = await db.all('SELECT * FROM parts WHERE category = ?', [category]);
    res.json(parts);
  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
});

// Get single part with details
app.get('/api/parts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get part details
    const part = await db.get('SELECT p.*, c.name as categoryName FROM parts p JOIN categories c ON p.category = c.id WHERE p.id = ?', [id]);
    
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    
    // Get additional images
    const additionalImages = await db.all('SELECT image_url FROM part_images WHERE part_id = ?', [id]);
    
    // Combine part with additional images
    const partWithImages = {
      ...part,
      additionalImages: additionalImages.map(img => img.image_url)
    };
    
    res.json(partWithImages);
  } catch (error) {
    console.error('Error fetching part details:', error);
    res.status(500).json({ error: 'Failed to fetch part details' });
  }
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();

// Create placeholder directories for images if they don't exist
const directories = [
  path.join(__dirname, '..', 'public', 'assets', 'images'),
  path.join(__dirname, '..', 'public', 'assets', 'images', 'categories'),
  path.join(__dirname, '..', 'public', 'assets', 'images', 'parts'),
  path.join(__dirname, '..', 'public', 'assets', 'images', 'workshop'),
  path.join(__dirname, 'db')
];

const fs = require('fs');
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});
