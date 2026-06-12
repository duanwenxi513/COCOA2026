// ========== Language State ==========
var currentLang = localStorage.getItem('isar2026-lang') || 'zh';

// ========== Translate Page ==========
function translatePage(lang) {
  currentLang = lang;
  localStorage.setItem('isar2026-lang', lang);
  document.documentElement.lang = lang;

  // Update title per page
  var pageMap = {
    home: 'index.html',
    about: 'about.html',
    organization: 'organization.html',
    cfp: 'call-for-papers.html',
    program: 'program.html',
    speakers: 'speakers.html',
    registration: 'registration.html',
    contact: 'contact.html'
  };
  var currentPage = Object.keys(pageMap).find(function(k) {
    return window.location.pathname.indexOf(pageMap[k]) > -1;
  }) || 'home';
  var titles = {
    zh: {
      home: '首页 - COCOA 2026',
      about: '会议介绍 - COCOA 2026',
      organization: '组织委员会 - COCOA 2026',
      cfp: '征文通知 - COCOA 2026',
      program: '会议日程 - COCOA 2026',
      speakers: '大会报告人 - COCOA 2026',
      registration: '会议注册 - COCOA 2026',
      contact: '联系方式 - COCOA 2026'
    },
    en: {
      home: 'Home - COCOA 2026',
      about: 'About - COCOA 2026',
      organization: 'Organization - COCOA 2026',
      cfp: 'Call for Papers - COCOA 2026',
      program: 'Program - COCOA 2026',
      speakers: 'Keynote Speakers - COCOA 2026',
      registration: 'Registration - COCOA 2026',
      contact: 'Contact - COCOA 2026'
    }
  };
  document.title = titles[lang][currentPage];

  // Translate text content
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (i18nData[lang] && i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  // Update lang switcher button
  var btn = document.getElementById('langSwitch');
  if (btn) { btn.textContent = lang === 'zh' ? 'EN' : '中文'; }

  // Update menu toggle
  var menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.setAttribute('aria-label', lang === 'zh' ? '菜单' : 'Menu');
    var menuIcon = menuToggle.querySelector('.menu-icon');
    if (menuIcon) menuIcon.textContent = '☰';
  }
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', function() {
  translatePage(currentLang);

  // Language switch button
  var langBtn = document.getElementById('langSwitch');
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      translatePage(currentLang === 'zh' ? 'en' : 'zh');
    });
  }

  // Mobile menu toggle
  var menuToggle = document.getElementById('menuToggle');
  var navbarLinks = document.getElementById('navbarLinks');
  if (menuToggle && navbarLinks) {
    menuToggle.addEventListener('click', function() {
      navbarLinks.classList.toggle('open');
    });
    navbarLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navbarLinks.classList.remove('open');
      });
    });
  }

  // Registration form
  var form = document.getElementById('registrationForm');
  var success = document.getElementById('successMessage');
  if (form && success) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      // Scroll to success message
      success.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
