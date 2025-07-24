// main.js
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------
    // Smooth Scroll Functionality
    // ----------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // ----------------------------
    // Video Grid Interactions
    // ----------------------------
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
      const video = item.querySelector('video');
      const playIndicator = document.createElement('div');
      playIndicator.className = 'play-indicator';
      
      // Add play indicator overlay
      item.querySelector('.video-wrapper').appendChild(playIndicator);
      
      // Click handler for video toggle
      item.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          item.classList.add('playing');
        } else {
          video.pause();
          item.classList.remove('playing');
        }
        updatePlayIndicator();
      });
  
      // Mobile video controls handling
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        video.controls = true;
        video.removeAttribute('autoplay');
        video.removeAttribute('muted');
        playIndicator.style.display = 'none';
      }
  
      // Update play state visuals
      const updatePlayIndicator = () => {
        playIndicator.textContent = video.paused ? '▶' : '❚❚';
      };
  
      video.addEventListener('play', updatePlayIndicator);
      video.addEventListener('pause', updatePlayIndicator);
    });
  
    // ----------------------------
    // Dynamic Header Behavior
    // ----------------------------
    const header = document.querySelector('.header');
    let lastScroll = window.pageYOffset;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      const scrollDelta = currentScroll - lastScroll;
      
      if (currentScroll > 100) {
        header.style.transform = scrollDelta > 0 ? 
          'translateY(-100%)' : 'translateY(0)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  
    // ----------------------------
    // Pricing Card Hover Effects
    // ----------------------------
    const pricingCards = document.querySelectorAll('.pricing-card');
  
    pricingCards.forEach(card => {
      card.style.setProperty('--mouse-x', '-100px');
      card.style.setProperty('--mouse-y', '-100px');
  
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '-100px');
        card.style.setProperty('--mouse-y', '-100px');
      });
    });
  
    // ----------------------------
    // Intersection Observers
    // ----------------------------
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
  
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
      threshold: 0.15
    });
  
    document.querySelectorAll('.video-item, .pricing-card').forEach(el => {
      scrollObserver.observe(el);
    });
  });

  // <!-- 3) JavaScript to sync play/pause and auto‑advance on video end -->

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel without auto sliding
    const carousel = document.getElementById('carouselExample');
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: false,
        ride: false
    });
    
    // Updated arrays for 8 videos
    const videos = [
        document.getElementById('video1'),
        document.getElementById('video2'),
        document.getElementById('video3'),
        document.getElementById('video4'),
        document.getElementById('video5'),
        document.getElementById('video6'),
        document.getElementById('video7'),
        document.getElementById('video8')
    ];
    
    // Updated arrays for 8 progress bars
    const progressBars = [
        document.getElementById('progress1'),
        document.getElementById('progress2'),
        document.getElementById('progress3'),
        document.getElementById('progress4'),
        document.getElementById('progress5'),
        document.getElementById('progress6'),
        document.getElementById('progress7'),
        document.getElementById('progress8')
    ];
    
    // Function to update progress bar
    function updateProgressBar(video, progressBar) {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    }
    
    // Set up each video
    videos.forEach((video, index) => {
        // Update progress bar as video plays
        video.addEventListener('timeupdate', () => {
            updateProgressBar(video, progressBars[index]);
        });
        
        // When video ends, go to next slide
        video.addEventListener('ended', () => {
            carouselInstance.next();
        });
    });
    
    // Handle slide change events
    carousel.addEventListener('slid.bs.carousel', event => {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(event.relatedTarget);
        
        // Pause all videos
        videos.forEach(video => {
            video.pause();
        });
        
        // Reset and play the active video
        videos[activeIndex].currentTime = 0;
        videos[activeIndex].play().catch(e => {
            console.log("Autoplay prevented: ", e);
        });
    });
    
    // Handle manual navigation
    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(
            carousel.querySelector('.carousel-item.active')
        );
        videos[activeIndex].pause();
    });
    
    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(
            carousel.querySelector('.carousel-item.active')
        );
        videos[activeIndex].pause();
    });
    
    // Initialize first video
    setTimeout(() => {
        videos[0].play().catch(e => {
            console.log("First video autoplay prevented: ", e);
        });
    }, 500);
});

// Success Stories //

document.addEventListener('DOMContentLoaded', function() {
            const videoWrappers = document.querySelectorAll('.video-wrapper');
            
            videoWrappers.forEach(wrapper => {
                const video = wrapper.querySelector('video');
                const playBtn = wrapper.querySelector('.play-btn');
                
                // Click to play/pause
                wrapper.addEventListener('click', function() {
                    if (video.paused) {
                        video.play();
                        wrapper.classList.add('playing');
                    } else {
                        video.pause();
                        wrapper.classList.remove('playing');
                    }
                });
                
                // When video ends, show the overlay again
                video.addEventListener('ended', function() {
                    wrapper.classList.remove('playing');
                });
                
                // Pause all other videos when one is playing
                video.addEventListener('play', function() {
                    videoWrappers.forEach(otherWrapper => {
                        if (otherWrapper !== wrapper) {
                            const otherVideo = otherWrapper.querySelector('video');
                            otherVideo.pause();
                            otherWrapper.classList.remove('playing');
                        }
                    });
                });
            });
        });


        // Community Engagement Animation //

        document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.community-posts-carousel');
    const prevButton = document.querySelector('.carousel-arrow.left-arrow');
    const nextButton = document.querySelector('.carousel-arrow.right-arrow');
    const posts = document.querySelectorAll('.community-post');
    
    // Initialize carousel state
    let currentIndex = 0;
    let autoScrollInterval;
    const scrollSpeed = 3000; // 3 seconds between auto-scrolls
    
    // Function to scroll to a specific post
    function scrollToPost(index) {
        const post = posts[index];
        const scrollPosition = post.offsetLeft - carousel.offsetLeft;
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        currentIndex = index;
    }
    
    // Function to show next post
    function showNextPost() {
        currentIndex = (currentIndex + 1) % posts.length;
        scrollToPost(currentIndex);
    }
    
    // Function to show previous post
    function showPrevPost() {
        currentIndex = (currentIndex - 1 + posts.length) % posts.length;
        scrollToPost(currentIndex);
    }
    
    // Initialize auto-scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(showNextPost, scrollSpeed);
    }
    
    // Stop auto-scroll when user interacts
    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Resume auto-scroll after user interaction
    function resumeAutoScroll() {
        pauseAutoScroll();
        startAutoScroll();
    }
    
    // Event listeners for navigation
    nextButton.addEventListener('click', function() {
        pauseAutoScroll();
        showNextPost();
        setTimeout(resumeAutoScroll, scrollSpeed * 2); // Longer pause after manual interaction
    });
    
    prevButton.addEventListener('click', function() {
        pauseAutoScroll();
        showPrevPost();
        setTimeout(resumeAutoScroll, scrollSpeed * 2); // Longer pause after manual interaction
    });
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', pauseAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Pause auto-scroll when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoScroll();
        } else {
            startAutoScroll();
        }
    });
    
    // Start auto-scroll initially
    startAutoScroll();
});

// WORKSHOP FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
  // Workshop data
  const workshops = [
    { id: 1, date: "2025-07-15", title: "Barista Training", location: "Cape Town", seats: 20 },
    { id: 2, date: "2025-07-22", title: "Digital Marketing Basics", location: "Online", seats: 50 }
  ];

  // Custom amount toggle
  document.getElementById('donationAmount').addEventListener('change', function() {
    const customContainer = document.getElementById('customAmountContainer');
    customContainer.style.display = this.value === 'custom' ? 'block' : 'none';
  });
  
// ======= UPDATED DONATION FUNCTIONALITY (PAYFAST) =======
// Open modal when donate button is clicked
document.querySelector('.donate-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById('donationModal'));
  modal.show();
});

// Custom amount toggle
document.getElementById('donationAmount').addEventListener('change', function() {
  const customContainer = document.getElementById('customAmountContainer');
  customContainer.style.display = this.value === 'custom' ? 'block' : 'none';
  
  // Clear custom amount field when switching away
  if (this.value !== 'custom') {
    document.querySelector('[name="custom_amount"]').value = '';
  }
});

// Handle donation submission
document.getElementById('submitDonation').addEventListener('click', function() {
  const form = document.getElementById('donationForm');
  const formData = new FormData(form);
  const amountField = document.getElementById('donationAmount');
  let amount = amountField.value;

  // Handle custom amount
  if (amount === 'custom') {
    amount = document.querySelector('[name="custom_amount"]').value;
    if (!amount || isNaN(amount) || amount < 5) {
      alert('Please enter a valid amount (minimum R5)');
      return;
    }
  }
  
  // Get name and split into first/last
  const fullName = formData.get('name') || '';
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || 'Donor';
  
  // Set PayFast parameters
  document.getElementById('payfastAmount').value = amount;
  document.getElementById('payfastFirstName').value = firstName;
  document.getElementById('payfastLastName').value = lastName;
  document.getElementById('payfastEmail').value = formData.get('email') || '';
  
  // Show loading state
  const submitBtn = document.getElementById('submitDonation');
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
  submitBtn.disabled = true;
  
  // Submit to Formspree for record keeping
  fetch('https://formspree.io/f/ivggrjowa', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(() => {
    // Submit to PayFast after 1 second
    setTimeout(() => {
      document.getElementById('payfastDonationForm').submit();
    }, 1000);
  }).catch(error => {
    console.error('Formspree submission error:', error);
    // Still proceed to PayFast even if Formspree fails
    document.getElementById('payfastDonationForm').submit();
  });
});
// ======= END UPDATED DONATION FUNCTIONALITY =======

  // Populate workshops
  const container = document.querySelector('.workshop-list');
  workshops.forEach(ws => {
    container.innerHTML += `
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${ws.title}</h5>
            <p><i class="fas fa-calendar me-2"></i>${new Date(ws.date).toDateString()}</p>
            <p><i class="fas fa-map-marker-alt me-2"></i>${ws.location}</p>
            <p><i class="fas fa-users me-2"></i>${ws.seats} seats available</p>
            <button class="btn btn-primary register-btn" 
                    data-id="${ws.id}"
                    data-title="${ws.title}">
              Register Now
            </button>
          </div>
        </div>
      </div>`;
  });

  // Handle registration button clicks
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const workshopTitle = this.dataset.title;
      // Set the workshop name in the hidden input and in the modal display
      document.getElementById('workshop-name').value = workshopTitle;
      document.getElementById('modal-workshop-name').value = workshopTitle;
      
      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById('workshopModal'));
      modal.show();
    });
  });

  // Handle workshop registration form submission
  document.getElementById('workshop-registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, you would send this to your server
    alert(`Thank you for registering for ${this['workshop'].value}! We will contact you shortly.`);
    
    // Reset form and close modal
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById('workshopModal')).hide();
  });
});

// Update in main.js (Blog Loading Function)
async function loadBlogPosts() {
  const container = document.getElementById('blog-posts');
  if (!container) return;
  
  try {
    const response = await fetch('https://api.github.com/repos/Shaun3360/Idecided.github.io/contents/content/blog?ref=main');
    const files = await response.json();
    
    container.innerHTML = '';
    
    // Sort by date (newest first)
    files.sort((a, b) => b.name.localeCompare(a.name));
    
    files.forEach(async file => {
      if (file.name.endsWith('.md')) {
        const postResponse = await fetch(file.download_url);
        const content = await postResponse.text();
        
        // Extract front matter
        const title = content.match(/title: (.*)/)?.[1] || 'Untitled';
        const date = content.match(/date: (.*)/)?.[1] || '';
        const image = content.match(/image: (.*)/)?.[1] || 'images/placeholder.jpg';
        const excerpt = content.match(/excerpt: (.*)/)?.[1] || '';
        
        // Render post card
        container.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img src="${image}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                ${date ? `<small class="text-muted">${new Date(date).toLocaleDateString()}</small>` : ''}
                ${excerpt ? `<p class="card-text mt-2">${excerpt}</p>` : ''}
                <a href="/blog-post.html?${file.name.replace('.md', '')}" class="stretched-link"></a>
              </div>
            </div>
          </div>
        `;
      }
    });
  } catch (error) {
    container.innerHTML = `<div class="alert alert-danger">Error loading blog: ${error.message}</div>`;
  }
}

// ===== UPDATED PRICING SECTION FUNCTIONALITY =====
document.querySelectorAll('.reserve-btn').forEach(button => {
  button.addEventListener('click', function() {
    const form = this.parentElement.querySelector('.booking-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  });
});

// Handle "Pay with PayFast" button clicks
document.querySelectorAll('.pay-with-payfast').forEach(button => {
  button.addEventListener('click', function() {
    const form = this.closest('.booking-form-data');
    const payfastForm = document.getElementById('payfastDonationForm');
    
    // Collect form data
    const formData = new FormData(form);
    const fullName = formData.get('name') || '';
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'Donor';
    const email = formData.get('email') || '';
    
    // Get amount and item name from data attributes
    const amount = this.dataset.amount;
    const itemName = this.dataset.item;
    
    // Set PayFast parameters
    document.getElementById('payfastAmount').value = amount;
    document.getElementById('payfastItem').value = itemName;
    document.getElementById('payfastFirstName').value = firstName;
    document.getElementById('payfastLastName').value = lastName;
    document.getElementById('payfastEmail').value = email;
    
    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
    this.disabled = true;
    
    // First submit to Formspree
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Then submit to PayFast
        payfastForm.submit();
      } else {
        alert('There was an error processing your request. Please try again.');
        this.innerHTML = originalText;
        this.disabled = false;
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('There was an error processing your request. Please try again.');
      this.innerHTML = originalText;
      this.disabled = false;
    });
  });
});