
import React from 'react';

const WorkshopGallery = () => {
  const images = [
    {
      src: "/assets/images/workshop/engineer1.jpg",
      alt: "Engineer working on a loom machine part",
      caption: "Precision engineering of loom components"
    },
    {
      src: "/assets/images/workshop/machinist1.jpg",
      alt: "Machinist operating a lathe",
      caption: "CNC machining for exact specifications"
    },
    {
      src: "/assets/images/workshop/assembly1.jpg",
      alt: "Parts assembly process",
      caption: "Careful assembly of complex components"
    },
    {
      src: "/assets/images/workshop/testing1.jpg",
      alt: "Quality testing of finished parts",
      caption: "Rigorous quality control before shipping"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Workshop in Action</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-md group">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopGallery;
