
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api'
  : 'http://localhost:5000/api';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndParts = async () => {
      try {
        setLoading(true);
        
        // Fetch category details
        const categoryResponse = await fetch(`${API_URL}/categories`);
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categories = await categoryResponse.json();
        const currentCategory = categories.find(cat => cat.id === categoryId);
        
        if (!currentCategory) {
          throw new Error('Category not found');
        }
        
        setCategory(currentCategory);
        
        // Fetch parts for this category
        const partsResponse = await fetch(`${API_URL}/parts?category=${categoryId}`);
        if (!partsResponse.ok) {
          throw new Error('Failed to fetch parts');
        }
        
        const partsData = await partsResponse.json();
        setParts(partsData);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryAndParts();
    }
  }, [categoryId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <h2 className="text-2xl text-red-600 mb-4">Error</h2>
              <p className="text-gray-700">{error}</p>
              <Link to="/" className="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded">
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  {category?.name}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {category?.description}
                </p>
              </div>
              
              {parts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-700">No parts found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parts.map((part) => (
                    <Link 
                      key={part.id} 
                      to={`/part/${part.id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={part.main_image || "/assets/images/placeholder.jpg"} 
                          alt={part.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-blue-900">
                            {part.name}
                          </h3>
                          {part.label && (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              {part.label}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">Part ID: {part.id}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
