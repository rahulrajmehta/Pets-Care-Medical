/**
 * Pets Care Medical — Interactive Homepage Script
 * High performance, accessible, zero external dependencies
 * Premium 26-Point Animation & Micro-interaction System
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Page Load Experience (Preloader & Hero Cinematic Unveiling) ---
  const sitePreloader = document.getElementById('sitePreloader');
  const hasVisited = sessionStorage.getItem('pcm_visited');

  const unveilHero = () => {
    document.body.classList.add('hero-loaded');
  };

  if (sitePreloader) {
    if (hasVisited) {
      // Rapid 180ms transition for internal multi-page browsing
      setTimeout(() => {
        sitePreloader.classList.add('fade-out');
        unveilHero();
        setTimeout(() => {
          sitePreloader.style.display = 'none';
        }, 500);
      }, 180);
    } else {
      // Full cinematic opening experience (1.1s - 1.2s)
      setTimeout(() => {
        sitePreloader.classList.add('fade-out');
        unveilHero();
        sessionStorage.setItem('pcm_visited', 'true');
        setTimeout(() => {
          sitePreloader.style.display = 'none';
        }, 600);
      }, 1150);
    }
  } else {
    unveilHero();
  }

  // --- 0.1 Scroll Progress Bar Indicator ---
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    let tickingProgress = false;
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      }
      tickingProgress = false;
    };
    window.addEventListener('scroll', () => {
      if (!tickingProgress) {
        window.requestAnimationFrame(updateProgress);
        tickingProgress = true;
      }
    }, { passive: true });
    updateProgress();
  }

  // --- 0.2 Subtle Luxury Desktop Cursor ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursorDot && cursorRing && isFinePointer) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let cursorVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorVisible) {
        cursorVisible = true;
        cursorDot.classList.add('cursor-visible');
        cursorRing.classList.add('cursor-visible');
      }
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    const renderCursorRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursorRing);
    };
    requestAnimationFrame(renderCursorRing);

    const bindCursorHover = () => {
      const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .service-card, .insta-post-card, .store-product-card, .faq-question, .dept-gallery-photo, .filter-btn, .mobile-action-btn');
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
      });
    };
    bindCursorHover();

    window.addEventListener('mousedown', () => cursorDot.classList.add('cursor-active'));
    window.addEventListener('mouseup', () => cursorDot.classList.remove('cursor-active'));

    document.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('cursor-visible');
      cursorRing.classList.remove('cursor-visible');
      cursorVisible = false;
    });
  }

  // --- 0.3 Mobile Action Bar Entrance ---
  const mobileActionBar = document.querySelector('.mobile-action-bar');
  if (mobileActionBar) {
    setTimeout(() => {
      mobileActionBar.classList.add('bar-visible');
    }, 800);
  }

  // --- 1. Sticky Navigation Scroll Effect ---
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Navigation Drawer ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.classList.add('open');
    }
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.classList.remove('open');
    }
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeDrawer();
      }
      closeBookingModal();
    }
  });

  // --- 3. Booking Appointment Modal ---
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModalBtn = document.getElementById('closeBookingModal');
  const bookingForm = document.getElementById('bookingForm');
  const modalServiceSelect = document.getElementById('modalService');
  const modalDateInput = document.getElementById('modalDate');

  // Set min date to today
  if (modalDateInput) {
    const today = new Date().toISOString().split('T')[0];
    modalDateInput.min = today;
    modalDateInput.value = today;
  }

  const openBookingModal = (serviceName = '') => {
    if (bookingModal) {
      if (serviceName && modalServiceSelect) {
        for (let i = 0; i < modalServiceSelect.options.length; i++) {
          if (modalServiceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
              modalServiceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            modalServiceSelect.selectedIndex = i;
            break;
          }
        }
      }
      bookingModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBookingModal = () => {
    if (bookingModal && bookingModal.classList.contains('open')) {
      bookingModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-open-modal="booking"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  // Handle Form Submission -> Prepares structured WhatsApp message
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const petType = document.querySelector('input[name="petType"]:checked')?.value || 'Pet';
      const petName = document.getElementById('petName')?.value.trim() || 'Not specified';
      const service = document.getElementById('modalService')?.value || 'General Consultation';
      const date = document.getElementById('modalDate')?.value || 'Earliest available';
      const timeSlot = document.getElementById('modalTime')?.value || 'Flexible';
      const parentName = document.getElementById('parentName')?.value.trim() || 'Pet Parent';
      const notes = document.getElementById('modalNotes')?.value.trim() || '';

      const phone = '918252544441';
      let message = `*Appointment Request - Pets Care Medical (Lalpur, Ranchi)*\n\n`;
      message += `🐾 *Pet Type:* ${petType}\n`;
      message += `🐶 *Pet Name:* ${petName}\n`;
      message += `🩺 *Service Needed:* ${service}\n`;
      message += `📅 *Preferred Date:* ${date}\n`;
      message += `⏰ *Preferred Time:* ${timeSlot}\n`;
      message += `👤 *Parent Name:* ${parentName}\n`;
      if (notes) {
        message += `📝 *Notes:* ${notes}\n`;
      }
      message += `\n_Sent via Pets Care Medical Website_`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

      showToast('Opening WhatsApp to confirm your appointment...');
      closeBookingModal();

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 400);
    });
  }

  // --- 4. Toast Notification Utility ---
  const toast = document.getElementById('toastNotice');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Copy to clipboard actions
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      } else {
        showToast(`Contact: ${textToCopy}`);
      }
    });
  });

  // --- 5. Scroll Reveal Animations & Animated Counters ---
  const animatedElements = document.querySelectorAll('.fade-in-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-grid');
  
  const animateCounter = (el) => {
    const rawVal = el.getAttribute('data-count-to');
    if (!rawVal) return;
    const target = parseFloat(rawVal);
    const isDecimal = rawVal.includes('.');
    const suffix = el.getAttribute('data-count-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      el.textContent = isDecimal 
        ? currentVal.toFixed(1) + suffix 
        : Math.floor(currentVal) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    };
    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          if (entry.target.hasAttribute('data-count-to')) {
            animateCounter(entry.target);
          }
          if (entry.target.querySelectorAll) {
            entry.target.querySelectorAll('[data-count-to]').forEach(counter => {
              animateCounter(counter);
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);

    animatedElements.forEach(el => {
      appearOnScroll.observe(el);
    });
  } else {
    animatedElements.forEach(el => {
      el.classList.add('in-view');
      if (el.hasAttribute('data-count-to')) {
        animateCounter(el);
      }
    });
  }

  // --- 5.1 Subtle Desktop Image Parallax on Scroll ---
  const parallaxTargets = document.querySelectorAll('.hero-image-frame img, .parallax-target');
  if (parallaxTargets.length && window.innerWidth >= 992) {
    let tickingParallax = false;
    const updateParallax = () => {
      parallaxTargets.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const depth = 0.04;
          const offset = Math.max(-16, Math.min(16, (rect.top - window.innerHeight / 2) * depth));
          img.style.transform = `scale(1.02) translateY(${offset}px)`;
        }
      });
      tickingParallax = false;
    };

    window.addEventListener('scroll', () => {
      if (!tickingParallax) {
        window.requestAnimationFrame(updateParallax);
        tickingParallax = true;
      }
    }, { passive: true });
  }

  // --- 6. Active Navigation Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- 7. Dynamic Footer Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 8. Instagram-Style Gallery Filtering & Lightbox ---
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const postCards = Array.from(document.querySelectorAll('.insta-post-card'));
  const instaLightbox = document.getElementById('instaLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxWhatsAppBtn = document.getElementById('lightboxWhatsAppBtn');

  let currentVisibleCards = [...postCards];
  let currentCardIndex = 0;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      currentVisibleCards = [];

      postCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          currentVisibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox functions
  const updateLightboxContent = (index) => {
    if (!currentVisibleCards.length) return;
    if (index < 0) index = currentVisibleCards.length - 1;
    if (index >= currentVisibleCards.length) index = 0;
    currentCardIndex = index;

    const card = currentVisibleCards[currentCardIndex];
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title');
    const caption = card.getAttribute('data-caption');
    const tag = card.getAttribute('data-tag');

    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = title;
    }
    if (lightboxTag) lightboxTag.textContent = tag;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentCardIndex + 1} / ${currentVisibleCards.length}`;

    if (lightboxWhatsAppBtn) {
      const msg = encodeURIComponent(`Hi Pets Care Medical, I saw this photo from your gallery (${tag}: "${title}") and would like to know more about this service.`);
      lightboxWhatsAppBtn.href = `https://wa.me/918252544441?text=${msg}`;
    }
  };

  const openLightbox = (card) => {
    const idx = currentVisibleCards.indexOf(card);
    if (idx !== -1) {
      updateLightboxContent(idx);
      if (instaLightbox) {
        instaLightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        instaLightbox.focus();
      }
    }
  };

  const closeLightbox = () => {
    if (instaLightbox && instaLightbox.classList.contains('open')) {
      instaLightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  postCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => updateLightboxContent(currentCardIndex - 1));
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => updateLightboxContent(currentCardIndex + 1));

  if (instaLightbox) {
    instaLightbox.addEventListener('click', (e) => {
      if (e.target === instaLightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (instaLightbox && instaLightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') updateLightboxContent(currentCardIndex - 1);
      if (e.key === 'ArrowRight') updateLightboxContent(currentCardIndex + 1);
    }
  });

  // Story Highlight Carousel items clicking to filter and scroll to grid
  const storyItems = document.querySelectorAll('.story-item');
  storyItems.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.getAttribute('data-filter') || 'all';
      const targetFilterBtn = document.querySelector(`.gallery-filter-bar .filter-btn[data-filter="${filter}"]`);
      if (targetFilterBtn) {
        targetFilterBtn.click();
      }
      const grid = document.getElementById('instaGrid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- 9. FAQ Accordion Interaction ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open');
        btn.setAttribute('aria-expanded', !isOpen);
      }
    });
  });
});



