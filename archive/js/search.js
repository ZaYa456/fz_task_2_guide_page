// ========================================
// Search — Sidebar Navigation Filter
// ========================================
// Filters nav links and category headings in the sidebar based on the query.
// Does NOT search page content. On match, clicking a result navigates normally.
// ========================================

function initSearch(elements) {
    let searchTimeout;

    elements.searchInput?.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase().trim(), elements);
        }, 300);
    });

    // Clear search on Escape
    elements.searchInput?.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            performSearch('', elements);
        }
    });
}

function performSearch(query, elements) {
    // ============================
    // RESET — show everything
    // ============================
    if (query === '') {
        elements.navLinks.forEach(link => link.style.display = 'block');
        elements.navCategories.forEach(cat => cat.style.display = 'block');
        return;
    }

    // ============================
    // FILTER nav links by label text
    // ============================
    let hasResults = false;

    elements.navLinks.forEach(link => {
        // Match against both EN and AR attributes so it works in either language
        const enText = (link.getAttribute('data-en') || '').toLowerCase();
        const arText = (link.getAttribute('data-ar') || '').toLowerCase();
        const matches = enText.includes(query) || arText.includes(query);

        link.style.display = matches ? 'block' : 'none';
        if (matches) hasResults = true;
    });

    // ============================
    // Hide category headings whose
    // every child link is hidden
    // ============================
    elements.navCategories.forEach(cat => {
        let next = cat.nextElementSibling;
        let anyVisible = false;

        while (next && !next.classList.contains('nav-category')) {
            if (next.classList.contains('nav-link') && next.style.display !== 'none') {
                anyVisible = true;
                break;
            }
            next = next.nextElementSibling;
        }

        cat.style.display = anyVisible ? 'block' : 'none';
    });
}
