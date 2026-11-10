  // =========================================================================
  // AUTOMATIC TRAFFIC, UTM & CONVERSION TRACKING ENGINE
  // =========================================================================
  (function initTrafficTracker() {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');
      const utmMedium = params.get('utm_medium');
      const utmCampaign = params.get('utm_campaign');
      const utmContent = params.get('utm_content');
      const referrer = document.referrer || 'Direct';

      if (utmSource || !localStorage.getItem('osp_utm_tracking')) {
        let detectedSource = utmSource;
        if (!detectedSource) {
          if (referrer.includes('google')) detectedSource = 'Google Search';
          else if (referrer.includes('facebook') || referrer.includes('instagram')) detectedSource = 'Meta Ads';
          else if (referrer.includes('whatsapp')) detectedSource = 'WhatsApp Link';
          else if (referrer.includes('linkedin')) detectedSource = 'LinkedIn';
          else if (referrer.includes('youtube')) detectedSource = 'YouTube';
          else detectedSource = 'Direct / Organic';
        }

        const trackingData = {
          utm_source: detectedSource,
          utm_medium: utmMedium || 'direct',
          utm_campaign: utmCampaign || 'general',
          utm_content: utmContent || '',
          referrer: referrer,
          firstLandingPage: window.location.pathname,
          device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
          trackedAt: new Date().toISOString()
        };
        localStorage.setItem('osp_utm_tracking', JSON.stringify(trackingData));
      }
    } catch(e) {}
  })();

/* ==========================================================================
   OUTREACH STUDIO PRO — CLIENT ACQUISITION CRM INTERACTIVE ENGINE
   Hero Tab Switcher | Agency ROI Engine | Checkout Modal | Pitch Inspector
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  // Instant Reset Param (?reset=1) for testing fresh buyer experience
  if (urlParams.get('reset') === '1') {
    localStorage.removeItem('osp_auth_user');
    localStorage.removeItem('osp_license_paid');
    localStorage.removeItem('osp_byok_keys');
    localStorage.removeItem('osp_payment_id');
    localStorage.removeItem('osp_license_key');
    localStorage.removeItem('osp_buyer_name');
    localStorage.removeItem('osp_buyer_phone');
    localStorage.removeItem('osp_buyer_email');
    sessionStorage.setItem('osp_auto_open_modal', 'true');
    urlParams.delete('reset');
    urlParams.delete('test_pay');
    urlParams.delete('test');
    const remaining = urlParams.toString();
    window.location.href = window.location.pathname + (remaining ? '?' + remaining : '');
    return;
  }

  // Founder Test Mode Param (?test=1 or ?demo=1)
  if (urlParams.get('test') === '1' || urlParams.get('demo') === '1') {
    const testBtn = document.getElementById('founderTestPayBtn');
    if (testBtn) testBtn.classList.remove('hidden');
  }

  // Check active CRM session on homepage
  const navLoginBtn = document.getElementById('navLoginBtn');
  if (navLoginBtn) {
    try {
      const u = JSON.parse(localStorage.getItem('osp_auth_user'));
      if (u && (u.email || u.licenseKey)) {
        navLoginBtn.href = window.location.protocol === 'file:' ? 'crm.html' : '/crm';
        navLoginBtn.innerHTML = '<i class="fas fa-rocket text-amber-300"></i><span>My CRM</span>';
        navLoginBtn.className = 'whitespace-nowrap text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 shadow-sm';
      }
    } catch(e) {}
  }
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

    // Dynamic glowing track fill
    const dealsPct = ((deals - dealsSlider.min) / (dealsSlider.max - dealsSlider.min)) * 100;
    dealsSlider.style.background = 'linear-gradient(to right, #3B82F6 0%, #6366F1 ' + dealsPct + '%, #1E293B ' + dealsPct + '%, #1E293B 100%)';

    const feePct = ((feeInINR - feeSlider.min) / (feeSlider.max - feeSlider.min)) * 100;
    feeSlider.style.background = 'linear-gradient(to right, #10B981 0%, #06B6D4 ' + feePct + '%, #1E293B ' + feePct + '%, #1E293B 100%)';
  }

  window.changeDeals = function(delta) {
    if (!dealsSlider) return;
    let val = parseInt(dealsSlider.value, 10) + delta;
    if (val < parseInt(dealsSlider.min, 10)) val = parseInt(dealsSlider.min, 10);
    if (val > parseInt(dealsSlider.max, 10)) val = parseInt(dealsSlider.max, 10);
    dealsSlider.value = val;
    updateAgencyROI();
  };

  window.changeFee = function(delta) {
    if (!feeSlider) return;
    let val = parseInt(feeSlider.value, 10) + delta;
    if (val < parseInt(feeSlider.min, 10)) val = parseInt(feeSlider.min, 10);
    if (val > parseInt(feeSlider.max, 10)) val = parseInt(feeSlider.max, 10);
    feeSlider.value = val;
    updateAgencyROI();
  };

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

  // 6. Checkout Modal Controller & Razorpay Live Gateway (BlackRoots Key)
  window.openCheckoutModal = function(planType) {
    // Close mobile nav drawer if open
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileBtn = document.getElementById('mobileMenuToggle');
    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      mobileDrawer.classList.add('hidden');
      if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
    }

    const modal = document.getElementById('checkoutModal');
    if (modal && typeof window.toggleNicheSelection === 'function') {
      if (planType === 'custom') {
        window.toggleNicheSelection('web_dev');
      } else {
        window.toggleNicheSelection('all');
      }
    }
    const formView = document.getElementById('checkoutFormView');
    const successView = document.getElementById('checkoutSuccessView');
    const urlParamsCheck = new URLSearchParams(window.location.search);
    if (urlParamsCheck.get('test_pay') === '1' || urlParamsCheck.get('test') === 'live1' || window.isForced1RupeeTest) {
      localStorage.removeItem('osp_license_paid');
    }
    if (modal) {
      if (formView && successView) {
        if (localStorage.getItem('osp_license_paid')) {
          // If already paid, automatically show the unlocked download screen!
          formView.classList.add('hidden');
          successView.classList.remove('hidden');
          
          const pid = localStorage.getItem('osp_payment_id') || 'pay_live_verified';
          const bname = localStorage.getItem('osp_buyer_name') || 'Valued Customer';
          const bphone = localStorage.getItem('osp_buyer_phone') || '';
          const lkey = localStorage.getItem('osp_license_key') || 'OSP-PRO-9842-7104-LIVE';
          let dlLink = localStorage.getItem('osp_download_link') || '/assets/downloads/Outreach_Studio_Pro_v1.0.zip';
          try {
            const settings = JSON.parse(localStorage.getItem('osp_site_settings')) || {};
            if (settings.downloadLink) dlLink = settings.downloadLink;
          } catch(e) {}

          const successPaymentId = document.getElementById('successPaymentId');
          const successCustomer = document.getElementById('successCustomer');
          const successLicenseKey = document.getElementById('successLicenseKey');
          const btnDirectDownload = document.getElementById('btnDirectDownload');

          if (successPaymentId) successPaymentId.textContent = pid;
          if (successCustomer) successCustomer.textContent = `${bname} ${bphone ? '(' + bphone + ')' : ''}`;
          if (successLicenseKey) successLicenseKey.textContent = lkey;
          if (btnDirectDownload) btnDirectDownload.href = dlLink;
          const successNichesText = document.getElementById('successNichesText');
          if (successNichesText) {
            try {
              const u = JSON.parse(localStorage.getItem('osp_auth_user'));
              if (u && u.targetNichesDisplay) successNichesText.textContent = u.targetNichesDisplay;
            } catch(e) {}
          }
        } else {
          formView.classList.remove('hidden');
          successView.classList.add('hidden');
        }
      }
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

  // 1-Rupee Live Gateway Test Helpers
  window.open1RupeeTestModal = function() {
    localStorage.removeItem('osp_license_paid');
    localStorage.removeItem('osp_auth_user');
    window.isForced1RupeeTest = true;
    window.openCheckoutModal('custom');
    if (typeof window.enableLiveTestPayMode === 'function') {
      window.enableLiveTestPayMode();
    }
  };

  window.resetBuyerSessionAndPayAgain = function() {
    localStorage.removeItem('osp_auth_user');
    localStorage.removeItem('osp_license_paid');
    localStorage.removeItem('osp_payment_id');
    localStorage.removeItem('osp_license_key');
    localStorage.removeItem('osp_buyer_name');
    localStorage.removeItem('osp_buyer_phone');
    localStorage.removeItem('osp_buyer_email');

    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const emailInput = document.getElementById('checkoutEmail');
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (emailInput) emailInput.value = '';

    const formView = document.getElementById('checkoutFormView');
    const successView = document.getElementById('checkoutSuccessView');
    if (formView && successView) {
      formView.classList.remove('hidden');
      successView.classList.add('hidden');
    }
  };

  window.enableLiveTestPayMode = function() {
    window.isForced1RupeeTest = true;
    const modalOldPrice = document.getElementById('checkoutModalOldPrice');
    const modalPrice = document.getElementById('checkoutModalPrice');
    const modalSaveBadge = document.getElementById('checkoutModalSaveBadge');
    const modalSubtitle = document.getElementById('checkoutModalPlanSubtitle');
    const btnPayAmount = document.getElementById('btnPayAmount');
    const btnPayOldAmount = document.getElementById('btnPayOldAmount');
    const nicheCountBadge = document.getElementById('nicheCountBadge');

    if (modalOldPrice) modalOldPrice.textContent = '₹1,999';
    if (modalPrice) modalPrice.textContent = '₹1';
    if (modalSaveBadge) modalSaveBadge.textContent = '1-RUPEE TEST';
    if (modalSubtitle) modalSubtitle.textContent = 'Founder Live Gateway Test Mode (Real ₹1.00 UPI / Card Settlement)';
    if (btnPayAmount) btnPayAmount.textContent = '₹1 (Live Test)';
    if (btnPayOldAmount) btnPayOldAmount.textContent = '₹1,999';
    if (nicheCountBadge) {
      nicheCountBadge.textContent = '₹1 Live Verification';
      nicheCountBadge.className = 'text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30';
    }
  };

  window.startRazorpayPaymentTest1 = function() {
    window.isForced1RupeeTest = true;
    window.enableLiveTestPayMode();
    startRazorpayPayment();
  };

  // Founder Simulated Payment for Live Demo Testing
  window.simulateTestCheckout = function() {
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const emailInput = document.getElementById('checkoutEmail');

    let name = nameInput ? nameInput.value.trim() : '';
    let phone = phoneInput ? phoneInput.value.trim() : '';
    let email = emailInput ? emailInput.value.trim() : '';

    if (!name) name = "Mohammad Hamza";
    if (!phone) phone = "8808129388";
    if (!email) email = "hamza@agency.com";

    if (nameInput) nameInput.value = name;
    if (phoneInput) phoneInput.value = phone;
    if (emailInput) emailInput.value = email;

    const cleanPhone = phone.replace(/\D/g, '') || '9876543210';
    const isAllBundle = window.selectedNichesState && window.selectedNichesState.includes('all');
    const amountVal = isAllBundle ? 3200 : 1999;
    const planTierName = isAllBundle ? 'All Services Master Bundle (₹3,200)' : 'Custom Specialist Plan (₹1,999)';
    const nichesData = window.getSelectedNichesData ? window.getSelectedNichesData() : { ids: ['all'], displayString: 'All Industries (52+ Leads)', totalCount: 52 };

    const mockResponse = {
      razorpay_payment_id: 'pay_founder_sim_' + Math.floor(100000 + Math.random() * 900000)
    };

    handlePaymentSuccess(mockResponse, {
      name: name,
      phone: cleanPhone,
      email: email,
      amount: amountVal,
      planTier: planTierName,
      targetNiches: nichesData.ids,
      targetNichesDisplay: nichesData.displayString,
      totalLeadsCount: nichesData.totalCount
    });
  };

  // Razorpay Payment Trigger using BlackRoots Live API Key
  window.handleRazorpaySubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    startRazorpayPayment();
  };

  
  // =========================================================================
  // =========================================================================
  // FREELANCER / AGENCY SERVICE CATEGORY CONTROLLER (CHECKOUT MODAL)
  // Max 3 Categories for Custom Plan (₹1,999) | Master Bundle for All 5 (₹3,200)
  // =========================================================================
  window.selectedNichesState = ['all'];

  window.updatePlanPricingUI = function(isAll) {
    const modalOldPrice = document.getElementById('checkoutModalOldPrice');
    const modalPrice = document.getElementById('checkoutModalPrice');
    const modalSaveBadge = document.getElementById('checkoutModalSaveBadge');
    const modalSubtitle = document.getElementById('checkoutModalPlanSubtitle');
    const btnPayAmount = document.getElementById('btnPayAmount');
    const btnPayOldAmount = document.getElementById('btnPayOldAmount');
    const nicheCountBadge = document.getElementById('nicheCountBadge');

    const urlParams = new URLSearchParams(window.location.search);
    const isLiveTestMode = window.isForced1RupeeTest || urlParams.get('test_pay') === '1' || urlParams.get('test') === 'live1';

    if (isLiveTestMode) {
      if (modalOldPrice) modalOldPrice.textContent = isAll ? '₹3,200' : '₹1,999';
      if (modalPrice) modalPrice.textContent = '₹1';
      if (modalSaveBadge) modalSaveBadge.textContent = '1-RUPEE TEST';
      if (modalSubtitle) modalSubtitle.textContent = 'Founder Live Gateway Test Mode (Real ₹1.00 UPI / Card Settlement)';
      if (btnPayAmount) btnPayAmount.textContent = '₹1 (Live Test)';
      if (btnPayOldAmount) btnPayOldAmount.textContent = isAll ? '₹3,200' : '₹1,999';
      if (nicheCountBadge) {
        nicheCountBadge.textContent = '₹1 Live Verification';
        nicheCountBadge.className = 'text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30';
      }
    } else if (isAll) {
      if (modalOldPrice) modalOldPrice.textContent = '₹14,999';
      if (modalPrice) modalPrice.textContent = '₹3,200';
      if (modalSaveBadge) modalSaveBadge.textContent = 'SAVE 78%';
      if (modalSubtitle) modalSubtitle.textContent = 'All-In-One Full Agency Master Bundle • Lifetime Commercial License';
      if (btnPayAmount) btnPayAmount.textContent = '₹3,200';
      if (btnPayOldAmount) btnPayOldAmount.textContent = '₹14,999';
      if (nicheCountBadge) {
        nicheCountBadge.textContent = 'All 5 Included (₹3,200)';
        nicheCountBadge.className = 'text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30';
      }
    } else {
      const activeCount = (window.selectedNichesState && !window.selectedNichesState.includes('all')) 
        ? window.selectedNichesState.length 
        : 1;

      if (modalOldPrice) modalOldPrice.textContent = '₹9,999';
      if (modalPrice) modalPrice.textContent = '₹1,999';
      if (modalSaveBadge) modalSaveBadge.textContent = 'SAVE 80%';
      if (modalSubtitle) modalSubtitle.textContent = 'Custom Specialist Plan (Up to 3 Categories) • Lifetime License';
      if (btnPayAmount) btnPayAmount.textContent = '₹1,999';
      if (btnPayOldAmount) btnPayOldAmount.textContent = '₹9,999';
      if (nicheCountBadge) {
        nicheCountBadge.textContent = `${activeCount} / 3 Selected (₹1,999)`;
        nicheCountBadge.className = activeCount === 3 
          ? 'text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30'
          : 'text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-md border border-cyan-500/30';
      }
    }
  };

  window.toggleNicheSelection = function(serviceId) {
    const allBox = document.getElementById('niche_all');
    const allCard = document.getElementById('card_niche_all');
    const allChk = document.getElementById('chk_niche_all');
    const limitNotice = document.getElementById('nicheLimitNotice');

    const individualServices = [
      'web_dev', 'video_editing', 'marketing_ads', 
      'graphic_design', 'automation_ai'
    ];

    const activeMasterClass = "niche-checkbox-card selected group relative flex items-center justify-between p-3 rounded-xl border border-blue-500/70 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-600/20 cursor-pointer shadow-lg shadow-blue-500/10 transition-all hover:border-blue-400";
    const inactiveMasterClass = "niche-checkbox-card group relative flex items-center justify-between p-3 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900/90 hover:border-white/20 cursor-pointer transition-all";

    const activeCardClass = "niche-checkbox-card selected group flex items-center justify-between p-2.5 rounded-xl border border-blue-500/70 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-600/20 cursor-pointer shadow-md shadow-blue-500/10 transition-all";
    const inactiveCardClass = "niche-checkbox-card group flex items-center justify-between p-2.5 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900/90 hover:border-white/20 cursor-pointer transition-all";

    const activeChkClass = "w-4 h-4 rounded-md border flex items-center justify-center bg-blue-600 border-blue-400 text-white transition-all flex-shrink-0";
    const inactiveChkClass = "w-4 h-4 rounded-md border flex items-center justify-center border-white/20 bg-black/40 text-transparent transition-all flex-shrink-0";

    const setMasterUI = (active) => {
      if (allBox) allBox.checked = active;
      if (allCard) allCard.className = active ? activeMasterClass : inactiveMasterClass;
      if (allChk) allChk.className = active ? activeChkClass : inactiveChkClass;
    };

    const setCardUI = (id, active) => {
      const b = document.getElementById('niche_' + id);
      const c = document.getElementById('card_niche_' + id);
      const k = document.getElementById('chk_niche_' + id);
      if (b) b.checked = active;
      if (c) c.className = active ? activeCardClass : inactiveCardClass;
      if (k) k.className = active ? activeChkClass : inactiveChkClass;
    };

    if (serviceId === 'all') {
      // User clicked Master "All Services / Full Agency" card (₹3,200)
      if (limitNotice) limitNotice.classList.add('hidden');
      setMasterUI(true);
      individualServices.forEach(id => setCardUI(id, true));
      window.selectedNichesState = ['all'];
      window.updatePlanPricingUI(true);
    } else {
      // User clicked an individual category card
      const targetBox = document.getElementById('niche_' + serviceId);
      const isCurrentlyAll = window.selectedNichesState && window.selectedNichesState.includes('all');

      if (isCurrentlyAll) {
        // Was on Master Bundle -> Switch to Custom Plan (₹1,999) with just this clicked category
        if (limitNotice) limitNotice.classList.add('hidden');
        setMasterUI(false);
        individualServices.forEach(id => {
          setCardUI(id, id === serviceId);
        });
        window.selectedNichesState = [serviceId];
        window.updatePlanPricingUI(false);
      } else {
        const isChecked = targetBox ? targetBox.checked : false;

        if (isChecked) {
          // Unchecking this category
          if (limitNotice) limitNotice.classList.add('hidden');
          setCardUI(serviceId, false);

          const active = individualServices.filter(id => {
            const b = document.getElementById('niche_' + id);
            return b && b.checked;
          });

          if (active.length === 0) {
            // Keep at least this category selected (cannot have 0)
            setCardUI(serviceId, true);
            window.selectedNichesState = [serviceId];
          } else {
            window.selectedNichesState = active;
          }
          window.updatePlanPricingUI(false);
        } else {
          // Trying to check an additional category: Enforce strict Max 3 limit!
          const active = individualServices.filter(id => {
            const b = document.getElementById('niche_' + id);
            return b && b.checked;
          });

          if (active.length >= 3) {
            // Exceeded 3 categories! Show clear upgrade guidance
            if (limitNotice) {
              limitNotice.classList.remove('hidden');
              if (allCard) {
                allCard.classList.add('ring-2', 'ring-amber-400');
                setTimeout(() => allCard.classList.remove('ring-2', 'ring-amber-400'), 1800);
              }
            } else {
              alert('Max 3 categories allowed in the ₹1,999 plan! To unlock all 5 categories, choose the All Services Master Bundle (₹3,200).');
            }
            return;
          }

          if (limitNotice) limitNotice.classList.add('hidden');
          setCardUI(serviceId, true);
          active.push(serviceId);
          window.selectedNichesState = active;
          window.updatePlanPricingUI(false);
        }
      }
    }

    updateNicheBadgeDisplay();
  };

  function updateNicheBadgeDisplay() {
    const badge = document.getElementById('checkoutNicheBadge');
    if (!badge) return;

    const serviceShortNames = {
      web_dev: "Web Dev",
      video_editing: "Video Editing",
      marketing_ads: "Paid Ads",
      graphic_design: "Graphic Design",
      automation_ai: "AI Automation"
    };

    const state = (window.selectedNichesState && window.selectedNichesState.length) ? window.selectedNichesState : ['all'];

    if (state.includes('all')) {
      badge.textContent = "All Services Bundle (₹3,200)";
      badge.className = "text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap flex-shrink-0";
    } else if (state.length === 1) {
      const name = serviceShortNames[state[0]] || "1 Service";
      badge.textContent = `${name} (1/3 • ₹1,999)`;
      badge.className = "text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30 whitespace-nowrap flex-shrink-0";
    } else {
      badge.textContent = `${state.length} / 3 Categories (₹1,999)`;
      badge.className = "text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full border border-indigo-500/30 whitespace-nowrap flex-shrink-0";
    }
  }

  window.getSelectedNichesData = function() {
    const serviceLabels = {
      all: "All Services (Full Agency)",
      web_dev: "Web Development & UI/UX",
      video_editing: "Video Editing & Content",
      marketing_ads: "Social Media & Paid Ads",
      graphic_design: "Graphic Design & Branding",
      automation_ai: "AI Automation & Chatbots"
    };

    const state = (window.selectedNichesState && window.selectedNichesState.length) ? window.selectedNichesState : ['all'];

    if (state.includes('all')) {
      return {
        ids: ['all'],
        displayString: "All Services / Full Agency",
        totalCount: 52
      };
    }

    const names = state.map(id => serviceLabels[id] || id);
    return {
      ids: state,
      displayString: names.join(', '),
      totalCount: 52
    };
  };

  window.startRazorpayPayment = function() {
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const emailInput = document.getElementById('checkoutEmail');
    const payBtn = document.getElementById('btnRazorpayPay');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!name) {
      alert('Please enter your Full Name.');
      if (nameInput) nameInput.focus();
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (typeof Razorpay === 'undefined') {
      alert('Payment gateway is loading. Please check your internet connection and try again in 2 seconds.');
      return;
    }

    const originalBtnHtml = payBtn ? payBtn.innerHTML : '';
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Opening Secure Razorpay Gateway...';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const isLiveTestMode = window.isForced1RupeeTest || urlParams.get('test_pay') === '1' || urlParams.get('test') === 'live1';

    const isAllBundle = window.selectedNichesState && window.selectedNichesState.includes('all');
    let paymentAmountPaise = isAllBundle ? 320000 : 199900;
    let paymentAmountDisplay = isAllBundle ? '₹3,200' : '₹1,999';
    let planTitle = isAllBundle ? 'Outreach Studio Pro (All Services Master Bundle)' : 'Outreach Studio Pro (Custom 3-Category Plan)';

    if (isLiveTestMode) {
      paymentAmountPaise = 100; // ₹1.00 for live settlement verification
      paymentAmountDisplay = '₹1 (Live Test)';
      planTitle = 'Outreach Studio Pro — Live Gateway Verification Test (₹1)';
    }

    // Exact key from BlackRoots with dynamic bundle pricing
    const rzpOptions = {
      key: 'rzp_live_TV9VNPhiYYbB07',
      amount: paymentAmountPaise,
      currency: 'INR',
      name: 'HRS Web Solutions',
      description: `${planTitle} (${paymentAmountDisplay} Lifetime)`,
      image: 'https://www.hrswebsolution.online/assets/images/hrs_icon.png',
      prefill: {
        name: name,
        contact: cleanPhone,
        email: email || ''
      },
      notes: {
        product: planTitle,
        license: 'Lifetime Commercial License',
        price: paymentAmountDisplay,
        planType: isAllBundle ? 'all_services_master_bundle' : 'custom_specialist_plan'
      },
      theme: {
        color: '#2563EB'
      },
      modal: {
        ondismiss: function() {
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.innerHTML = originalBtnHtml;
          }
        }
      },
      handler: function(response) {
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.innerHTML = originalBtnHtml;
        }
        const nichesData = window.getSelectedNichesData ? window.getSelectedNichesData() : { ids: ['all'], displayString: 'All Industries (52+ Leads)', totalCount: 52 };
        handlePaymentSuccess(response, { 
          name, 
          phone: cleanPhone, 
          email, 
          amount: isAllBundle ? 3200 : 1999,
          planTier: planTitle,
          targetNiches: nichesData.ids, 
          targetNichesDisplay: nichesData.displayString, 
          totalLeadsCount: nichesData.totalCount 
        });
      }
    };

    const rzp = new Razorpay(rzpOptions);
    rzp.on('payment.failed', function(resp) {
      alert('Payment Failed: ' + (resp.error ? resp.error.description : 'Transaction cancelled'));
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = originalBtnHtml;
      }
    });
    rzp.open();
  };

  // 1-Click Copy License Key
  window.copyLicenseKey = function() {
    const keyEl = document.getElementById('successLicenseKey');
    const btn = document.getElementById('btnCopyLicenseKey');
    if (keyEl) {
      const text = keyEl.textContent.trim();
      const doCopy = () => {
        if (btn) {
          const originalHtml = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check text-emerald-300"></i> Copied!';
          setTimeout(() => { btn.innerHTML = originalHtml; }, 2000);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(doCopy).catch(() => {
          fallbackCopy(text);
          doCopy();
        });
      } else {
        fallbackCopy(text);
        doCopy();
      }
    }
  };

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  // 100% Automated Immediate Delivery on Payment Success
  
  // =========================================================================
  // ONBOARDING STEP 2: CONNECT AI ENGINE & LAUNCH CRM CONTROLLER
  // =========================================================================
  window.activeOnboardProvider = 'gemini';

  window.selectOnboardProvider = function(prov) {
    window.activeOnboardProvider = prov;

    const cards = {
      gemini: document.getElementById('onboard_card_gemini'),
      openai: document.getElementById('onboard_card_openai'),
      claude: document.getElementById('onboard_card_claude')
    };

    Object.keys(cards).forEach(k => {
      const c = cards[k];
      if (c) {
        if (k === prov) {
          c.className = "flex items-center justify-between p-2.5 rounded-xl border border-blue-500/60 bg-blue-500/15 cursor-pointer hover:border-blue-400 transition shadow-sm";
        } else {
          c.className = "flex items-center justify-between p-2.5 rounded-xl border border-white/[0.08] bg-slate-900/60 cursor-pointer hover:border-white/20 transition";
        }
      }
    });

    const label = document.getElementById('onboardKeyLabel');
    const link = document.getElementById('onboardGetKeyLink');
    const input = document.getElementById('onboardApiKeyInput');

    if (prov === 'gemini') {
      if (label) label.textContent = "Enter Your Google Gemini API Key:";
      if (link) {
        link.href = "https://aistudio.google.com/app/apikey";
        link.innerHTML = "Get Free Gemini Key (30s) &rarr;";
      }
      if (input) input.placeholder = "AIzaSy...";
    } else if (prov === 'openai') {
      if (label) label.textContent = "Enter Your OpenAI API Key:";
      if (link) {
        link.href = "https://platform.openai.com/api-keys";
        link.innerHTML = "Get OpenAI Key &rarr;";
      }
      if (input) input.placeholder = "sk-proj-...";
    } else if (prov === 'claude') {
      if (label) label.textContent = "Enter Your Anthropic Claude API Key:";
      if (link) {
        link.href = "https://console.anthropic.com/";
        link.innerHTML = "Get Claude Key &rarr;";
      }
      if (input) input.placeholder = "sk-ant-...";
    }
  };

  window.toggleKeyVisibility = function(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      if (icon) icon.className = 'fas fa-eye';
    }
  };

  window.handleSaveKeyAndLaunchCRM = function() {
    const input = document.getElementById('onboardApiKeyInput');
    const keyVal = (input ? input.value : '').trim();
    const provider = window.activeOnboardProvider || 'gemini';

    if (!keyVal || keyVal.length < 8) {
      alert("Please enter a valid API key, or click 'skip for now' below to launch CRM directly.");
      if (input) input.focus();
      return;
    }

    if (provider === 'gemini' && !keyVal.startsWith('AIzaSy')) {
      if (!confirm("⚠️ Note: Google Gemini API keys hamesha 'AIzaSy...' se start hoti hain. Jo aapne enter kiya hai wo OAuth token ya doosri key lag rahi hai.\n\nKya aap fir bhi save karke aage badhna chahte hain?\n(Free Gemini Key 30s me yahan se milti hai: https://aistudio.google.com/app/apikey)")) {
        if (input) input.focus();
        return;
      }
    }

    // Save key locally
    let keys = {};
    try { keys = JSON.parse(localStorage.getItem('osp_byok_keys')) || {}; } catch(e) {}
    keys[window.activeOnboardProvider || 'gemini'] = keyVal;
    localStorage.setItem('osp_byok_keys', JSON.stringify(keys));

    // Redirect to CRM
    window.location.href = window.location.protocol === 'file:' ? 'crm.html' : '/crm';
  };

  window.skipKeyAndLaunchCRM = function() {
    window.location.href = window.location.protocol === 'file:' ? 'crm.html' : '/crm';
  };

  window.handlePaymentSuccess = function(response, customer) {
    const paymentId = response.razorpay_payment_id || ('pay_' + Date.now());
    const randomKey = `OSP-PRO-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-LIVE`;
    const nichesDisplay = customer.targetNichesDisplay || 'All Industries (52+ Leads)';
    const nichesList = (customer.targetNiches && customer.targetNiches.length) ? customer.targetNiches : ['all'];

    // Fetch custom Google Drive download link from admin settings or default
    let downloadLink = '/assets/downloads/Outreach_Studio_Pro_v1.0.zip';
    try {
      const s1 = JSON.parse(localStorage.getItem('osp_site_settings')) || {};
      const s2 = JSON.parse(localStorage.getItem('osp_admin_settings')) || {};
      downloadLink = localStorage.getItem('osp_download_link') || s1.downloadLink || s1.dlLink || s2.downloadLink || s2.dlLink || downloadLink;
    } catch(e) {}

    try {
      localStorage.setItem('osp_license_paid', 'true');
      localStorage.setItem('osp_payment_id', paymentId);
      localStorage.setItem('osp_buyer_name', customer.name);
      localStorage.setItem('osp_buyer_phone', customer.phone);
      localStorage.setItem('osp_buyer_email', customer.email || '');
      localStorage.setItem('osp_license_key', randomKey);
      localStorage.setItem('osp_download_link', downloadLink);

      // Auto-authenticate buyer into Cloud CRM

      const authPayload = {
        name: customer.name,
        email: customer.email || (customer.phone + '@customer.crm'),
        phone: customer.phone,
        licenseKey: randomKey,
        targetNiches: nichesList,
        targetNichesDisplay: nichesDisplay,
        totalLeadsCount: customer.totalLeadsCount || 52,
        tier: 'Lifetime Commercial Pro',
        loginAt: new Date().toISOString()
      };
      localStorage.setItem('osp_auth_user', JSON.stringify(authPayload));

      // Record in registered users
      let regUsers = [];
      try { regUsers = JSON.parse(localStorage.getItem('osp_registered_users')) || []; } catch(e) {}
      if (!regUsers.some(u => u.licenseKey === randomKey)) {
        regUsers.push(authPayload);
        localStorage.setItem('osp_registered_users', JSON.stringify(regUsers));
      }

      // Record in Admin Orders Database
      let allOrders = [];
      try {
        allOrders = JSON.parse(localStorage.getItem('osp_orders_db')) || [];
      } catch(err) { allOrders = []; }

      // Capture UTM & traffic source
      let traffic = {};
      try { traffic = JSON.parse(localStorage.getItem('osp_utm_tracking')) || {}; } catch(e) {}

      const newOrder = {
        id: `ORD-${Date.now().toString().slice(-4)}`,
        name: customer.name,
        phone: customer.phone,
        email: customer.email || 'N/A',
        targetNiches: nichesList,
        targetNichesDisplay: nichesDisplay,
        totalLeadsCount: customer.totalLeadsCount || 52,
        amount: customer.amount || 1999,
        planTier: customer.planTier || (customer.amount === 3200 ? 'All Services Master Bundle' : 'Custom Specialist Plan'),
        gateway: 'Razorpay Live',
        paymentId: paymentId,
        licenseKey: randomKey,
        trafficSource: traffic.utm_source || 'Direct',
        campaign: traffic.utm_campaign || 'Organic',
        device: traffic.device || (window.innerWidth < 768 ? 'Mobile' : 'Desktop'),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'PAID'
      };
      allOrders.unshift(newOrder);
      localStorage.setItem('osp_orders_db', JSON.stringify(allOrders));
    } catch(e) {}

    const formView = document.getElementById('checkoutFormView');
    const successView = document.getElementById('checkoutSuccessView');
    const successPaymentId = document.getElementById('successPaymentId');
    const successCustomer = document.getElementById('successCustomer');
    const successLicenseKey = document.getElementById('successLicenseKey');
    const btnDirectDownload = document.getElementById('btnDirectDownload');
    const successWhatsAppBtn = document.getElementById('successWhatsAppBtn');

    if (formView) formView.classList.add('hidden');
    if (successView) successView.classList.remove('hidden');

    if (successPaymentId) successPaymentId.textContent = paymentId;
    if (successCustomer) successCustomer.textContent = `${customer.name} (${customer.phone})`;
    if (successLicenseKey) successLicenseKey.textContent = randomKey;
    if (btnDirectDownload) btnDirectDownload.href = downloadLink;
    const successNichesText = document.getElementById('successNichesText');
    if (successNichesText) successNichesText.textContent = nichesDisplay;

    const paidAmt = customer.amount || 1999;
    const planName = customer.planTier || (paidAmt === 3200 ? 'All Services Master Bundle' : 'Custom Specialist Plan');
    const badgeText = document.getElementById('successPaymentBadgeText');
    if (badgeText) {
      badgeText.textContent = `Payment Confirmed (₹${Number(paidAmt).toLocaleString('en-IN')})`;
    }

    if (successWhatsAppBtn) {
      const waMsg = encodeURIComponent(
        `Hi Hamza, I have successfully paid Rs ${Number(paidAmt).toLocaleString('en-IN')} for ${planName} via Razorpay! 🎉\n\n` +
        `• Name: ${customer.name}\n` +
        `• WhatsApp: ${customer.phone}\n` +
        `• Payment ID: ${paymentId}\n` +
        `• License Key: ${randomKey}\n\n` +
        `I am downloading the software from Google Drive. Please save my order for technical updates.`
      );
      successWhatsAppBtn.href = `https://wa.me/918808129388?text=${waMsg}`;
    }
  };

  // Copy Desktop CRM Link for Customer
  window.copyDesktopStudioLink = function(btn) {
    const crmUrl = window.location.protocol === 'file:' ? 'crm.html' : (window.location.origin + '/crm');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(crmUrl).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check text-emerald-300"></i> <span class="text-emerald-200">Link Copied! Open on Desktop / PC</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 3000);
      }).catch(() => {
        prompt("Copy this link to open on your Desktop / PC:", crmUrl);
      });
    } else {
      prompt("Copy this link to open on your Desktop / PC:", crmUrl);
    }
  };

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


});
