// Wrap all code in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Active State
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Logo Click Handler
  const logoLink = document.querySelector('.logo a');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Volunteer Form Handling
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your application! We will contact you shortly.');
      closeVolunteerForm();
    });
  }

  // Community Carousel
  const initCarousel = () => {
    const carousel = document.querySelector('.community-posts-carousel');
    if (!carousel) return;

    // ... rest of your carousel code ...
  };
  initCarousel();

 // ----------------------------
  // Donation Calculator
  // ----------------------------
  const initCalculator = () => {
    const calculator = document.querySelector('.calculator-section');
    if (!calculator) return;

    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');
    const calculatedAmount = document.getElementById('calculatedAmount');
    const impactItems = document.querySelectorAll('.impact-item');

    // Validate required elements
    if (!toggleButtons.length || !amountButtons.length || !customAmount || !calculatedAmount) {
      console.warn('Missing calculator elements');
      return;
    }

    let currentAmount = 0;
    let isMonthly = false;

    // Toggle donation type
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        isMonthly = button.dataset.type === 'monthly';
        updateCalculations();
      });
    });

    // Preset amount buttons
    amountButtons.forEach(button => {
      button.addEventListener('click', () => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentAmount = parseInt(button.dataset.amount);
        customAmount.value = currentAmount;
        updateCalculations();
      });
    });

    // Custom amount input
    customAmount.addEventListener('input', () => {
      currentAmount = parseInt(customAmount.value) || 0;
      amountButtons.forEach(btn => btn.classList.remove('active'));
      updateCalculations();
    });

    const updateCalculations = () => {
      // Build display string
      let displayText = `R${currentAmount.toLocaleString()}`;
      if (isMonthly) displayText += '/month';

      calculatedAmount.textContent = displayText;
      updateImpactDisplay();
    };

    const updateImpactDisplay = () => {
      const totalImpact = isMonthly ? currentAmount * 12 : currentAmount;
      
      impactItems.forEach(item => {
        const impactValue = parseInt(item.dataset.impact);
        item.classList.toggle('active', totalImpact >= impactValue);
      });
    };

    // Initialize with default values
    if (toggleButtons[0] && amountButtons[0]) {
      toggleButtons[0].click();
      amountButtons[0].click();
    }
  };

  initCalculator();
});

// Window-scoped functions
function showVolunteerForm() {
  const modal = document.getElementById('volunteerModal');
  if (modal) modal.style.display = 'block';
}

function closeVolunteerForm() {
  const modal = document.getElementById('volunteerModal');
  if (modal) modal.style.display = 'none';
}

// Window click handler
window.onclick = function(event) {
  const modal = document.getElementById('volunteerModal');
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
};