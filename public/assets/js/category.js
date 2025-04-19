
// JavaScript file for the category page

// Load category and its parts
async function loadCategoryAndParts() {
  const categoryId = getUrlParam('id');
  const categoryTitle = document.getElementById('category-title');
  const categoryDescription = document.getElementById('category-description');
  const categoryBreadcrumb = document.getElementById('category-breadcrumb');
  const partsContainer = document.getElementById('parts-container');
  
  if (!categoryId) {
    partsContainer.innerHTML = displayError('No category ID specified.');
    return;
  }
  
  try {
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
    
    // Update UI with category information
    categoryTitle.textContent = currentCategory.name;
    categoryDescription.textContent = currentCategory.description || 'No description available';
    categoryBreadcrumb.textContent = currentCategory.name;
    document.title = `${currentCategory.name} - Shafiq Engineering Works`;
    
    // Fetch parts for this category
    const partsResponse = await fetch(`${API_URL}/parts?category=${categoryId}`);
    
    if (!partsResponse.ok) {
      throw new Error('Failed to fetch parts');
    }
    
    const parts = await partsResponse.json();
    
    if (parts.length === 0) {
      partsContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info" role="alert">
            <i class="fas fa-info-circle me-2"></i> No parts found in this category.
          </div>
        </div>
      `;
      return;
    }
    
    partsContainer.innerHTML = '';
    
    parts.forEach(part => {
      const partCard = document.createElement('div');
      partCard.className = 'col-md-4 mb-4';
      partCard.innerHTML = `
        <div class="card part-card shadow h-100">
          ${part.label ? `<span class="badge bg-warning part-label">${part.label}</span>` : ''}
          <img src="${part.mainImage || 'assets/images/placeholder.jpg'}" class="card-img-top" alt="${part.name}">
          <div class="card-body">
            <h5 class="card-title">${part.name}</h5>
            <p class="card-text">Part ID: ${part.id}</p>
            <a href="part.html?id=${part.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      partsContainer.appendChild(partCard);
    });
    
  } catch (error) {
    console.error('Error:', error);
    partsContainer.innerHTML = displayError(error.message || 'Failed to load parts. Please try again later.');
  }
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', function() {
  loadCategoryAndParts();
});
