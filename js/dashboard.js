// ============================================================
//  dashboard.js — Alpine.js component for User Guide
//  Depends on: NAV_ITEMS (navigation.js), TRANSLATIONS (translations.js)
// ============================================================

function dashboard() {
    return {

        /* ==============================
           STATE
        ============================== */
        lang: localStorage.getItem('dashboardLang') || 'en',
        currentSection: null,
        loadedSubsections: {},
        searchQuery: '',
        filteredNav: [],
        windowWidth: window.innerWidth,
        isMobileMenuOpen: window.innerWidth >= 768,
        showScrollTop: false,
        sidebarExiting: false,

        navItems: NAV_ITEMS,
        translations: TRANSLATIONS,

        cacheVersion: 'v1', // Increment this to invalidate old cache

        get isMobile() {
            return this.windowWidth < 768;
        },

        /* ==============================
           INIT
        ============================== */
        init() {
            // Cleanup old cache first
            this.cleanupCache();

            this.filteredNav = this.navItems;

            // Watch search query
            this.$watch('searchQuery', (q) => {
                if (!q) {
                    this.filteredNav = this.navItems;
                    return;
                }

                const search = q.toLowerCase();

                this.filteredNav = this.navItems
                    .map(cat => ({
                        ...cat,
                        links: cat.links.filter(link =>
                            link.title.en.toLowerCase().includes(search) ||
                            link.title.ar.toLowerCase().includes(search)
                        )
                    }))
                    .filter(cat => cat.links.length > 0);
            });

            // Select first section (from hash or first nav item)
            const firstSection = window.location.hash.substring(1) || this.navItems[0]?.links[0]?.id;
            if (firstSection) this.selectSection(firstSection);

            // Handle resize for mobile/desktop
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
                if (!this.isMobile) this.isMobileMenuOpen = true;
            });

            // Show scroll-to-top button
            window.addEventListener('scroll', () => {
                this.showScrollTop = window.scrollY > 400;
            });

            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
                const id = e.state?.section || this.navItems[0]?.links[0]?.id;
                if (id) this.selectSection(id);
            });
        },

        /* ==============================
           METHODS
        ============================== */
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },

        toggleLanguage() {
            const nextLang = this.lang === 'en' ? 'ar' : 'en';

            this.sidebarExiting = true;

            setTimeout(() => {
                this.lang = nextLang;
                localStorage.setItem('dashboardLang', nextLang);

                // Update all loaded subsections
                Object.keys(this.loadedSubsections).forEach(id => {
                    const container = document.querySelector(`.subsection-content[data-section="${id}"]`);
                    if (container) {
                        container.querySelectorAll('[data-en]').forEach(el => {
                            const text = el.getAttribute('data-' + nextLang);
                            if (text !== null) el.textContent = text;
                        });
                    }
                });

                requestAnimationFrame(() => {
                    this.sidebarExiting = false;
                    this.$nextTick(() => this.translateContent());
                });
            }, 300);
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        translateContent() {
            const lang = this.lang;
            document.querySelectorAll('[data-en]').forEach(el => {
                const text = el.getAttribute('data-' + lang);
                if (text !== null) el.textContent = text;
            });
        },

        async selectSection(id) {
            this.currentSection = id;
            const cacheKey = `subsection-${id}-${this.cacheVersion}`;

            if (!this.loadedSubsections[id]) {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    this.loadedSubsections[id] = cached;
                } else {
                    try {
                        const res = await fetch(`subsections/${id}.html`);
                        const html = res.ok
                            ? await res.text()
                            : `<div class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                                 ${this.translations.loadError?.[this.lang] || '⚠️ Failed to load content.'}
                               </div>`;
                        this.loadedSubsections[id] = html;
                        localStorage.setItem(cacheKey, html);
                    } catch (err) {
                        console.error(`Failed to load subsection ${id}:`, err);
                        this.loadedSubsections[id] = `<div class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                                                         ⚠️ Failed to load content.
                                                       </div>`;
                    }
                }
            }

            if (this.isMobile) this.isMobileMenuOpen = false;

            history.pushState({ section: id }, '', `#${id}`);

            window.scrollTo({ top: 0, behavior: 'smooth' });

            this.$nextTick(() => {
                this.translateContent();
                const contentEl = this.$refs.contentArea;
                if (contentEl) {
                    contentEl.setAttribute('data-section', id);
                    contentEl.focus();
                }
            });
        },

        /* =========================================================
           Clean up outdated cached subsections
        ========================================================= */
        cleanupCache() {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('subsection-') && !key.includes(this.cacheVersion)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
        }

    };
}