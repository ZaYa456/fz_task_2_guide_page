// ========================================
// Main Application Entry Point
// ========================================
// This file serves as the orchestrator for the entire dashboard application.
// It initializes all modules, manages global state, and sets up event listeners.
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. Configuration & State Management
    // ========================================
    // Maintains the app's global state including language preference and UI state
    const state = {
        lang: localStorage.getItem('dashboardLang') || 'en',  // Retrieved from browser storage
        isMobileMenuOpen: false
    };

    // ========================================
    // 2. DOM Elements Cache
    // ========================================
    // Caching DOM elements improves performance by preventing repeated DOM queries
    const elements = {
        body: document.body,
        navLinks: document.querySelectorAll('.nav-link'),
        navCategories: document.querySelectorAll('.nav-category'),
        sections: document.querySelectorAll('.content-section'),
        subsections: document.querySelectorAll('.subsection'),
        searchInput: document.getElementById('searchInput'),
        langBtn: document.getElementById('languageToggle'),
        scrollToTopBtn: document.getElementById('scrollToTop'),
        sidebar: document.querySelector('.sidebar')
    };

    // ========================================
    // 3. Initialize All Feature Modules
    // ========================================
    // Each init function sets up event listeners and handlers for specific features
    initNavigation(elements);      // Section switching, lazy loading, hash handling
    initScrollToTop(elements);     // Scroll to top button functionality
    initMobileMenu(elements);      // Mobile hamburger menu
    initSearch(elements);          // Sidebar nav search/filter
    initFaq();                     // FAQ accordion expansion

    // ========================================
    // 4. Language Toggle Event Listener
    // ========================================
    // Allows users to switch between English and Arabic
    elements.langBtn?.addEventListener('click', () => {
        switchLanguage(state.lang === 'en' ? 'ar' : 'en', state, elements);
    });

    // ========================================
    // 5. Apply Stored Language Preference on Load
    // ========================================
    // Ensures the UI reflects the user's previously selected language
    switchLanguage(state.lang, state, elements);
});
