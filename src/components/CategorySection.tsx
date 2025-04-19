
import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/category/${category.id}`}
          className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={category.image || "/assets/images/placeholder.jpg"} 
              alt={category.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategorySection;
