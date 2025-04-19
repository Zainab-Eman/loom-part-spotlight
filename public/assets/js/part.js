
// JavaScript file for the part detail page

// Load part details
async function loadPartDetails() {
  const partId = getUrlParam('id');
  const partDetailContainer = document.getElementById('part-detail-container');
  const categoryBreadcrumb = document.getElementById('category-breadcrumb');
  const partBreadcrumb = document.getElementById('part-breadcrumb');
  
  if (!partId) {
    partDetailContainer.innerHTML = displayError('No part ID specified.');
    return;
  }
  
  try {
    // Fetch part details
    const response = await fetch(`${API_URL}/parts/${partId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch part details');
    }
    
    const part = await response.json();
    
    // Update page title and breadcrumb
    document.title = `${part.name} - Shafiq Engineering Works`;
    partBreadcrumb.textContent = part.name;
    
    // Update category breadcrumb with link
    categoryBreadcrumb.innerHTML = `<a href="category.html?id=${part.category}">${part.categoryName || 'Category'}</a>`;
    
    // Prepare images for the slider
    const allImages = [part.mainImage, ...(part.additionalImages || [])].filter(Boolean);
    
    // Create HTML for part details
    partDetailContainer.innerHTML = `
      <div class="row">
        <div class="col-md-6 mb-4">
          ${
            allImages.length > 0 
            ? `
              <div class="swiper part-images-swiper">
                <div class="swiper-wrapper">
                  ${allImages.map(image => `
                    <div class="swiper-slide">
                      <img src="${image}" alt="${part.name}" class="img-fluid">
                    </div>
                  `).join('')}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            `
            : `<div class="part-image-main d-flex align-items-center justify-content-center bg-light rounded">
                <p class="text-muted">No image available</p>
               </div>`
          }
        </div>
        
        <div class="col-md-6">
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h1 class="display-6 fw-bold mb-0">${part.name}</h1>
              ${part.label ? `<span class="badge bg-warning">${part.label}</span>` : ''}
            </div>
            <p class="text-muted">Part ID: ${part.id}</p>
          </div>
          
          <div class="mb-4">
            <h4>Description</h4>
            <p>${part.description || 'No description available.'}</p>
          </div>
          
          <div class="d-flex gap-3 mt-4">
            <a href="https://wa.me/923001234567?text=I'm%20interested%20in%20part%20${part.id}%20(${part.name})" class="btn btn-success" target="_blank">
              <i class="fab fa-whatsapp me-2"></i> Inquire via WhatsApp
            </a>
            <a href="contact.html" class="btn btn-outline-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Initialize Swiper if there are images
    if (allImages.length > 0) {
      new Swiper('.part-images-swiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: allImages.length > 1,
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    partDetailContainer.innerHTML = displayError(error.message || 'Failed to load part details. Please try again later.');
  }
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', function() {
  loadPartDetails();
});
