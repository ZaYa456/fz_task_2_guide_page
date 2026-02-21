// ========================================
// Language & RTL
// ========================================
function switchLanguage(lang, state, elements) {
    state.lang = lang;
    localStorage.setItem('dashboardLang', lang);

    elements.body.classList.toggle('rtl', lang === 'ar');

    // data-en / data-ar attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.tagName === 'INPUT') {
            el.placeholder = el.getAttribute(`data-placeholder-${lang}`) || '';
        } else {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });

    // Headers
    const title = document.querySelector('.page-title');
    const desc = document.querySelector('.page-description');
    if (title) title.textContent = translations.pageTitle[lang];
    if (desc) desc.textContent = translations.pageDescription[lang];

    // No results block
    const icon = document.querySelector('.no-results-icon');
    const t = document.querySelector('.no-results-title');
    const d = document.querySelector('.no-results-text');
    if (icon) icon.textContent = translations.noResultsText.icon[lang];
    if (t) t.textContent = translations.noResultsText.title[lang];
    if (d) d.textContent = translations.noResultsText.desc[lang];

    // Mobile toggle RTL positioning
    const mobileBtn = document.querySelector('.mobile-menu-toggle');
    if (mobileBtn) {
        mobileBtn.style.left = lang === 'ar' ? 'auto' : '20px';
        mobileBtn.style.right = lang === 'ar' ? '20px' : 'auto';
    }
}
