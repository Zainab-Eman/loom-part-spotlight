
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            High-Quality Industrial Spare Parts
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Manufacturing and supplying precision parts for loom machines, feeder machines, and industrial equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/parts" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 text-center"
            >
              Explore Parts
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-8 rounded-md transition duration-300 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
