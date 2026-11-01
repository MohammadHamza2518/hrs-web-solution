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

  // Razorpay Payment Trigger using BlackRoots Live API Key
  window.handleRazorpaySubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    startRazorpayPayment();
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
        handlePaymentSuccess(response, { name, phone: cleanPhone, email });
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
  window.handlePaymentSuccess = function(response, customer) {
    const paymentId = response.razorpay_payment_id || ('pay_' + Date.now());
    const randomKey = `OSP-PRO-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-LIVE`;

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
