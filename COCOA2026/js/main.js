// ========== Language State ==========
var currentLang = localStorage.getItem('cocoa2026-lang') || 'zh';

// ========== Translate Page ==========
function translatePage(lang) {
  currentLang = lang;
  localStorage.setItem('cocoa2026-lang', lang);
  document.documentElement.lang = lang;

  // Update title per page
  var pageMap = {
    home: 'index.html',
    about: 'about.html',
    organization: 'organization.html',
    cfp: 'call-for-papers.html',
    program: 'program.html',
    news: 'news.html',
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
      news: '会议新闻 - COCOA 2026',
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
      news: 'News - COCOA 2026',
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

  // Re-render news list if on news page
  if (typeof renderNewsList === 'function') renderNewsList();
}

// ========== News Module ==========
var newsItems = [];
var currentNewsPage = 1;
var newsPerPage = 5;

// Get localized news items
function getNewsItems(lang) {
  if (i18nData[lang] && i18nData[lang]['news.items']) {
    return i18nData[lang]['news.items'];
  }
  return [];
}

// Render news list with pagination
function renderNewsList() {
  var listEl = document.getElementById('newsList');
  var pagEl = document.getElementById('pagInation');
  if (!listEl) return;

  newsItems = getNewsItems(currentLang);
  newsPerPage = 5;
  var totalPages = Math.ceil(newsItems.length / newsPerPage);

  // Ensure current page is valid
  if (currentNewsPage < 1) currentNewsPage = 1;
  if (currentNewsPage > totalPages) currentNewsPage = totalPages;

  var start = (currentNewsPage - 1) * newsPerPage;
  var pageItems = newsItems.slice(start, start + newsPerPage);

  // Build list HTML
  var html = '';
  pageItems.forEach(function(item, i) {
    var idx = start + i;
    html += '<div class="news-list-item">';
    html += '<a href="news-detail.html?id=' + idx + '">' + item.title + '</a>';
    html += '<span class="news-date">' + item.date + '</span>';
    html += '</div>';
  });
  listEl.innerHTML = html;

  // Build pagination
  if (pagEl) {
    var pagHtml = '';
    var langData = i18nData[currentLang];
    if (totalPages > 1) {
      // Previous
      if (currentNewsPage > 1) {
        pagHtml += '<a href="#" data-page="' + (currentNewsPage - 1) + '">' + langData['news.prev'] + '</a>';
      } else {
        pagHtml += '<span class="disabled">' + langData['news.prev'] + '</span>';
      }
      // Page numbers
      for (var p = 1; p <= totalPages; p++) {
        if (p === currentNewsPage) {
          pagHtml += '<span class="current">' + p + '</span>';
        } else {
          pagHtml += '<a href="#" data-page="' + p + '">' + p + '</a>';
        }
      }
      // Next
      if (currentNewsPage < totalPages) {
        pagHtml += '<a href="#" data-page="' + (currentNewsPage + 1) + '">' + langData['news.next'] + '</a>';
      } else {
        pagHtml += '<span class="disabled">' + langData['news.next'] + '</span>';
      }
    }
    pagEl.innerHTML = pagHtml;

    // Bind click events
    pagEl.querySelectorAll('a[data-page]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        currentNewsPage = parseInt(this.getAttribute('data-page'));
        renderNewsList();
        // Scroll to top of list
        listEl.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

// Render news detail page
function renderNewsDetail() {
  var detailEl = document.getElementById('newsDetail');
  if (!detailEl) return;

  var urlParams = new URLSearchParams(window.location.search);
  var id = parseInt(urlParams.get('id'));
  var items = getNewsItems(currentLang);

  if (isNaN(id) || id < 0 || id >= items.length) {
    detailEl.innerHTML = '<p>未找到该新闻。</p>';
    return;
  }

  var item = items[id];
  var langData = i18nData[currentLang];
  var html = '';
  html += '<a href="news.html" class="news-back-link">' + langData['news.back_list'] + '</a>';
  html += '<h2>' + item.title + '</h2>';
  html += '<p class="news-detail-meta">' + item.date + '</p>';
  html += '<div class="news-detail-body">' + item.content + '</div>';
  detailEl.innerHTML = html;
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

  // News module
  renderNewsList();
  renderNewsDetail();

  // Registration form
  var form = document.getElementById('registrationForm');
  var success = document.getElementById('successMessage');
  if (form && success) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
