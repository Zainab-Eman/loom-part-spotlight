
// JavaScript file for the contact page

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    let isValid = true;
    
    if (!name) {
      document.getElementById('name').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('name').classList.remove('is-invalid');
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      document.getElementById('email').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('email').classList.remove('is-invalid');
    }
    
    if (!whatsapp) {
      document.getElementById('whatsapp').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('whatsapp').classList.remove('is-invalid');
    }
    
    if (!message) {
      document.getElementById('message').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('message').classList.remove('is-invalid');
    }
    
    if (isValid) {
      // For this example, we're just showing success message without actually sending the data
      // In a real application, you'd send this data to your backend
      console.log('Form submitted with data:', { name, email, whatsapp, message });
      
      // Show success message
      formSuccess.classList.remove('d-none');
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.add('d-none');
      }, 5000);
    }
  });
});
