/* ==========================================================================
   OUTREACH STUDIO PRO — CLIENT ACQUISITION CRM INTERACTIVE ENGINE
   Hero Tab Switcher | Agency ROI Engine | Checkout Modal | Pitch Inspector
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileDrawer.classList.contains('hidden');
      if (isOpen) {
        mobileDrawer.classList.add('hidden');
        mobileBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.remove('hidden');
        mobileBtn.innerHTML = '<i class="fas fa-times text-lg text-rose-400"></i>';
        document.body.style.overflow = 'hidden';
      }
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        mobileBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        if (!mobileDrawer.classList.contains('hidden')) {
          mobileDrawer.classList.add('hidden');
          mobileBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
          document.body.style.overflow = '';
        }
      }
    });
  }

  // 3. Smooth Scroll Helper
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 85;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. Hero App Mockup Tab Switcher
  const heroTabs = document.querySelectorAll('.hero-app-tab');
  const heroAppImg = document.getElementById('heroAppImg');
  const heroTabLabel = document.getElementById('heroTabLabel');

  const tabContentMap = {
    'crm': {
      src: 'assets/images/crm_unlocked_after_onboarding.png',
      label: 'CRM Workspace &bull; Pre-Loaded Leads &bull; Status Pipeline'
    },
    'ai': {
      src: 'assets/images/settings_modal_screenshot.png',
      label: 'Multi-AI Configuration &bull; Claude 3.7 &bull; GPT-4o &bull; Gemini'
    },
    'leads': {
      src: 'assets/images/clean_crm_section.png',
      label: 'Verified Lead Records &bull; Country Filters &bull; 1-Click WhatsApp'
    },
    'filters': {
      src: 'assets/images/clean_header_screenshot.png',
      label: 'Smart Discovery Toolbar &bull; Live Scraper Integration'
    }
  };

  if (heroTabs.length && heroAppImg) {
    heroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        heroTabs.forEach(t => {
          t.classList.remove('bg-blue-600/30', 'text-white', 'border-blue-500/50');
          t.classList.add('text-slate-400', 'border-transparent', 'hover:text-slate-200');
        });
        tab.classList.remove('text-slate-400', 'border-transparent', 'hover:text-slate-200');
        tab.classList.add('bg-blue-600/30', 'text-white', 'border-blue-500/50');

        const key = tab.getAttribute('data-tab');
        const info = tabContentMap[key];
        if (info) {
          heroAppImg.style.opacity = '0';
          setTimeout(() => {
            heroAppImg.src = info.src;
            if (heroTabLabel) heroTabLabel.innerHTML = info.label;
            heroAppImg.style.opacity = '1';
          }, 180);
        }
      });
    });
  }

  // 5. Agency ROI Calculator
  const dealsSlider = document.getElementById('dealsSlider');
  const feeSlider = document.getElementById('feeSlider');
  const dealsValText = document.getElementById('dealsValText');
  const feeValText = document.getElementById('feeValText');
  const totalRevenueDisplay = document.getElementById('totalRevenueDisplay');
  const roiMultiplierDisplay = document.getElementById('roiMultiplierDisplay');

  function formatINR(number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(number);
  }

  function updateAgencyROI() {
    if (!dealsSlider || !feeSlider) return;
    const deals = parseInt(dealsSlider.value, 10);
    const feeInINR = parseInt(feeSlider.value, 10);

    dealsValText.textContent = `${deals} Client${deals > 1 ? 's' : ''} Closed`;
    feeValText.textContent = formatINR(feeInINR);

    const grossRevenue = deals * feeInINR;
    const netProfit = grossRevenue - 1999;
    const roiPercentage = Math.round((netProfit / 1999) * 100);

    if (totalRevenueDisplay) {
      totalRevenueDisplay.textContent = `+${formatINR(grossRevenue)}`;
    }
    if (roiMultiplierDisplay) {
      roiMultiplierDisplay.textContent = `${roiPercentage.toLocaleString('en-IN')}% Net ROI`;
    }
  }

  if (dealsSlider && feeSlider) {
    dealsSlider.addEventListener('input', updateAgencyROI);
    feeSlider.addEventListener('input', updateAgencyROI);
    updateAgencyROI();
  }

  // 6. Checkout Modal Controller
  window.openCheckoutModal = function() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCheckoutModal = function() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckoutModal();
    });
  }

  // 7. Lead Pitch Accordion
  window.toggleLeadPitch = function(leadId) {
    const pitchBox = document.getElementById(`pitch-${leadId}`);
    const toggleIcon = document.getElementById(`icon-${leadId}`);
    if (pitchBox) {
      const isHidden = pitchBox.classList.contains('hidden');
      if (isHidden) {
        pitchBox.classList.remove('hidden');
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up text-blue-400 text-xs';
      } else {
        pitchBox.classList.add('hidden');
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down text-slate-400 text-xs';
      }
    }
  };

  // 8. Leads Vault Filter
  const leadFilterTabs = document.querySelectorAll('.vault-filter-btn');
  const leadCards = document.querySelectorAll('.vault-lead-card');

  if (leadFilterTabs.length && leadCards.length) {
    leadFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        leadFilterTabs.forEach(t => {
          t.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
          t.classList.add('bg-white/[0.03]', 'text-slate-400', 'border-white/[0.08]');
        });
        tab.classList.remove('bg-white/[0.03]', 'text-slate-400', 'border-white/[0.08]');
        tab.classList.add('bg-blue-600', 'text-white', 'border-blue-500');

        const filter = tab.getAttribute('data-country');

        leadCards.forEach(card => {
          const country = card.getAttribute('data-country') || '';
          if (filter === 'all' || country === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
