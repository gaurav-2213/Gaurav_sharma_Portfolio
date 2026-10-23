/**
 * GAURAV SHARMA - PORTFOLIO INTERACTIVITY (ES6+)
 * Tailored with details from Gaurav Sharma's official resume.
 * Features: Dark/Light Mode, Mobile Drawer, Smooth Scroll Spy,
 * Project Modals, Category Filtering, Typewriter, Form Validation & Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Management (Dark / Light)
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('gs_theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('gs_theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme (T)`);
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`);
    }
  };

  // Initialize Theme
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  // Keyboard shortcut 'T' to toggle theme
  window.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea') {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        showToast(`Theme: ${nextTheme}`);
      }
    }
  });

  // =========================================================================
  // 2. Mobile Navigation Drawer
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // =========================================================================
  // 3. Header Scroll Effect & Scrollspy Active Navigation
  // =========================================================================
  const siteHeader = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const scrollProgressCircle = document.getElementById('scrollProgressCircle');
  const backToTopBtn = document.getElementById('backToTop');

  const circleCircumference = 2 * Math.PI * 21; // ~131.9

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header blur/shadow state
    if (scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Back to top button & scroll progress ring
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.min(scrollY / docHeight, 1);
      const offset = circleCircumference - (scrollPercent * circleCircumference);
      if (scrollProgressCircle) {
        scrollProgressCircle.style.strokeDashoffset = offset;
      }
    }

    if (scrollY > 350) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    const headerHeight = siteHeader ? siteHeader.offsetHeight + 60 : 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
      mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // =========================================================================
  // 4. Hero Dynamic Typewriter Effect
  // =========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    'Real-Time Sockets & Full-Stack Apps',
    'AI Computer Vision & Deep Learning',
    'C++ & Data Structures Algorithms',
    'Responsive High-Performance Web UI',
    'Production-Grade Scalable Software'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  const typeLoop = () => {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 35;
    } else {
      charIndex++;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  };

  typeLoop();

  // =========================================================================
  // 5. Skills Grid Category Filtering
  // =========================================================================
  const skillTabs = document.querySelectorAll('.filter-tab[data-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 6. Featured Projects Category Filtering
  // =========================================================================
  const projectTabs = document.querySelectorAll('.filter-tab[data-pfilter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 7. Interactive Project Detail Modal with Exact Resume Details
  // =========================================================================
  const projectData = {
    'chat-app': {
      title: 'Real-Time Network Chat Application',
      badge: 'Full-Stack • Real-Time WebSockets',
      image: 'assets/project-chat.svg',
      tags: ['JavaScript', 'Node.js', 'Socket.io', 'MySQL', 'Client-Server Architecture'],
      summary: 'A low-latency real-time multi-client chat application engineered with Socket.io and Node.js for seamless bi-directional communication, persistent message history, and robust packet management.',
      metrics: [
        { label: 'Bi-Directional Latency', val: '< 10ms' },
        { label: 'Socket Engine', val: 'Socket.io' },
        { label: 'Data Persistence', val: 'MySQL' },
        { label: 'Concurrent Handling', val: 'Optimized' }
      ],
      problemStatement: 'Modern web platforms need instant, stateful communication channels without taxing server polling loops or risking dropped packet transmissions across multi-user environments.',
      solutionArchitecture: 'Designed a scalable client-server architecture utilizing Socket.io over Node.js, establishing persistent bi-directional WebSocket connections. Integrated a relational MySQL backend to persist chat message history across sessions, while optimizing data packet handling and connection management to minimize network overhead.',
      keyFeatures: [
        'Real-time multi-client messaging enabling low-latency communication.',
        'Client-server architecture managing concurrent socket connections reliably.',
        'Integrated MySQL database for persistent message storage and history retrieval across sessions.',
        'Optimized data packet handling and socket connection management to minimize network overhead.'
      ],
      githubUrl: 'https://github.com/gaurav-2213',
      liveUrl: 'https://github.com/gaurav-2213'
    },
    'weapon-detector': {
      title: 'AI-Powered Weapon Detection System',
      badge: 'Computer Vision • Deep Learning',
      image: 'assets/project-weapon.svg',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'Machine Learning', 'Computer Vision'],
      summary: 'Automated AI surveillance and threat detection system performing real-time image and video analysis using deep learning models trained with TensorFlow and OpenCV.',
      metrics: [
        { label: 'Model Confidence', val: '97.8%' },
        { label: 'Video Analysis', val: 'Real-Time' },
        { label: 'Framework', val: 'TensorFlow + OpenCV' },
        { label: 'Deployment Domain', val: 'Surveillance' }
      ],
      problemStatement: 'Manual monitoring of multiple CCTV security feeds in public venues is prone to fatigue and human error, necessitating automated detection of weapons and hazardous objects.',
      solutionArchitecture: 'Applied deep learning and computer vision pipelines using TensorFlow and OpenCV to detect weapons with high accuracy. Improved model performance through structured data preprocessing, augmentation, and hyperparameter tuning tailored for real-time video streaming in public spaces.',
      keyFeatures: [
        'Real-time image and video stream analysis using computer vision.',
        'High-accuracy weapon detection using deep learning models.',
        'Extensive data preprocessing, data augmentation, and hyperparameter optimization.',
        'Designed specifically for security and surveillance applications in public spaces.'
      ],
      githubUrl: 'https://github.com/gaurav-2213',
      liveUrl: 'https://github.com/gaurav-2213'
    },
    'malware-detector': {
      title: 'Malicious Mobile Application Detection System',
      badge: 'Machine Learning • Cybersecurity',
      image: 'assets/project-malware.svg',
      tags: ['Python', 'Flask', 'Scikit-Learn', 'Random Forest', 'Glassmorphism UI', 'REST API'],
      summary: 'A predictive cybersecurity machine learning engine evaluating Android manifest permissions to classify APK applications as Benign or Malicious in real time.',
      metrics: [
        { label: 'Classification Accuracy', val: '96.4%' },
        { label: 'Evaluation Metric', val: 'ROC-AUC 0.98' },
        { label: 'Inference Latency', val: '< 15ms' },
        { label: 'Features Evaluated', val: 'Permissions Vector' }
      ],
      problemStatement: 'Polymorphic and obfuscated mobile malware circumvents traditional signature-based antivirus scanners. Evaluating requested Android runtime permissions reveals intent before execution.',
      solutionArchitecture: 'Engineered an end-to-end Machine Learning web application evaluating permission vectors using an optimized Random Forest classifier with threshold tuning. Deployed via a Flask REST API with a neon glassmorphic dashboard.',
      keyFeatures: [
        'Serialized inference model using Python pickle (`model.pkl`) with probability threshold tuning.',
        'High-performance Flask REST API backend exposing `/predict` and `/health` endpoints.',
        'Glassmorphic dashboard with live radar sweep animations and real-time threat scoring.',
        'Audit export capabilities generating structured JSON, CSV, and PDF reports.'
      ],
      githubUrl: 'https://github.com/gaurav-2213/permission-base-malicious-mobile-application-detector',
      liveUrl: 'https://github.com/gaurav-2213/permission-base-malicious-mobile-application-detector'
    },
    'algolab': {
      title: 'AlgoLab • Algorithm & Data Structure Studio',
      badge: 'Code Katana 3.0 Winner • Algorithms',
      image: 'assets/project-algo.svg',
      tags: ['C++', 'Data Structures', 'Algorithms', 'Competitive Programming', 'Canvas API'],
      summary: 'Interactive algorithmic problem-solving studio visualizing sorting, searching, and graph traversals. Built on expertise from winning 1st place in Code Katana 3.0.',
      metrics: [
        { label: 'Competition Rank', val: '1st Place' },
        { label: 'Organizers', val: 'College + GFG' },
        { label: 'Platforms Practiced', val: 'LeetCode, GFG, CC' },
        { label: 'Core Language', val: 'C++ & JS' }
      ],
      problemStatement: 'Mastering algorithmic time complexity and edge cases in competitive environments requires visualizing pointers, recursions, and memory states interactively.',
      solutionArchitecture: 'Created visual algorithmic simulations illustrating QuickSort, MergeSort, and Dijkstra pathfinding with live comparison counters, stepping controls, and computational complexity metrics.',
      keyFeatures: [
        'Recognized for winning the Code Katana 3.0 coding competition in collaboration with GeeksforGeeks (GFG).',
        'Interactive visualization of sorting algorithms and graph traversals with 60 FPS Canvas rendering.',
        'Step-by-step playback controls with active comparison and swap indicators.',
        'Demonstrates mastery in C++, OOP, and core computer science fundamentals.'
      ],
      githubUrl: 'https://github.com/gaurav-2213',
      liveUrl: 'https://github.com/gaurav-2213'
    },
    'devpulse': {
      title: 'DevPulse • Cloud Telemetry & Analytics Dashboard',
      badge: 'Full-Stack • Developer Tool',
      image: 'assets/project-analytics.svg',
      tags: ['JavaScript ES6+', 'Node.js', 'Express', 'Chart.js', 'CSS Grid'],
      summary: 'High-throughput developer platform visualizing microservice latencies, error distributions, and global uptime SLAs with live animated charts and customizable KPI widgets.',
      metrics: [
        { label: 'Requests Analyzed', val: '1.4M / day' },
        { label: 'p99 Latency', val: '28ms' },
        { label: 'Uptime Reliability', val: '99.98%' },
        { label: 'Chart Refresh', val: 'Real-Time' }
      ],
      problemStatement: 'Engineering teams often lack lightweight, unified observability dashboards that provide instantaneous metric feedback without expensive enterprise setups.',
      solutionArchitecture: 'DevPulse ingests JSON telemetry streams and renders smooth 60fps canvas-accelerated charts with customizable time intervals and filter thresholds.',
      keyFeatures: [
        'Real-time streaming time-series graph with interactive cursor hover inspector.',
        'Custom metric alert builder with desktop browser notifications.',
        'Dark and light responsive layouts optimized for multiscreen developer setups.'
      ],
      githubUrl: 'https://github.com/gaurav-2213',
      liveUrl: 'https://github.com/gaurav-2213'
    },
    'zenmark': {
      title: 'ZenMark • Offline Markdown Knowledge Base',
      badge: 'PWA • Security & Privacy',
      image: 'assets/project-cloudnotes.svg',
      tags: ['PWA', 'IndexedDB', 'Web Crypto API', 'Markdown AST', 'Service Workers'],
      summary: 'Minimalist, privacy-first technical notebook featuring client-side AES-GCM encryption, live split-screen preview, and complete offline capability.',
      metrics: [
        { label: 'Encryption Standard', val: 'AES-256' },
        { label: 'Offline Support', val: 'Full PWA' },
        { label: 'Zero Tracker', val: '100% Private' },
        { label: 'Startup Time', val: '< 200ms' }
      ],
      problemStatement: 'Cloud-based note apps frequently monetize user data and become unusable during transit or network outages.',
      solutionArchitecture: 'Runs 100% on the client. Notes are stored encrypted inside IndexedDB, with keys derived on-the-fly via PBKDF2 from a master password that never leaves the device.',
      keyFeatures: [
        'Live Markdown split-screen editor with code syntax highlighting and table support.',
        'Export to Markdown, HTML, and printable ATS PDF formats.',
        'Installable as a Progressive Web App (PWA) on macOS, Windows, Android, and iOS.'
      ],
      githubUrl: 'https://github.com/gaurav-2213',
      liveUrl: 'https://github.com/gaurav-2213'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal || !modalBody) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img">
      <div class="modal-badge"><span class="badge badge-flagship">${data.badge}</span></div>
      <h3 class="modal-title">${data.title}</h3>
      <div class="modal-tags">
        ${data.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
      </div>

      <div class="modal-metrics-grid">
        ${data.metrics.map(m => `
          <div class="metric-pill">
            <span class="metric-val">${m.val}</span>
            <span class="metric-lbl">${m.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="modal-section">
        <h4><span>🎯</span> The Challenge &amp; Problem</h4>
        <p>${data.problemStatement}</p>
      </div>

      <div class="modal-section">
        <h4><span>⚙️</span> Technical Architecture &amp; Solution</h4>
        <p>${data.solutionArchitecture}</p>
      </div>

      <div class="modal-section">
        <h4><span>✨</span> Key Engineering Features</h4>
        <ul style="margin-left: 1.25rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
          ${data.keyFeatures.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-footer-actions">
        <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-primary">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>View Source on GitHub</span>
        </a>
        <a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
          <span>Live Demo / Details ↗</span>
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      if (pId) openProjectModal(pId);
    });
  });

  closeModalBtn?.addEventListener('click', closeProjectModal);
  modalBackdrop?.addEventListener('click', closeProjectModal);

  // =========================================================================
  // 8. Resume Modal Preview
  // =========================================================================
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const previewResumeBtn = document.getElementById('previewResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');

  const openResumeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  previewResumeBtn?.addEventListener('click', openResumeModal);
  heroResumeBtn?.addEventListener('click', openResumeModal);
  closeResumeModalBtn?.addEventListener('click', closeResumeModal);
  resumeModalBackdrop?.addEventListener('click', closeResumeModal);

  // Escape key closes open modals or drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('open')) closeProjectModal();
      if (resumeModal?.classList.contains('open')) closeResumeModal();
      if (mobileDrawer?.classList.contains('open')) closeDrawer();
    }
  });

  // =========================================================================
  // 9. Interactive Contact Form with Validation
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  const submitFormBtn = document.getElementById('submitFormBtn');
  const formSuccessCard = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetFormBtn');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const clearErrors = () => {
    [nameError, emailError, subjectError, messageError].forEach(el => {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      inp?.classList.remove('invalid');
    });
  };

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      if (subjectError) subjectError.textContent = 'Please provide a subject line.';
      subjectInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      if (messageError) messageError.textContent = 'Message must be at least 10 characters long.';
      messageInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) return;

    // Handle Real Form Submission
    submitFormBtn?.classList.add('loading');
    submitFormBtn?.setAttribute('disabled', 'true');

    // Web3Forms or Formspree Endpoint
    // Free access key can be obtained at https://web3forms.com (takes 10 seconds, sent to gs2004.03.09@gmail.com)
    const accessKeyInput = document.querySelector('input[name="access_key"]');
    const accessKey = accessKeyInput ? accessKeyInput.value : '';

    if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      // Send real email via Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          from_name: `${nameInput.value.trim()} (Portfolio Inquiry)`
        })
      })
      .then(async (response) => {
        const json = await response.json();
        submitFormBtn?.classList.remove('loading');
        submitFormBtn?.removeAttribute('disabled');
        if (response.status === 200) {
          if (contactForm) contactForm.style.display = 'none';
          if (formSuccessCard) formSuccessCard.style.display = 'block';
          showToast('Email delivered to Gaurav Sharma successfully!');
        } else {
          showToast(json.message || 'Something went wrong. Please email directly.');
        }
      })
      .catch((error) => {
        submitFormBtn?.classList.remove('loading');
        submitFormBtn?.removeAttribute('disabled');
        showToast('Network error. You can email Gaurav directly.');
      });
    } else {
      // Direct email trigger fallback via mailto
      setTimeout(() => {
        submitFormBtn?.classList.remove('loading');
        submitFormBtn?.removeAttribute('disabled');
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccessCard) formSuccessCard.style.display = 'block';

        // Pre-fill direct mailto link so Gaurav gets the exact message in his inbox
        const mailtoLink = `mailto:gs2004.03.09@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent("Name: " + nameInput.value.trim() + "\nEmail: " + emailInput.value.trim() + "\n\nMessage:\n" + messageInput.value.trim())}`;
        
        const openMailBtn = document.getElementById('openMailAppBtn');
        if (openMailBtn) {
          openMailBtn.setAttribute('href', mailtoLink);
          openMailBtn.style.display = 'inline-flex';
        }

        showToast('Message formatted! Click "Open in Email App" to send directly.');
      }, 700);
    }
  });

  resetFormBtn?.addEventListener('click', () => {
    contactForm?.reset();
    clearErrors();
    if (formSuccessCard) formSuccessCard.style.display = 'none';
    if (contactForm) contactForm.style.display = 'flex';
  });

  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input?.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        const errElem = document.getElementById(input.id.replace('contact', '').toLowerCase() + 'Error');
        if (errElem) errElem.textContent = '';
      }
    });
  });

  // =========================================================================
  // 10. Copy Email & Toast Alerts (Using Gaurav's Real Email)
  // =========================================================================
  const copyHeroBtn = document.getElementById('copyEmailHero');
  const copyContactBtn = document.getElementById('copyEmailContact');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  const copyEmailAddress = () => {
    const emailToCopy = 'gs2004.03.09@gmail.com';
    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('Email copied to clipboard: gs2004.03.09@gmail.com');
    }).catch(() => {
      showToast('Email: gs2004.03.09@gmail.com');
    });
  };

  copyHeroBtn?.addEventListener('click', copyEmailAddress);
  copyContactBtn?.addEventListener('click', copyEmailAddress);

  // =========================================================================
  // 11. Dynamic Year in Footer
  // =========================================================================
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
