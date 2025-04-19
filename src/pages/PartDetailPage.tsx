
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api'
  : 'http://localhost:5000/api';

const PartDetailPage = () => {
  const { partId } = useParams();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/parts/${partId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch part details');
        }
        
        const data = await response.json();
        setPart(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (partId) {
      fetchPartDetails();
    }
  }, [partId]);

  // Prepare all images for the slider
  const allImages = part ? [part.main_image, ...(part.additionalImages || [])] : [];

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
          ) : part ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div>
                  {allImages.length > 0 ? (
                    <ImageSlider images={allImages} />
                  ) : (
                    <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold text-blue-900">{part.name}</h1>
                    {part.label && (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {part.label}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6">Part ID: <span className="font-medium">{part.id}</span></p>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 text-blue-800">Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {part.description}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex space-x-4">
                      <a 
                        href={`https://wa.me/923001234567?text=I'm%20interested%20in%20part%20${part.id}%20(${part.name})`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center justify-center space-x-2 transition"
                      >
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        <span>Inquire via WhatsApp</span>
                      </a>
                      <Link 
                        to="/contact" 
                        className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md flex items-center justify-center transition"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl text-red-600 mb-4">Part Not Found</h2>
              <p className="text-gray-700">The part you are looking for does not exist.</p>
              <Link to="/" className="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded">
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartDetailPage;
