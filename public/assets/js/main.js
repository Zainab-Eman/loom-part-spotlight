
// Main JavaScript file for the index page

// Function to load categories
async function loadCategories() {
  const categoriesContainer = document.getElementById('categories-container');
  
  try {
    const response = await fetch(`${API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories = await response.json();
    
    if (categories.length === 0) {
      categoriesContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info" role="alert">
            <i class="fas fa-info-circle me-2"></i> No categories found.
          </div>
        </div>
      `;
      return;
    }
    
    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
      const categoryCard = document.createElement('div');
      categoryCard.className = 'col-md-4 mb-4';
      categoryCard.innerHTML = `
        <div class="card category-card shadow h-100">
          <img src="${category.image || 'assets/images/placeholder.jpg'}" class="card-img-top" alt="${category.name}">
          <div class="card-body">
            <h5 class="card-title">${category.name}</h5>
            <p class="card-text">${category.description || 'No description available'}</p>
            <a href="category.html?id=${category.id}" class="btn btn-primary">View Parts</a>
          </div>
        </div>
      `;
      categoriesContainer.appendChild(categoryCard);
    });
    
  } catch (error) {
    console.error('Error loading categories:', error);
    categoriesContainer.innerHTML = displayError('Failed to load categories. Please try again later.');
  }
}

// Load categories when the page is ready
document.addEventListener('DOMContentLoaded', function() {
  loadCategories();
});
