/**
 * Theme Switcher - Qaranlıq və İşıqlı Rejim Dəyişdirici
 * GitHub Profile üçün dinamik rejim dəyişdirici
 */

class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.themeKey = 'github-profile-theme';
    this.themes = {
      light: {
        name: 'light',
        displayName: 'İşıqlı Rejim',
        icon: '☀️',
        cssFile: 'assets/styles/profile-light.css'
      },
      dark: {
        name: 'dark',
        displayName: 'Qaranlıq Rejim', 
        icon: '🌙',
        cssFile: 'assets/styles/profile-dark.css'
      },
      auto: {
        name: 'auto',
        displayName: 'Avtomatik',
        icon: '🌓',
        cssFile: null // System preference-ə əsasən
      }
    };
    
    this.init();
  }

  /**
   * Theme Switcher-i işə salır
   */
  init() {
    this.createThemeButton();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.setupSystemThemeWatcher();
    this.updateBadgeImages();
  }

  /**
   * Sistemdən mövcud rejimi alır
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Saxlanmış rejimi localStorage-dən alır
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(this.themeKey);
    } catch (error) {
      console.warn('LocalStorage mövcud deyil:', error);
      return null;
    }
  }

  /**
   * Rejimi localStorage-də saxlayır
   */
  storeTheme(theme) {
    try {
      localStorage.setItem(this.themeKey, theme);
    } catch (error) {
      console.warn('Theme saxlanıla bilmədi:', error);
    }
  }

  /**
   * Theme button yaradır
   */
  createThemeButton() {
    // Əgər button artıq mövcuddursa, geri qayıt
    if (document.getElementById('theme-switcher')) return;

    const button = document.createElement('button');
    button.id = 'theme-switcher';
    button.className = 'theme-switcher-btn';
    button.setAttribute('aria-label', 'Rejimi dəyişdir');
    button.setAttribute('title', 'Rejimi dəyişdir');
    
    // Button stilləri
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: var(--bg-tertiary, #f1f3f4);
      border: 2px solid var(--border-primary, #d0d7de);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px var(--shadow-medium, rgba(0,0,0,0.1));
      backdrop-filter: blur(10px);
    `;

    // Hover effekti
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 6px 20px var(--shadow-heavy, rgba(0,0,0,0.2))';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px var(--shadow-medium, rgba(0,0,0,0.1))';
    });

    // Click event
    button.addEventListener('click', () => this.toggleTheme());

    // Dropdown menu yaradır
    this.createThemeDropdown(button);

    // Body-ə əlavə et
    document.body.appendChild(button);

    this.updateButtonContent();
  }

  /**
   * Theme dropdown menu yaradır
   */
  createThemeDropdown(button) {
    const dropdown = document.createElement('div');
    dropdown.id = 'theme-dropdown';
    dropdown.className = 'theme-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: 60px;
      right: 0;
      background: var(--bg-secondary, #f6f8fa);
      border: 1px solid var(--border-primary, #d0d7de);
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 8px 24px var(--shadow-heavy, rgba(0,0,0,0.15));
      display: none;
      min-width: 150px;
      backdrop-filter: blur(10px);
    `;

    Object.values(this.themes).forEach(theme => {
      const option = document.createElement('button');
      option.className = 'theme-option';
      option.textContent = `${theme.icon} ${theme.displayName}`;
      option.style.cssText = `
        display: block;
        width: 100%;
        padding: 8px 12px;
        background: none;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: left;
        color: var(--text-primary, #24292f);
        font-size: 14px;
        transition: background-color 0.2s ease;
      `;

      option.addEventListener('mouseenter', () => {
        option.style.backgroundColor = 'var(--bg-tertiary, #f1f3f4)';
      });

      option.addEventListener('mouseleave', () => {
        option.style.backgroundColor = 'transparent';
      });

      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setTheme(theme.name);
        this.hideDropdown();
      });

      dropdown.appendChild(option);
    });

    button.style.position = 'relative';
    button.appendChild(dropdown);

    // Dropdown göstər/gizlə
    button.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.toggleDropdown();
    });

    // Bayırda click olunanda dropdown-u gizlət
    document.addEventListener('click', (e) => {
      if (!button.contains(e.target)) {
        this.hideDropdown();
      }
    });
  }

  /**
   * Dropdown-u göstərir/gizlədir
   */
  toggleDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown) {
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
    }
  }

  /**
   * Dropdown-u gizlədir
   */
  hideDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  }

  /**
   * Button məzmununu yeniləyir
   */
  updateButtonContent() {
    const button = document.getElementById('theme-switcher');
    if (button) {
      const theme = this.themes[this.currentTheme];
      button.textContent = theme ? theme.icon : '🌓';
      button.setAttribute('title', `Hazırda: ${theme ? theme.displayName : 'Avtomatik'}`);
    }
  }

  /**
   * Rejimi tətbiq edir
   */
  applyTheme(themeName) {
    const resolvedTheme = themeName === 'auto' ? this.getSystemTheme() : themeName;
    
    // CSS faylını yüklə
    this.loadThemeCSS(resolvedTheme);
    
    // HTML data atributunu yenilə
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.body.setAttribute('data-theme', resolvedTheme);
    
    // Meta tag-i yenilə
    this.updateThemeMetaTag(resolvedTheme);
    
    // Badge şəkillərini yenilə
    this.updateBadgeImages();
    
    // GitHub stats şəkillərini yenilə
    this.updateGitHubStats(resolvedTheme);
    
    this.currentTheme = themeName;
    this.storeTheme(themeName);
    this.updateButtonContent();
    
    // Event emit et
    this.emitThemeChangeEvent(resolvedTheme);
  }

  /**
   * Theme CSS faylını yüklər
   */
  loadThemeCSS(theme) {
    // Köhnə theme CSS-i sil
    const existingLink = document.querySelector('link[data-theme-css]');
    if (existingLink) {
      existingLink.remove();
    }

    // Yeni theme CSS-i əlavə et
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `assets/styles/profile-${theme}.css`;
    link.setAttribute('data-theme-css', theme);
    link.onload = () => {
      console.log(`${theme} theme yükləndi`);
    };
    link.onerror = () => {
      console.error(`${theme} theme yüklənə bilmədi`);
    };

    document.head.appendChild(link);
  }

  /**
   * Theme meta tag-ini yeniləyir
   */
  updateThemeMetaTag(theme) {
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      document.head.appendChild(metaTag);
    }
    
    const themeColors = {
      light: '#ffffff',
      dark: '#0d1117'
    };
    
    metaTag.content = themeColors[theme] || themeColors.dark;
  }

  /**
   * Badge şəkillərini rejimə uyğun yeniləyir
   */
  updateBadgeImages() {
    const badges = document.querySelectorAll('.badge-item img');
    badges.forEach(badge => {
      const src = badge.src;
      // Badge URL-lərində theme parametrini yenilə
      if (src.includes('shields.io')) {
        // shields.io badge-ləri üçün labelColor parametrini yenilə
        const url = new URL(src);
        if (this.currentTheme === 'dark') {
          url.searchParams.set('labelColor', '1F2937');
        } else {
          url.searchParams.set('labelColor', 'white');
        }
        badge.src = url.toString();
      }
    });
  }

  /**
   * GitHub stats şəkillərini rejimə uyğun yeniləyir
   */
  updateGitHubStats(theme) {
    const statsImages = document.querySelectorAll('img[src*="github-readme-stats"]');
    statsImages.forEach(img => {
      const src = img.src;
      const url = new URL(src);
      
      if (theme === 'dark') {
        url.searchParams.set('theme', 'github_dark');
        url.searchParams.set('bg_color', '0D1117');
        url.searchParams.set('title_color', '3B82F6');
        url.searchParams.set('text_color', 'E5E7EB');
      } else {
        url.searchParams.set('theme', 'default');
        url.searchParams.set('bg_color', 'FFFFFF');
        url.searchParams.set('title_color', '2563EB');
        url.searchParams.set('text_color', '24292F');
      }
      
      img.src = url.toString();
    });
  }

  /**
   * Rejimi dəyişir (toggle)
   */
  toggleTheme() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  /**
   * Müəyyən rejimi təyin edir
   */
  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.applyTheme(themeName);
    }
  }

  /**
   * Sistem rejim dəyişikliyini izləyir
   */
  setupSystemThemeWatcher() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  /**
   * Event listener-ləri qurur
   */
  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+T rejimi dəyişir
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
      
      // Esc dropdown-u bağlayır
      if (e.key === 'Escape') {
        this.hideDropdown();
      }
    });

    // Scroll zamanı button opacity-sini dəyişir
    window.addEventListener('scroll', () => {
      const button = document.getElementById('theme-switcher');
      if (button) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0.7, 1 - scrollY / 1000);
        button.style.opacity = opacity;
      }
    });
  }

  /**
   * Theme dəyişiklik event-i emit edir
   */
  emitThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: {
        theme: theme,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * Hazırki rejimi qaytarır
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Mövcud rejimləri qaytarır
   */
  getAvailableThemes() {
    return Object.keys(this.themes);
  }

  /**
   * Theme Switcher-i məhv edir
   */
  destroy() {
    const button = document.getElementById('theme-switcher');
    if (button) {
      button.remove();
    }
    
    // Event listener-ləri təmizlə
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// CSS animation-ları əlavə et
const style = document.createElement('style');
style.textContent = `
  .theme-switcher-btn {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-5px) scale(1.05);
    }
  }
  
  .theme-option:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    .theme-switcher-btn {
      width: 45px;
      height: 45px;
      font-size: 18px;
      top: 15px;
      right: 15px;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .theme-switcher-btn {
      animation: none;
    }
  }
`;
document.head.appendChild(style);

// Theme Switcher-i işə sal
let themeSwitcher;

// DOM yüklənən kimi işə sal
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    themeSwitcher = new ThemeSwitcher();
  });
} else {
  themeSwitcher = new ThemeSwitcher();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSwitcher;
}

// Global access
window.ThemeSwitcher = ThemeSwitcher;
window.themeSwitcher = themeSwitcher;