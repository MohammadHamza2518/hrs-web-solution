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
      src: 'assets/images/hero_clean_dashboard.png',
      label: 'CRM Workspace &bull; Global Leads Pipeline &bull; Local SQLite Engine'
    },
    'ai': {
      src: 'assets/images/hero_ai_modal.png',
      label: 'Multi-AI Setup &bull; Claude 3.7 Sonnet &bull; GPT-4o &bull; Gemini'
    },
    'leads': {
      src: 'assets/images/hero_leads_table.png',
      label: 'Verified Prospects &bull; Dubai, UK &amp; Europe &bull; 1-Click WhatsApp'
    },
    'filters': {
      src: 'assets/images/hero_scraper_modal.png',
      label: 'Global Lead Scraper &bull; Google Maps &amp; Meta Ads Engine'
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
  const grossRevenueText = document.getElementById('grossRevenueText');
  const netProfitDisplay = document.getElementById('netProfitDisplay');
  const usdProfitDisplay = document.getElementById('usdProfitDisplay');
  const roiPctText = document.getElementById('roiPctText');

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

    const approxUSDPerFee = Math.round(feeInINR / 83.5);
    if (dealsValText) {
      dealsValText.textContent = `${deals} Client${deals > 1 ? 's' : ''} Closed`;
    }
    if (feeValText) {
      feeValText.innerHTML = `${formatINR(feeInINR)} <span class="text-slate-400 font-normal text-xs">(~$${approxUSDPerFee.toLocaleString()} USD)</span>`;
    }

    const grossRevenue = deals * feeInINR;
    const netProfit = grossRevenue - 1999;
    const roiPercentage = Math.round((netProfit / 1999) * 100);
    const roiMultiplier = Math.round(netProfit / 1999);
    const approxUSDNet = Math.round(netProfit / 83.5);
    const approxUSDGross = Math.round(grossRevenue / 83.5);

    if (grossRevenueText) {
      grossRevenueText.innerHTML = `+${formatINR(grossRevenue)} <span class="text-slate-400 font-normal text-[11px]">(~$${approxUSDGross.toLocaleString()})</span>`;
    }
    if (netProfitDisplay) {
      netProfitDisplay.textContent = `+${formatINR(netProfit)}`;
    }
    if (usdProfitDisplay) {
      usdProfitDisplay.textContent = `~$${approxUSDNet.toLocaleString()} USD Net In Pocket`;
    }
    if (roiPctText) {
      roiPctText.textContent = `${roiPercentage.toLocaleString('en-IN')}% Net ROI (${roiMultiplier}x Return)`;
    }
    if (totalRevenueDisplay) {
      totalRevenueDisplay.textContent = `+${formatINR(grossRevenue)}`;
    }
    if (roiMultiplierDisplay && !roiPctText) {
      roiMultiplierDisplay.textContent = `${roiPercentage.toLocaleString('en-IN')}% Net ROI`;
    }
  }

  window.setROIPreset = function(deals, fee, btn) {
    if (dealsSlider && feeSlider) {
      dealsSlider.value = deals;
      feeSlider.value = fee;
      updateAgencyROI();
    }
    document.querySelectorAll('.roi-preset-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

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
// 9. FAQ Accordion Toggle
  window.toggleFaq = function(button) {
    const item = button.closest('.faq-item');
    if (!item) return;
    const isActive = item.classList.contains('active');
    
    // Close other FAQ items for a clean, focused accordion effect
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    if (isActive) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  };

  // 10. Live FOMO / Social Proof Sales Ticker
  const fomoEvents = [
    {
      name: "Rohan S.",
      city: "Noida, UP",
      action: "Claimed Lifetime Commercial License",
      time: "3m ago",
      badge: "Verified Buyer",
      icon: "fa-bolt",
      colorClass: "amber"
    },
    {
      name: "Priya M.",
      city: "Mumbai",
      action: "Closed $2,200 aesthetic clinic client in Dubai",
      time: "11m ago",
      badge: "Agency Win",
      icon: "fa-trophy",
      colorClass: "emerald"
    },
    {
      name: "Farhan A.",
      city: "Kanpur",
      action: "Extracted 140 fresh leads using Maps Scraper",
      time: "18m ago",
      badge: "Lead Discovery",
      icon: "fa-bullseye",
      colorClass: "blue"
    },
    {
      name: "Arjun K.",
      city: "Bengaluru",
      action: "Dispatched 45 AI-personalized pitches (0 bans)",
      time: "24m ago",
      badge: "WhatsApp Safe",
      icon: "fa-shield-halved",
      colorClass: "cyan"
    },
    {
      name: "Vikram D.",
      city: "Delhi NCR",
      action: "Booked 2 website redesign discovery calls",
      time: "31m ago",
      badge: "Discovery Call",
      icon: "fa-calendar-check",
      colorClass: "emerald"
    },
    {
      name: "Sameer P.",
      city: "Hyderabad",
      action: "Claimed 1-Click BAT Lifetime Access (₹1,999)",
      time: "42m ago",
      badge: "Verified Buyer",
      icon: "fa-bolt",
      colorClass: "amber"
    },
    {
      name: "Ananya R.",
      city: "Pune",
      action: "Closed £1,800 UK dental clinic retainer",
      time: "52m ago",
      badge: "Agency Win",
      icon: "fa-trophy",
      colorClass: "emerald"
    },
    {
      name: "Launch Batch Alert",
      city: "India",
      action: "Only 7 Lifetime Licenses left at ₹1,999 launch price",
      time: "Live Deal",
      badge: "Limited Stock",
      icon: "fa-fire",
      colorClass: "rose"
    }
  ];

  function initFomoTicker() {
    let container = document.querySelector('.fomo-ticker-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'fomo-ticker-container';
      container.innerHTML = `
        <div id="fomoToast" class="fomo-toast">
          <div id="fomoToastIcon" class="fomo-toast-icon amber">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="fomo-toast-content">
            <div class="fomo-toast-title">
              <span id="fomoToastName">Rohan S.</span>
              <span class="text-slate-400 font-normal text-[11px]" id="fomoToastCity">(Noida, UP)</span>
              <i class="fas fa-check-circle text-emerald-400 text-[10px] ml-0.5"></i>
            </div>
            <div class="fomo-toast-action" id="fomoToastAction">Claimed Lifetime Commercial License</div>
            <div class="fomo-toast-meta">
              <span id="fomoToastTime">3m ago</span>
              <span>&bull;</span>
              <span class="text-emerald-400 font-medium" id="fomoToastBadge">Verified Buyer</span>
            </div>
          </div>
          <button type="button" class="fomo-close-btn" id="fomoCloseBtn" title="Dismiss">&times;</button>
        </div>
      `;
      document.body.appendChild(container);
    }

    const toast = document.getElementById('fomoToast');
    const toastIcon = document.getElementById('fomoToastIcon');
    const toastName = document.getElementById('fomoToastName');
    const toastCity = document.getElementById('fomoToastCity');
    const toastAction = document.getElementById('fomoToastAction');
    const toastTime = document.getElementById('fomoToastTime');
    const toastBadge = document.getElementById('fomoToastBadge');
    const closeBtn = document.getElementById('fomoCloseBtn');

    if (!toast) return;

    let currentIndex = 0;
    let isPaused = false;
    let hideTimeout = null;
    let nextTimeout = null;

    toast.addEventListener('mouseenter', () => { isPaused = true; });
    toast.addEventListener('mouseleave', () => { isPaused = false; });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideToast();
        clearTimeout(nextTimeout);
        nextTimeout = setTimeout(showNextToast, 35000);
      });
    }

    function showToast(event) {
      if (!event) return;
      if (toastName) toastName.textContent = event.name;
      if (toastCity) toastCity.textContent = `(${event.city})`;
      if (toastAction) toastAction.textContent = event.action;
      if (toastTime) toastTime.textContent = event.time;
      if (toastBadge) toastBadge.textContent = event.badge;

      if (toastIcon) {
        toastIcon.className = `fomo-toast-icon ${event.colorClass}`;
        toastIcon.innerHTML = `<i class="fas ${event.icon}"></i>`;
      }

      toast.classList.add('show');

      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!isPaused) {
          hideToast();
        } else {
          const unpauseInterval = setInterval(() => {
            if (!isPaused) {
              clearInterval(unpauseInterval);
              hideToast();
            }
          }, 1000);
        }
      }, 5500);
    }

    function hideToast() {
      toast.classList.remove('show');
    }

    function showNextToast() {
      currentIndex = (currentIndex + 1) % fomoEvents.length;
      showToast(fomoEvents[currentIndex]);
      scheduleNext();
    }

    function scheduleNext() {
      clearTimeout(nextTimeout);
      const delay = Math.floor(Math.random() * 8000) + 18000;
      nextTimeout = setTimeout(showNextToast, delay);
    }

    // First appearance after 3.5 seconds
    setTimeout(() => {
      showToast(fomoEvents[0]);
      scheduleNext();
    }, 3500);
  }

  // Initialize FOMO Ticker
  initFomoTicker();
});
