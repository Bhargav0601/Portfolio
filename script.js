// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Typing Animation for Tagline
const taglineTyped = new Typed('.tagline', {
  strings: [
    "Turning Data into Insights, One Algorithm at a Time",
    "Exploring the World Through Data",
    "Building Intelligent Solutions",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  showCursor: false,
});

// Smooth Scrolling to Contact Section
function scrollToContact() {
  const contactSection = document.querySelector('#contact');
  contactSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// Animate Circular Progress Bars
document.querySelectorAll('.progress-circle').forEach(circle => {
  const progress = circle.getAttribute('data-progress');
  circle.style.background = `conic-gradient(var(--light) ${progress}%, var(--accent) ${progress}%)`;
});

// Particle Effect for Hero Section
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('Particles.js loaded!');
});

// Form Submission Handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const formData = new FormData(form);

  try {
    // Send form data to Formspree using fetch
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    // Check if the submission was successful
    if (response.ok) {
      // Hide the form
      form.style.display = 'none';

      // Display success message and "Submit Another Message" button
      formStatus.innerHTML = `
        <p style="color: green;">Message sent successfully!</p>
        <button onclick="resetForm()" class="submit-button">Submit Another Message</button>
      `;
    } else {
      // Display error message
      formStatus.innerHTML = `<p style="color: red;">Oops! Something went wrong. Please try again.</p>`;
    }
  } catch (error) {
    // Display error message
    formStatus.innerHTML = `<p style="color: red;">Oops! Something went wrong. Please try again.</p>`;
  }
});

// Function to reset the form and show it again
function resetForm() {
  form.reset(); // Clear the form fields
  form.style.display = 'block'; // Show the form again
  formStatus.innerHTML = ''; // Clear the status message
}

// Email Validation for Gmail (Optional)
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();
  if (!isValidGmail(email)) {
    emailInput.setCustomValidity('Please enter a valid Gmail address.');
    formStatus.innerHTML = 'Please enter a valid Gmail address.';
    formStatus.style.color = 'red';
  } else {
    emailInput.setCustomValidity('');
    formStatus.innerHTML = '';
  }
});

function isValidGmail(email) {
  // Regex to check if the email is a valid Gmail address
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}