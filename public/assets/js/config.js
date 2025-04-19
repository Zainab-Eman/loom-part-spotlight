
// API configuration
const API_URL = 'http://localhost:5000/api';

// Helper function to get URL parameters
function getUrlParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Helper function to format error messages
function displayError(message) {
  return `
    <div class="col-12">
      <div class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i> ${message}
      </div>
    </div>
  `;
}
