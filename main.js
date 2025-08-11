document.addEventListener('DOMContentLoaded', () => {
    // ======== NEW: Early-bird countdown ========
    (function() {
        const banner = document.getElementById('eb-banner');
        if (!banner) return;
        
        const countdownEl = document.getElementById('eb-countdown');
        const deadline = new Date('2025-06-30T23:59:59');
        
        function updateCountdown() {
            const now = new Date();
            const diff = deadline - now;
            
            if (diff <= 0) {
                banner.style.display = 'none';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            countdownEl.textContent = `(${days}d ${hrs}h left)`;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 60 * 60 * 1000);
    })();

    // ======== NEW: Pricing card interactions ========
    document.querySelectorAll('.btn-pricing[data-plan]').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.pricing-card').querySelector('.booking-form');
            
            // Hide all other forms
            document.querySelectorAll('.booking-form').forEach(f => {
                f.style.display = 'none';
            });
            
            // Show this form
            if (form) {
                form.style.display = 'block';
            
                // Scroll to form
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // ======== EXISTING FUNCTIONALITY BELOW ========
    // Smooth Scroll Functionality
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

    // Video Grid Interactions (keeps working only if .video-item exists)
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playIndicator = document.createElement('div');
        playIndicator.className = 'play-indicator';
        
        // Add play indicator overlay if wrapper exists
        const wrapper = item.querySelector('.video-wrapper');
        if (wrapper) wrapper.appendChild(playIndicator);
        
        // Click handler for video toggle
        item.addEventListener('click', () => {
            if (!video) return;
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
            if (video) {
                video.controls = true;
                video.removeAttribute('autoplay');
                video.removeAttribute('muted');
            }
            if (playIndicator) playIndicator.style.display = 'none';
        }

        // Update play state visuals
        const updatePlayIndicator = () => {
            if (!video) return;
            playIndicator.textContent = video.paused ? '▶' : '❚❚';
        };

        if (video) {
            video.addEventListener('play', updatePlayIndicator);
            video.addEventListener('pause', updatePlayIndicator);
        }
    });

    // --- Keep header always visible (sticky) ---
    const header = document.querySelector('.header');
    if (header) {
        // Ensure header is shown and not hidden by previous JS logic
        header.style.transform = 'translateY(0)';
        // If you want to remove the hide animation completely, uncomment the line below:
        // header.style.transition = 'none';
    }
    // --- end header fix ---

    // Pricing Card Hover Effects
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

    // Intersection Observers
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

    // Carousel Video Functionality
    const carousel = document.getElementById('carouselExample');
    let carouselInstance = null;
    if (carousel && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        carouselInstance = new bootstrap.Carousel(carousel, {
            interval: false,
            ride: false
        });
    }
    
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
    
    function updateProgressBar(video, progressBar) {
        if (!video || !progressBar) return;
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    }
    
    videos.forEach((video, index) => {
        if (!video) return;
        video.addEventListener('timeupdate', () => {
            updateProgressBar(video, progressBars[index]);
        });
        
        video.addEventListener('ended', () => {
            if (carouselInstance) carouselInstance.next();
        });
    });
    
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', event => {
            const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(event.relatedTarget);
            
            videos.forEach(video => { if (video) video.pause(); });
            
            if (videos[activeIndex]) {
                videos[activeIndex].currentTime = 0;
                videos[activeIndex].play().catch(e => {
                    console.log("Autoplay prevented: ", e);
                });
            }
        });
    }
    
    const prevControl = document.querySelector('.carousel-control-prev');
    const nextControl = document.querySelector('.carousel-control-next');
    if (prevControl) {
        prevControl.addEventListener('click', () => {
            if (!carousel) return;
            const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(
                carousel.querySelector('.carousel-item.active')
            );
            if (videos[activeIndex]) videos[activeIndex].pause();
        });
    }
    if (nextControl) {
        nextControl.addEventListener('click', () => {
            if (!carousel) return;
            const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(
                carousel.querySelector('.carousel-item.active')
            );
            if (videos[activeIndex]) videos[activeIndex].pause();
        });
    }
    
    setTimeout(() => {
        if (videos[0]) {
            videos[0].play().catch(e => {
                console.log("First video autoplay prevented: ", e);
            });
        }
    }, 500);

    // Success Stories
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playBtn = wrapper.querySelector('.play-btn');
        
        wrapper.addEventListener('click', function() {
            if (!video) return;
            if (video.paused) {
                video.play();
                wrapper.classList.add('playing');
            } else {
                video.pause();
                wrapper.classList.remove('playing');
            }
        });
        
        video && video.addEventListener('ended', function() {
            wrapper.classList.remove('playing');
        });
        
        video && video.addEventListener('play', function() {
            videoWrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) {
                    const otherVideo = otherWrapper.querySelector('video');
                    if (otherVideo) {
                        otherVideo.pause();
                        otherWrapper.classList.remove('playing');
                    }
                }
            });
        });
    });

    // Community Engagement Animation
    const communityCarousel = document.querySelector('.community-posts-carousel');
    if (communityCarousel) {
        const prevButton = document.querySelector('.carousel-arrow.left-arrow');
        const nextButton = document.querySelector('.carousel-arrow.right-arrow');
        const posts = document.querySelectorAll('.community-post');
        
        let currentIndex = 0;
        let autoScrollInterval;
        const scrollSpeed = 3000;
        
        function scrollToPost(index) {
            const post = posts[index];
            if (!post) return;
            const scrollPosition = post.offsetLeft - communityCarousel.offsetLeft;
            
            communityCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            currentIndex = index;
        }
        
        function showNextPost() {
            currentIndex = (currentIndex + 1) % posts.length;
            scrollToPost(currentIndex);
        }
        
        function showPrevPost() {
            currentIndex = (currentIndex - 1 + posts.length) % posts.length;
            scrollToPost(currentIndex);
        }
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(showNextPost, scrollSpeed);
        }
        
        function pauseAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        function resumeAutoScroll() {
            pauseAutoScroll();
            startAutoScroll();
        }
        
        nextButton && nextButton.addEventListener('click', function() {
            pauseAutoScroll();
            showNextPost();
            setTimeout(resumeAutoScroll, scrollSpeed * 2);
        });
        
        prevButton && prevButton.addEventListener('click', function() {
            pauseAutoScroll();
            showPrevPost();
            setTimeout(resumeAutoScroll, scrollSpeed * 2);
        });
        
        communityCarousel.addEventListener('mouseenter', pauseAutoScroll);
        communityCarousel.addEventListener('mouseleave', startAutoScroll);
        
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseAutoScroll();
            } else {
                startAutoScroll();
            }
        });
        
        startAutoScroll();
    }

    // Workshop data (kept for dynamic uses)
    const workshops = [
        { id: 1, date: "2025-07-15", title: "Barista Training", location: "Cape Town", seats: 20 },
        { id: 2, date: "2025-07-22", title: "Digital Marketing Basics", location: "Online", seats: 50 }
    ];

    // Custom amount toggle
    const donationAmountEl = document.getElementById('donationAmount');
    if (donationAmountEl) {
        donationAmountEl.addEventListener('change', function() {
            const customContainer = document.getElementById('customAmountContainer');
            customContainer.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // Donation Modal
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('donationModal'));
            modal.show();
        });
    }

    // Handle donation submission
    const submitDonationBtn = document.getElementById('submitDonation');
    if (submitDonationBtn) {
        submitDonationBtn.addEventListener('click', function() {
            const form = document.getElementById('donationForm');
            if (!form) return;
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
            const payfastAmountEl = document.getElementById('payfastAmount');
            const payfastFirstNameEl = document.getElementById('payfastFirstName');
            const payfastLastNameEl = document.getElementById('payfastLastName');
            const payfastEmailEl = document.getElementById('payfastEmail');
            if (payfastAmountEl) payfastAmountEl.value = amount;
            if (payfastFirstNameEl) payfastFirstNameEl.value = firstName;
            if (payfastLastNameEl) payfastLastNameEl.value = lastName;
            if (payfastEmailEl) payfastEmailEl.value = formData.get('email') || '';
            
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
                    const payfastDonationForm = document.getElementById('payfastDonationForm');
                    if (payfastDonationForm) payfastDonationForm.submit();
                }, 1000);
            }).catch(error => {
                console.error('Formspree submission error:', error);
                const payfastDonationForm = document.getElementById('payfastDonationForm');
                if (payfastDonationForm) payfastDonationForm.submit();
            });
        });
    }

    // Populate workshops (if a .workshop-list container exists)
    const container = document.querySelector('.workshop-list');
    if (container) {
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
    }

    // -------------------------
    // Robust handling for any register-btn click (static or dynamic)
    // -------------------------
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.register-btn');
        if (!btn) return;

        // Find the workshop title (data-title) or fallback
        const workshopTitle = btn.dataset.title || btn.getAttribute('data-title') || 'Workshop';
        const hiddenWorkshopInput = document.getElementById('workshop-name');
        const modalWorkshopName = document.getElementById('modal-workshop-name');

        if (hiddenWorkshopInput) hiddenWorkshopInput.value = workshopTitle;
        if (modalWorkshopName) modalWorkshopName.value = workshopTitle;

        // Ensure modal title uses default or indicates register action
        const modalTitle = document.querySelector('#workshopModal .modal-title');
        if (modalTitle) modalTitle.textContent = 'Register for Workshop';

        // Show modal
        const modalEl = document.getElementById('workshopModal');
        if (modalEl && typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    });

    // -------------------------
    // Volunteer / Reserve button
    // -------------------------
    const volunteerBtn = document.querySelector('.reserve-btn');
    if (volunteerBtn) {
        volunteerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const hiddenWorkshopInput = document.getElementById('workshop-name');
            const modalWorkshopName = document.getElementById('modal-workshop-name');

            if (hiddenWorkshopInput) hiddenWorkshopInput.value = 'Volunteer with Us';
            if (modalWorkshopName) modalWorkshopName.value = 'Volunteer with Us';

            // Update modal title
            const modalTitle = document.querySelector('#workshopModal .modal-title');
            if (modalTitle) modalTitle.textContent = 'Volunteer with Us';

            // Show modal
            const modalEl = document.getElementById('workshopModal');
            if (modalEl && typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        });
    }

    // Handle registration button clicks inside dynamically populated container (kept for compatibility)
    document.querySelectorAll('.register-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workshopTitle = this.dataset.title || this.getAttribute('data-title') || 'Workshop';
            const hiddenWorkshopInput = document.getElementById('workshop-name');
            const modalWorkshopName = document.getElementById('modal-workshop-name');

            if (hiddenWorkshopInput) hiddenWorkshopInput.value = workshopTitle;
            if (modalWorkshopName) modalWorkshopName.value = workshopTitle;

            const modal = new bootstrap.Modal(document.getElementById('workshopModal'));
            modal.show();
        });
    });

    // Handle workshop registration form submission
    const workshopForm = document.getElementById('workshop-registration-form');
    if (workshopForm) {
        workshopForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(`Thank you for registering for ${this['workshop'].value}! We will contact you shortly.`);
            this.reset();
            const modalEl = document.getElementById('workshopModal');
            if (modalEl) {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            }
        });
    }

    // ======== UPDATED: PayFast Handling ========
    document.querySelectorAll('.pay-with-payfast').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.booking-form-data');
            const payfastForm = document.getElementById('payfastDonationForm');
            if (!form || !payfastForm) return;
            
            // Collect form data
            const formData = new FormData(form);
            const fullName = formData.get('name') || '';
            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || 'Student';
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
            
            // First submit to Formspree for record keeping
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

    // Blog Loading Function (kept as-is)
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

    // Community section link handling
    document.querySelectorAll('.community-post').forEach(post => {
        const link = post.getAttribute('href') || '';
        if (link.startsWith('blog-post.html#')) {
            post.addEventListener('click', (e) => {
                sessionStorage.setItem('blogScrollPosition', window.scrollY);
            });
        }
    });
    
    // Restore scroll position when returning from blog
    if (sessionStorage.getItem('blogScrollPosition')) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('blogScrollPosition')));
        sessionStorage.removeItem('blogScrollPosition');
    }

    // Initialize all FAQs as closed on page load
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = '0';
    });

}); // end DOMContentLoaded

// FAQ toggle function (kept outside so inline onclick can still call it)
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = faqItem.querySelector('.faq-toggle');
    
    // Toggle the active class
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
      // Expand
      answer.style.maxHeight = answer.scrollHeight + 'px';
      toggle.textContent = '−';
    } else {
      // Collapse
      answer.style.maxHeight = '0';
      toggle.textContent = '+';
    }
}