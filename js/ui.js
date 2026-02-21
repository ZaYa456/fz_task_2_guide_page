// ========================================
// Navigation & Scroll Spy
// ========================================
function initNavigation(elements) {
    let currentActiveId = null;

    elements.navLinks.forEach(link => {
        link.addEventListener('click', async e => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            if (!targetId) return;

            currentActiveId = targetId;

            // Hide everything first
            elements.sections.forEach(sec => sec.style.display = 'none');
            elements.subsections.forEach(sub => sub.style.display = 'none');

            // Show parent section
            const parent = document.getElementById(targetId)?.closest('.content-section');
            if (parent) parent.style.display = 'block';

            // Lazy load subsection
            const subsection = await loadSubsection(targetId);
            if (subsection) subsection.style.display = 'block';

            // Update active nav
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (window.innerWidth <= 768) elements.sidebar?.classList.remove('open');

            // Update URL hash
            history.pushState({ section: targetId }, '', `#${targetId}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', async e => {
        const id = e.state?.section || elements.navLinks[0]?.getAttribute('data-section');
        if (!id) return;

        const link = [...elements.navLinks].find(l => l.getAttribute('data-section') === id);
        if (link) link.click();
    });

    // Expose getter for search reset
    elements.getCurrentActiveId = () => currentActiveId;

    // On page load: navigate to hash if present, otherwise click the first link
    const hashId = location.hash?.substring(1);
    const initialLink = hashId
        ? [...elements.navLinks].find(l => l.getAttribute('data-section') === hashId)
        : elements.navLinks[0];
    if (initialLink) initialLink.click();
}





// ========================================
// Scroll To Top
// ========================================
function initScrollToTop(elements) {
    if (!elements.scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
        elements.scrollToTopBtn.classList.toggle('show', window.scrollY > 400);
    });

    elements.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu(elements) {
    if (window.innerWidth > 768 || !elements.sidebar) return;

    const btn = document.createElement('button');
    btn.className = 'mobile-menu-toggle';
    btn.innerHTML = '&#9776;';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        background: #1f2937;
        color: white;
        border: none;
        z-index: 1001;
        cursor: pointer;
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
    });
}

// ========================================
// FAQ Accordion
// ========================================
// NOTE: FAQ content is lazy-loaded via lazy.js.
// The accordion is initialized there after injection,
// so initFaq() only handles any statically rendered FAQ items (none currently).
function initFaq() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            question.closest('.faq-item').classList.toggle('open');
        });
    });
}
