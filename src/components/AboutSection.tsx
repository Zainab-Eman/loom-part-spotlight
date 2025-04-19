
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">About Our Workshop</h2>
            <p className="text-gray-700 mb-4">
              Located in the industrial heart of Faisalabad, Pakistan, our mechanical workshop specializes in manufacturing high-quality spare parts for industrial machines. With decades of experience, we've built a reputation for reliability and precision.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small local operation has grown into a trusted supplier for factories across Pakistan. Our mission is to expand into national and international industrial markets while maintaining the quality and craftsmanship that define our legacy.
            </p>
            <p className="text-gray-700 mb-6">
              Our team of skilled engineers and technicians combine traditional expertise with modern manufacturing techniques to deliver parts that meet international standards.
            </p>
            <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-600">
              <p className="text-blue-800 font-medium">
                "Precision engineering, reliable parts, and customer satisfaction have been our guiding principles since our founding."
              </p>
            </div>
          </div>
          <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-full">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Workshop Video"
                className="absolute inset-0 w-full h-full min-h-[300px]"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
