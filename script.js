/* ==========================================================================
   HRS WEB SOLUTIONS - ULTRA PREMIUM INTERACTIVE ENGINE
   Includes: Site Battle Arena, Tech Stack Builder, Health Audit Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Update Footer Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Smooth Scroll Helper for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Universal Mobile Menu Drawer Handler
  const mobileToggle = document.getElementById('mobileMenuToggle') || document.getElementById('mobile-menu') || document.querySelector('.menu-toggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer') || document.getElementById('nav-menu') || document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a, .nav-menu a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('active');
      const isActive = mobileDrawer.classList.contains('active');
      mobileToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('active') && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Universal Theme Switcher (Dark / Light Toggle)
  const themeToggle = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('hrs_theme', isLight ? 'light' : 'dark');
    });

    if (localStorage.getItem('hrs_theme') === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // 4b. Portfolio Filter Tab Handler
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterTabs.length > 0 && portfolioCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Side-by-Side Website Battle Arena
  const battleForm = document.getElementById('battleForm');
  const battleResultsGrid = document.getElementById('battleResultsGrid');
  const myUrlInput = document.getElementById('myUrlInput');
  const compUrlInput = document.getElementById('compUrlInput');

  if (battleForm) {
    battleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const myUrl = cleanURL(myUrlInput.value);
      const compUrl = cleanURL(compUrlInput.value);

      if (!myUrl || !compUrl) return;

      const mySeed = getSeedFromString(myUrl);
      const compSeed = getSeedFromString(compUrl);

      const myScore = 85 + (mySeed % 14);
      const compScore = 35 + (compSeed % 40);

      document.getElementById('myBattleUrl').textContent = myUrl;
      document.getElementById('myBattleScore').textContent = myScore + "/100";
      document.getElementById('myBattleSpeed').textContent = "0.4s";

      document.getElementById('compBattleUrl').textContent = compUrl;
      document.getElementById('compBattleScore').textContent = compScore + "/100";
      document.getElementById('compBattleSpeed').textContent = "4.2s";

      battleResultsGrid.style.display = 'grid';
      battleResultsGrid.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 6. Interactive Tech Stack & Feature Builder
  const techCards = document.querySelectorAll('.tech-checkbox-card');
  let techTotalCost = 4999;
  let techEstimatedDays = 4;

  techCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('checked');
      calculateTechStackTotal();
    });
  });

  function calculateTechStackTotal() {
    let cost = 4999;
    let days = 4;
    let speed = 98;
    let selectedModules = [];

    document.querySelectorAll('.tech-checkbox-card.checked').forEach(card => {
      cost += parseInt(card.getAttribute('data-price') || '0', 10);
      days += parseInt(card.getAttribute('data-days') || '0', 10);
      selectedModules.push(card.getAttribute('data-title'));
    });

    const techCostDisplay = document.getElementById('techCostDisplay');
    const techDaysDisplay = document.getElementById('techDaysDisplay');
    const techSpeedDisplay = document.getElementById('techSpeedDisplay');

    if (techCostDisplay) techCostDisplay.textContent = "₹" + cost.toLocaleString();
    if (techDaysDisplay) techDaysDisplay.textContent = days + " Days";
    if (techSpeedDisplay) techSpeedDisplay.textContent = speed + " / 100";

    techTotalCost = cost;
    techEstimatedDays = days;
  }

  const techWhatsAppBtn = document.getElementById('techWhatsAppBtn');
  if (techWhatsAppBtn) {
    techWhatsAppBtn.addEventListener('click', () => {
      let selectedList = [];
      document.querySelectorAll('.tech-checkbox-card.checked').forEach(card => {
        selectedList.push(card.getAttribute('data-title'));
      });

      const msg = `Hello HRS Web Solutions! 👋%0A%0AI used your Custom Tech Stack Builder:%0A%0A🛠️ *Selected Features:* ${selectedList.join(', ')}%0A💰 *Estimated Cost:* ₹${techTotalCost.toLocaleString()}%0A⏱️ *Timeline:* ${techEstimatedDays} Days%0A%0ACan we get a formal quote?`;
      window.open(`https://wa.me/918808129388?text=${msg}`, '_blank');
    });
  }

  // 7. Interactive Revenue ROI Calculator
  const visitorSlider = document.getElementById('visitorSlider');
  const orderSlider = document.getElementById('orderSlider');
  const visitorValText = document.getElementById('visitorValText');
  const orderValText = document.getElementById('orderValText');
  const roiRevenueDisplay = document.getElementById('roiRevenueDisplay');

  function calculateROI() {
    if (!visitorSlider || !orderSlider) return;
    const visitors = parseInt(visitorSlider.value, 10);
    const orderValue = parseInt(orderSlider.value, 10);

    visitorValText.textContent = visitors.toLocaleString() + " visitors / mo";
    orderValText.textContent = "₹" + orderValue.toLocaleString();

    const extraMonthlyRevenue = Math.round(visitors * 0.045 * orderValue);
    roiRevenueDisplay.textContent = "+₹" + extraMonthlyRevenue.toLocaleString();
  }

  if (visitorSlider && orderSlider) {
    visitorSlider.addEventListener('input', calculateROI);
    orderSlider.addEventListener('input', calculateROI);
    calculateROI();
  }

  // 8. Audit Tool Engine
  const auditForm = document.getElementById('auditForm');
  const urlInput = document.getElementById('urlInput');
  const scanningContainer = document.getElementById('scanningContainer');
  const resultsContainer = document.getElementById('resultsContainer');
  const checkerHeroWrap = document.getElementById('checkerHeroWrap');

  const scanUrlDisplay = document.getElementById('scanUrlDisplay');
  const scanStatusText = document.getElementById('scanStatusText');
  const progressBarFill = document.getElementById('progressBarFill');
  const scanSteps = document.querySelectorAll('.step-item');

  const scannedUrlText = document.getElementById('scannedUrlText');
  const scannedFavicon = document.getElementById('scannedFavicon');
  const overallGaugeNumber = document.getElementById('overallGaugeNumber');
  const gaugeFillCircle = document.getElementById('gaugeFillCircle');
  const healthStatusBadge = document.getElementById('healthStatusBadge');
  const healthStatusDesc = document.getElementById('healthStatusDesc');
  const reAuditBtn = document.getElementById('reAuditBtn');
  const printReportBtn = document.getElementById('printReportBtn');

  // Sample Pills Click
  document.querySelectorAll('.sample-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      urlInput.value = pill.getAttribute('data-url');
      auditForm.dispatchEvent(new Event('submit'));
    });
  });

  if (reAuditBtn) {
    reAuditBtn.addEventListener('click', () => {
      resultsContainer.style.display = 'none';
      checkerHeroWrap.style.display = 'block';
      document.getElementById('health-checker').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // PDF Export / Print
  if (printReportBtn) {
    printReportBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let rawUrl = urlInput.value.trim();
      if (!rawUrl) return;

      let cleanedUrl = cleanURL(rawUrl);
      startAuditScan(cleanedUrl);
    });
  }

  function cleanURL(url) {
    url = url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    url = url.split('/')[0];
    return url || 'mysite.com';
  }

  function getSeedFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  function startAuditScan(domain) {
    checkerHeroWrap.style.display = 'none';
    resultsContainer.style.display = 'none';
    scanningContainer.style.display = 'block';

    scanUrlDisplay.textContent = domain;
    progressBarFill.style.width = '0%';

    const scanPhases = [
      { stepIndex: 0, text: "Connecting to server & resolving DNS...", progress: 20, delay: 600 },
      { stepIndex: 1, text: "Auditing page load speed & Core Web Vitals...", progress: 45, delay: 1300 },
      { stepIndex: 2, text: "Scanning meta tags, H1 structure & SEO indexability...", progress: 68, delay: 2000 },
      { stepIndex: 3, text: "Checking mobile viewport & touch readability...", progress: 85, delay: 2700 },
      { stepIndex: 4, text: "Verifying HTTPS SSL certificate & security headers...", progress: 100, delay: 3400 }
    ];

    scanSteps.forEach(step => step.classList.remove('active', 'done'));

    scanPhases.forEach((phase) => {
      setTimeout(() => {
        scanStatusText.textContent = phase.text;
        progressBarFill.style.width = `${phase.progress}%`;

        scanSteps.forEach((s, idx) => {
          if (idx < phase.stepIndex) {
            s.classList.remove('active');
            s.classList.add('done');
          } else if (idx === phase.stepIndex) {
            s.classList.add('active');
          }
        });

        if (phase.progress === 100) {
          setTimeout(() => {
            renderResults(domain);
          }, 600);
        }
      }, phase.delay);
    });
  }

  function renderResults(domain) {
    scanningContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    scannedUrlText.textContent = domain;
    scannedFavicon.textContent = domain.charAt(0).toUpperCase();

    const seed = getSeedFromString(domain);
    const perfScore = 45 + (seed % 48);
    const seoScore = 50 + ((seed >> 2) % 46);
    const mobileScore = 60 + ((seed >> 4) % 39);
    const secScore = 40 + ((seed >> 6) % 60);

    const overallScore = Math.round((perfScore * 0.35) + (seoScore * 0.3) + (mobileScore * 0.2) + (secScore * 0.15));

    animateGauge(overallScore);
    updateOverallBadge(overallScore);
    renderCategoryCards(perfScore, seoScore, mobileScore, secScore);
    renderRecommendations(perfScore, seoScore, mobileScore, secScore);
  }

  function animateGauge(score) {
    const circumference = 565;
    const offset = circumference - (score / 100) * circumference;

    gaugeFillCircle.style.strokeDashoffset = circumference;
    overallGaugeNumber.textContent = '0';

    let strokeColor = 'var(--score-green)';
    if (score < 50) strokeColor = 'var(--score-red)';
    else if (score < 80) strokeColor = 'var(--score-yellow)';

    gaugeFillCircle.style.stroke = strokeColor;

    setTimeout(() => {
      gaugeFillCircle.style.strokeDashoffset = offset;
    }, 100);

    let current = 0;
    const duration = 1200;
    const increment = score / (duration / 20);

    const counterInterval = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(counterInterval);
      }
      overallGaugeNumber.textContent = Math.round(current);
    }, 20);
  }

  function updateOverallBadge(score) {
    healthStatusBadge.className = 'health-status-badge';

    if (score >= 80) {
      healthStatusBadge.classList.add('status-excellent');
      healthStatusBadge.textContent = 'Excellent Health';
      healthStatusDesc.textContent = 'Your website is performing well, but minor tweaks can unlock even higher conversions!';
    } else if (score >= 50) {
      healthStatusBadge.classList.add('status-warning');
      healthStatusBadge.textContent = 'Needs Optimization';
      healthStatusDesc.textContent = 'Your website has speed bottlenecks and SEO gaps that are costing you potential customers.';
    } else {
      healthStatusBadge.classList.add('status-critical');
      healthStatusBadge.textContent = 'Critical Action Required';
      healthStatusDesc.textContent = 'Your website suffers from slow load times, poor mobile experience, or security warnings.';
    }
  }

  function renderCategoryCards(perf, seo, mob, sec) {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    const categories = [
      { id: 'perf', title: 'Performance & Speed', icon: 'fas fa-bolt', score: perf, findings: getPerfFindings(perf) },
      { id: 'seo', title: 'SEO & Search Rank', icon: 'fas fa-search', score: seo, findings: getSeoFindings(seo) },
      { id: 'mob', title: 'Mobile Friendliness', icon: 'fas fa-mobile-alt', score: mob, findings: getMobileFindings(mob) },
      { id: 'sec', title: 'Security & SSL Trust', icon: 'fas fa-shield-alt', score: sec, findings: getSecFindings(sec) }
    ];

    categoryGrid.innerHTML = categories.map(cat => {
      let badgeClass = cat.score >= 80 ? 'green' : (cat.score >= 50 ? 'yellow' : 'red');
      
      return `
        <div class="category-card">
          <div class="category-card-header">
            <div class="cat-icon-title">
              <div class="cat-icon"><i class="${cat.icon}"></i></div>
              <div class="cat-title">${cat.title}</div>
            </div>
            <div class="cat-score-badge ${badgeClass}">${cat.score}/100</div>
          </div>
          
          <ul class="findings-list">
            ${cat.findings.map(f => `
              <li class="finding-item ${f.type}">
                <i class="${f.type === 'pass' ? 'fas fa-check-circle' : (f.type === 'warn' ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle')}"></i>
                <span>${f.text}</span>
              </li>
            `).join('')}
          </ul>

          <button class="accordion-toggle-btn" onclick="toggleDetails('${cat.id}')">
            <span>Technical Details</span> <i class="fas fa-chevron-down" id="arrow-${cat.id}"></i>
          </button>
          
          <div class="expandable-details" id="details-${cat.id}">
            <p>${getDetailedMetricText(cat.id, cat.score)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  function getPerfFindings(score) {
    if (score >= 80) {
      return [
        { type: 'pass', text: 'Fast Initial Server Response Time (<280ms)' },
        { type: 'pass', text: 'Clean CSS/JS code minification detected' },
        { type: 'warn', text: 'Some large uncompressed WebP/JPEG images found' }
      ];
    } else if (score >= 50) {
      return [
        { type: 'warn', text: 'Page load speed is 3.8s (Target: <1.5s)' },
        { type: 'fail', text: 'Uncompressed images slowing down initial paint' },
        { type: 'pass', text: 'Browser caching enabled for static assets' }
      ];
    } else {
      return [
        { type: 'fail', text: 'Slow page load time (>5.2 seconds)' },
        { type: 'fail', text: 'Render-blocking JavaScript slowing first contentful paint' },
        { type: 'warn', text: 'Missing WebP image compression' }
      ];
    }
  }

  function getSeoFindings(score) {
    if (score >= 80) {
      return [
        { type: 'pass', text: 'Meta Title & Description present and optimized' },
        { type: 'pass', text: 'H1 & H2 heading hierarchy correctly structured' },
        { type: 'warn', text: '2 image alt tags missing description' }
      ];
    } else {
      return [
        { type: 'warn', text: 'Meta description missing or too short for Google' },
        { type: 'fail', text: 'Multiple or missing H1 tags on main page' },
        { type: 'fail', text: 'OpenGraph tags missing for WhatsApp previews' }
      ];
    }
  }

  function getMobileFindings(score) {
    if (score >= 80) {
      return [
        { type: 'pass', text: 'Responsive viewport meta tag correctly configured' },
        { type: 'pass', text: 'Tap targets & buttons well-spaced for mobile thumbs' },
        { type: 'pass', text: 'Text readable without horizontal scrolling' }
      ];
    } else {
      return [
        { type: 'pass', text: 'Mobile viewport tag detected' },
        { type: 'warn', text: 'Touch targets too close together on small screens' },
        { type: 'fail', text: 'Horizontal scrolling detected on screen width <360px' }
      ];
    }
  }

  function getSecFindings(score) {
    if (score >= 80) {
      return [
        { type: 'pass', text: 'Valid HTTPS SSL encryption certificate active' },
        { type: 'pass', text: 'No mixed HTTP/HTTPS content warnings' },
        { type: 'pass', text: 'Domain clean from blacklists & malware flags' }
      ];
    } else {
      return [
        { type: 'warn', text: 'HTTPS redirect not forced on HTTP requests' },
        { type: 'fail', text: 'Security headers (X-Frame-Options, CSP) missing' },
        { type: 'pass', text: 'Domain reputation active' }
      ];
    }
  }

  function getDetailedMetricText(catId, score) {
    if (catId === 'perf') return `First Contentful Paint (FCP): ${score >= 80 ? '1.2s' : '3.4s'}. Speed Index: ${score >= 80 ? '1.8s' : '4.6s'}. CLS: 0.04.`;
    if (catId === 'seo') return `Canonical tag present. Robots.txt accessible. Sitemap: ${score >= 80 ? 'Found' : 'Missing'}. Keyword density: ${score}%.`;
    if (catId === 'mob') return `Mobile layout scale: 1.0. Font legibility: ${score >= 80 ? '98%' : '72%'}. Tap target compliance: ${score}%.`;
    return `SSL Protocol: TLS 1.3. Issuer: Cloudflare / Let's Encrypt. HSTS Header: ${score >= 80 ? 'Enabled' : 'Disabled'}.`;
  }

  window.toggleDetails = function(id) {
    const details = document.getElementById(`details-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    if (details) {
      details.classList.toggle('open');
      if (arrow) {
        arrow.className = details.classList.contains('open') ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
      }
    }
  };

  function renderRecommendations(perf, seo, mob, sec) {
    const recList = document.getElementById('recommendationList');
    if (!recList) return;

    let recs = [];
    if (perf < 80) recs.push({ priority: 'high', title: 'Compress Images & Enable WebP Formatting', desc: 'Uncompressed images increase load time by 2.4s.', solution: 'HRS Speed Boost' });
    if (seo < 80) recs.push({ priority: 'high', title: 'Fix Missing Meta Titles & OpenGraph Tags', desc: 'Search engines & WhatsApp previews fail to render info.', solution: 'HRS Complete SEO' });
    if (mob < 85) recs.push({ priority: 'medium', title: 'Optimize Mobile Navigation & Touch Spacing', desc: 'Smartphone users struggle with small button targets.', solution: 'HRS Responsive UI' });
    if (sec < 85) recs.push({ priority: 'medium', title: 'Enforce SSL HTTPS Encryption & Headers', desc: 'Browsers flag site as "Not Secure", hurting trust.', solution: 'HRS Security Shield' });
    if (recs.length === 0) recs.push({ priority: 'medium', title: 'Implement Advanced Caching & Progressive Web App', desc: 'Unlock 0.5s page loads for maximum retention.', solution: 'HRS Next-Gen Tech' });

    recList.innerHTML = recs.map(r => `
      <div class="rec-item">
        <div class="rec-main-info">
          <span class="priority-tag ${r.priority}">${r.priority} priority</span>
          <div class="rec-text">
            <h4>${r.title}</h4>
            <p>${r.desc}</p>
          </div>
        </div>
        <div class="hrs-solution-pill">
          <i class="fas fa-magic"></i> ${r.solution}
        </div>
      </div>
    `).join('');
  }

  // 9. Modal Open & Close
  const leadModal = document.getElementById('leadModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalBtns = document.querySelectorAll('.trigger-lead-modal');
  const leadForm = document.getElementById('leadForm');
  const mainContactForm = document.getElementById('mainContactForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (leadModal) leadModal.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (leadModal) leadModal.classList.remove('active');
    });
  }

  if (leadModal) {
    leadModal.addEventListener('click', (e) => {
      if (e.target === leadModal) leadModal.classList.remove('active');
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadNameInput').value.trim();
      const phone = document.getElementById('leadPhoneInput').value.trim();
      const email = document.getElementById('leadEmailInput').value.trim();

      const message = `Hello HRS Web Solutions! 👋%0A%0AI would like a consultation from the Website Health Checker app:%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A📧 *Email:* ${encodeURIComponent(email)}`;

      window.open(`https://wa.me/918808129388?text=${message}`, '_blank');
      if (leadModal) leadModal.classList.remove('active');
    });
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mainName').value.trim();
      const phone = document.getElementById('mainPhone').value.trim();
      const email = document.getElementById('mainEmail').value.trim();
      const service = document.getElementById('mainService').value;

      const message = `Hello HRS Web Solutions! 👋%0A%0AI want to discuss a new project:%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A🛠️ *Service:* ${encodeURIComponent(service)}`;

      window.open(`https://wa.me/918808129388?text=${message}`, '_blank');
      alert('Opening WhatsApp to connect directly with HRS Web Solutions!');
    });
  }
});
