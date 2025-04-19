
# Shafiq Engineering Works - Spare Parts Catalog

A complete catalog website for Shafiq Engineering Works, a workshop that manufactures and sells spare parts for industrial machines.

## Project Structure

```
project-root/
├── public/                # Static frontend (HTML/CSS/JS)
│   ├── index.html        # Home page
│   ├── category.html     # Category listing page
│   ├── part.html         # Part detail page
│   ├── contact.html      # Contact page
│   └── assets/           # Images, CSS, JS
├── server/               # Node.js backend
│   ├── index.js          # Main server file
│   └── db/               # SQLite database
└── README.md             # This file
```

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Libraries**:
  - Swiper.js (for image sliders)
  - Font Awesome (for icons)

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shafiq-engineering-works.git
   cd shafiq-engineering-works
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Deployment

### Deploying the Frontend (Netlify/Vercel)

1. Create a production build:
   ```
   npm run build
   ```

2. Upload the `public` directory to Netlify/Vercel or use their CLI tools.

3. Configure environment variables in your hosting platform:
   - Set `API_URL` to point to your deployed backend URL

### Deploying the Backend (Render.com/Railway)

1. Push your code to GitHub.

2. Connect your GitHub repository to Render.com or Railway.

3. Configure the following settings:
   - Build command: `npm install`
   - Start command: `node server/index.js`
   - Environment variables:
     - `PORT`: 5000 (or let the platform assign it)

4. Deploy the application.

## API Endpoints

- `GET /api/categories` - Get all spare part categories
- `GET /api/parts?category=loom` - Get parts by category
- `GET /api/parts/:id` - Get detailed information about a specific part

## Features

- Responsive design that works on all devices
- Dynamic loading of categories and parts from the database
- Image slider for part images
- Contact form with validation
- WhatsApp integration for direct inquiries

## Customization

- Update sample data in `server/index.js` with your actual product information
- Replace placeholder images in `public/assets/images/` with real product images
- Update contact information in HTML files
- Modify styles in `public/assets/css/style.css` to match your branding

## License

This project is licensed under the MIT License - see the LICENSE file for details.
