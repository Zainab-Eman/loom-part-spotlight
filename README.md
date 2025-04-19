
# Industrial Spare Parts Catalog

A full-stack web application for a mechanical workshop in Faisalabad, Pakistan that manufactures and sells spare parts for industrial machines like loom machines and feeder machines.

## Project Structure

```
project-root/
├── src/                   # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   └── ...
└── server/                # Node.js backend
    ├── db/                # SQLite database
    └── index.js           # Express API
```

## Features

- Responsive, modern user interface
- Dynamic parts catalog with categories
- Detailed part views with image slider
- Contact form with validation
- WhatsApp integration for easy communication
- Backend API for parts data

## Technology Stack

- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: SQLite

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd industrial-spare-parts-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Start frontend development server
   npm run dev
   
   # In a separate terminal, start the backend server
   node src/server/index.js
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application running.

## Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Create a new site on Netlify or Vercel**
   
   For Netlify:
   - Connect your GitHub repository
   - Set build command to `npm run build`
   - Set publish directory to `dist`
   
   For Vercel:
   - Import your GitHub repository
   - Vercel will automatically detect React settings

2. **Environment Variables**
   
   Set the following environment variable:
   - `VITE_API_URL`: URL of your deployed backend API

### Backend Deployment (Render.com)

1. **Create a new Web Service on Render.com**
   - Connect your GitHub repository
   - Set build command to `npm install`
   - Set start command to `node src/server/index.js`

2. **Environment Variables**
   
   Set the following environment variables if needed:
   - `PORT`: The port your server will run on (default: 5000)
   - `NODE_ENV`: Set to `production`

### Database Considerations

The application uses SQLite by default, which stores the database as a file. For production:

- The SQLite database will be created on the server when the application starts
- Initial data is seeded automatically if the database is empty
- To update or manage data, you can:
  - Access the Render.com shell to run SQL commands
  - Implement an admin panel (not included in this version)

## Adding New Parts or Categories

To add new parts or categories, you'll need to:

1. Access your database through your backend host's shell
2. Run SQL INSERT statements to add new records
3. New data will appear in the frontend automatically

## Customization

- **Images**: Place your images in the public/assets/images directory
- **Contact Details**: Update contact information in the Footer and Contact components
- **Colors**: Modify the color scheme in the TailwindCSS config or component classes

## License

[MIT License](LICENSE)

## Support

For questions or assistance, please contact [Your Contact Information].
