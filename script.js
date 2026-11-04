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
    if (urlParams.get('test') === '1') {
      window.location.href = window.location.pathname + '?test=1';
    } else {
      window.location.href = window.location.pathname;
    }
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
        navLoginBtn.href = '/crm';
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
  window.openCheckoutModal = function() {
    // Close mobile nav drawer if open
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileBtn = document.getElementById('mobileMenuToggle');
    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      mobileDrawer.classList.add('hidden');
      if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
    }

    const modal = document.getElementById('checkoutModal');
    const formView = document.getElementById('checkoutFormView');
    const successView = document.getElementById('checkoutSuccessView');
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
          let dlLink = localStorage.getItem('osp_download_link') || 'https://drive.google.com/drive/folders/176iX2P-7yT_demo_outreach_studio_pro';
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

  // Founder Simulated Payment for Live Demo Testing
  window.simulateTestCheckout = function() {
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const emailInput = document.getElementById('checkoutEmail');

    let name = nameInput ? nameInput.value.trim() : '';
    let phone = phoneInput ? phoneInput.value.trim() : '';
    let email = emailInput ? emailInput.value.trim() : '';

    if (!name) name = "Agency Client";
    if (!phone) phone = "9876543210";
    if (!email) email = "client@agency.com";

    if (nameInput) nameInput.value = name;
    if (phoneInput) phoneInput.value = phone;
    if (emailInput) emailInput.value = email;

    const cleanPhone = phone.replace(/\D/g, '') || '9876543210';
    const nichesData = window.getSelectedNichesData ? window.getSelectedNichesData() : { ids: ['all'], displayString: 'All Industries (52+ Leads)', totalCount: 52 };

    const mockResponse = {
      razorpay_payment_id: 'pay_founder_sim_' + Math.floor(100000 + Math.random() * 900000)
    };

    handlePaymentSuccess(mockResponse, {
      name: name,
      phone: cleanPhone,
      email: email,
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
  // =========================================================================
  window.selectedNichesState = ['all'];

  window.toggleNicheSelection = function(serviceId) {
    const allBox = document.getElementById('niche_all');
    const allCard = document.getElementById('card_niche_all');
    const allChk = document.getElementById('chk_niche_all');

    const individualServices = [
      'web_dev', 'video_editing', 'marketing_ads', 
      'graphic_design', 'automation_ai'
    ];

    if (serviceId === 'all') {
      window.selectedNichesState = ['all'];
      if (allBox) allBox.checked = true;
      if (allCard) {
        allCard.className = "niche-checkbox-card selected col-span-1 sm:col-span-2 flex items-center justify-between p-2.5 rounded-xl border border-blue-500/70 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-600/20 cursor-pointer shadow-md shadow-blue-500/10 transition-all hover:border-blue-400";
      }
      if (allChk) {
        allChk.className = "w-4 h-4 rounded-md border flex items-center justify-center bg-blue-600 border-blue-400 text-white transition-all";
      }
      individualServices.forEach(id => {
        const box = document.getElementById('niche_' + id);
        const card = document.getElementById('card_niche_' + id);
        const chk = document.getElementById('chk_niche_' + id);
        if (box) box.checked = false;
        if (card) {
          const isFull = (id === 'automation_ai');
          card.className = "niche-checkbox-card " + (isFull ? "col-span-1 sm:col-span-2 " : "") + "flex items-center justify-between p-2 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900/90 hover:border-white/20 cursor-pointer transition-all";
        }
        if (chk) {
          chk.className = "w-3.5 h-3.5 rounded border flex items-center justify-center border-white/20 bg-black/40 text-transparent transition-all";
        }
      });
    } else {
      if (allBox) allBox.checked = false;
      if (allCard) {
        allCard.className = "niche-checkbox-card col-span-1 sm:col-span-2 flex items-center justify-between p-2.5 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900/90 hover:border-white/20 cursor-pointer transition-all";
      }
      if (allChk) {
        allChk.className = "w-4 h-4 rounded-md border flex items-center justify-center border-white/20 bg-black/40 text-transparent transition-all";
      }

      const box = document.getElementById('niche_' + serviceId);
      const card = document.getElementById('card_niche_' + serviceId);
      const chk = document.getElementById('chk_niche_' + serviceId);
      const isChecked = box ? !box.checked : false;

      if (box) box.checked = isChecked;

      const isFull = (serviceId === 'automation_ai');
      if (card) {
        if (isChecked) {
          card.className = "niche-checkbox-card selected " + (isFull ? "col-span-1 sm:col-span-2 " : "") + "flex items-center justify-between p-2 rounded-xl border border-blue-500/70 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-600/20 cursor-pointer shadow-md shadow-blue-500/10 transition-all";
        } else {
          card.className = "niche-checkbox-card " + (isFull ? "col-span-1 sm:col-span-2 " : "") + "flex items-center justify-between p-2 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900/90 hover:border-white/20 cursor-pointer transition-all";
        }
      }
      if (chk) {
        if (isChecked) {
          chk.className = "w-3.5 h-3.5 rounded border flex items-center justify-center bg-blue-600 border-blue-400 text-white transition-all";
        } else {
          chk.className = "w-3.5 h-3.5 rounded border flex items-center justify-center border-white/20 bg-black/40 text-transparent transition-all";
        }
      }

      const active = [];
      individualServices.forEach(id => {
        const b = document.getElementById('niche_' + id);
        if (b && b.checked) active.push(id);
      });

      if (active.length === 0) {
        window.selectedNichesState = ['all'];
        if (allBox) allBox.checked = true;
        if (allCard) {
          allCard.className = "niche-checkbox-card selected col-span-1 sm:col-span-2 flex items-center justify-between p-2.5 rounded-xl border border-blue-500/70 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-600/20 cursor-pointer shadow-md shadow-blue-500/10 transition-all hover:border-blue-400";
        }
        if (allChk) {
          allChk.className = "w-4 h-4 rounded-md border flex items-center justify-center bg-blue-600 border-blue-400 text-white transition-all";
        }
      } else {
        window.selectedNichesState = active;
      }
    }

    updateNicheBadgeDisplay();
  };

  function updateNicheBadgeDisplay() {
    const badge = document.getElementById('checkoutNicheBadge');
    if (!badge) return;

    const serviceLabels = {
      all: "All Services (Full Agency)",
      web_dev: "Web Dev & UI/UX",
      video_editing: "Video Editing",
      marketing_ads: "Paid Ads & Marketing",
      graphic_design: "Graphic Design",
      automation_ai: "AI & Chatbots"
    };

    if (window.selectedNichesState.includes('all')) {
      badge.textContent = "All Services (Full Agency)";
      badge.className = "text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30";
    } else {
      const names = window.selectedNichesState.map(s => serviceLabels[s] || s);
      badge.textContent = names.join(', ');
      badge.className = "text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30";
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

    // Exact key from BlackRoots
    const rzpOptions = {
      key: 'rzp_live_TV9VNPhiYYbB07',
      amount: 199900, // ₹1,999 in paise
      currency: 'INR',
      name: 'HRS Web Solutions',
      description: 'Outreach Studio Pro (Lifetime Commercial License)',
      image: 'https://www.hrswebsolution.online/assets/images/hrs_icon.png',
      prefill: {
        name: name,
        contact: cleanPhone,
        email: email || ''
      },
      notes: {
        product: 'Outreach Studio Pro',
        license: 'Lifetime Commercial License',
        price: '₹1,999'
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
        handlePaymentSuccess(response, { name, phone: cleanPhone, email, targetNiches: nichesData.ids, targetNichesDisplay: nichesData.displayString, totalLeadsCount: nichesData.totalCount });
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
    window.location.href = '/crm';
  };

  window.skipKeyAndLaunchCRM = function() {
    window.location.href = '/crm';
  };

  window.handlePaymentSuccess = function(response, customer) {
    const paymentId = response.razorpay_payment_id || ('pay_' + Date.now());
    const randomKey = `OSP-PRO-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-LIVE`;
    const nichesDisplay = customer.targetNichesDisplay || 'All Industries (52+ Leads)';
    const nichesList = (customer.targetNiches && customer.targetNiches.length) ? customer.targetNiches : ['all'];

    // Fetch custom Google Drive download link from admin settings or default
    let downloadLink = 'https://drive.google.com/drive/folders/176iX2P-7yT_demo_outreach_studio_pro';
    try {
      const settings = JSON.parse(localStorage.getItem('osp_site_settings')) || {};
      if (settings.downloadLink) downloadLink = settings.downloadLink;
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

      const newOrder = {
        id: `ORD-${Date.now().toString().slice(-4)}`,
        name: customer.name,
        phone: customer.phone,
        email: customer.email || 'N/A',
        targetNiches: nichesList,
        targetNichesDisplay: nichesDisplay,
        totalLeadsCount: customer.totalLeadsCount || 52,
        amount: 1999,
        gateway: 'Razorpay Live',
        paymentId: paymentId,
        licenseKey: randomKey,
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

    if (successWhatsAppBtn) {
      const waMsg = encodeURIComponent(
        `Hi Hamza, I have successfully paid Rs 1,999 for Outreach Studio Pro via Razorpay! 🎉\n\n` +
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
    const crmUrl = window.location.origin + '/crm';
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
