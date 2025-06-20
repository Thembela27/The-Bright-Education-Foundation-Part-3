document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');

  function toggleMenu() {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Contact form validation & submission via EmailJS
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  // Load EmailJS SDK dynamically
  const emailjsScript = document.createElement('script');
  emailjsScript.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
  emailjsScript.onload = () => {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS user ID
  };
  document.head.appendChild(emailjsScript);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formMessage.textContent = '';

    // Simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      formMessage.textContent = 'Please enter your name (at least 2 characters).';
      form.name.focus();
      return;
    }
    if (!validateEmail(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      form.email.focus();
      return;
    }
    if (message.length < 10) {
      formMessage.textContent = 'Please enter a message (at least 10 characters).';
      form.message.focus();
      return;
    }

    // Disable submit button
    form.querySelector('button[type="submit"]').disabled = true;
    formMessage.textContent = 'Sending message...';

    // Prepare EmailJS params
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    // Send email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(() => {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        form.reset();
        form.querySelector('button[type="submit"]').disabled = false;
      }, (error) => {
        console.error('FAILED...', error);
        formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        form.querySelector('button[type="submit"]').disabled = false;
      });
  });

  function validateEmail(email) {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Gallery LightBox
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightboxModal, lightboxImage, closeBtn;

  function createLightbox() {
    lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightbox-modal';
    lightboxModal.setAttribute('role', 'dialog');
    lightboxModal.setAttribute('aria-modal', 'true');
    lightboxModal.style.display = 'none';

    lightboxImage = document.createElement('img');
    closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.innerHTML = '&times;';

    lightboxModal.appendChild(lightboxImage);
    lightboxModal.appendChild(closeBtn);
    document.body.appendChild(lightboxModal);

    closeBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxModal.classList.add('show');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('show');
  }

  createLightbox();

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(item.src, item.alt);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item.src, item.alt);
      }
    });
  });

  // Dynamic content loading example
  const extraContent = document.getElementById('extra-content');

  fetch('extra-content.html')
    .then(response => response.text())
    .then(data => {
      extraContent.innerHTML = data;
    })
    .catch(() => {
      extraContent.textContent = 'Failed to load extra content.';
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default submit

    // Clear previous messages
    formMessage.textContent = '';
    formMessage.style.color = '';

    // Get values trimmed
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validation flags
    let valid = true;
    let errorMessages = [];

    // Name validation
    if (name.length < 2) {
      valid = false;
      errorMessages.push('Please enter your full name (at least 2 characters).');
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      valid = false;
      errorMessages.push('Please enter a valid email address.');
    }

    // Message validation
    if (message.length < 10) {
      valid = false;
      errorMessages.push('Message must be at least 10 characters.');
    }

    if (!valid) {
      // Show errors
      formMessage.style.color = '#8b4e1c'; // coffee brown error color
      formMessage.innerHTML = errorMessages.join('<br>');
      return;
    }

    // If valid, simulate successful submission
    formMessage.style.color = '#3a2914'; // dark coffee brown success color
    formMessage.textContent = 'Thank you for contacting us! We will get back to you shortly.';

    // Clear form fields after success
    form.reset();
  });
});
