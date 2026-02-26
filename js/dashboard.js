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

        // Accordion state: Set of category keys that are open
        openCategories: new Set(),

        get isMobile() {
            return this.windowWidth < 768;
        },

        // Flat ordered list of all section ids
        get flatLinks() {
            return this.navItems.flatMap(cat => cat.links.map(l => l.id));
        },

        // Previous section id before currentSection (null if first)
        get prevSection() {
            const flat = this.flatLinks;
            const idx = flat.indexOf(this.currentSection);
            return idx > 0 ? flat[idx - 1] : null;
        },

        // Title of the previous section in the current language
        get prevSectionTitle() {
            if (!this.prevSection) return '';
            for (const cat of this.navItems) {
                const link = cat.links.find(l => l.id === this.prevSection);
                if (link) return link.title[this.lang];
            }
            return '';
        },

        // Next section id after currentSection (null if last)
        get nextSection() {
            const flat = this.flatLinks;
            const idx = flat.indexOf(this.currentSection);
            return idx !== -1 && idx < flat.length - 1 ? flat[idx + 1] : null;
        },

        // Title of the next section in the current language
        get nextSectionTitle() {
            if (!this.nextSection) return '';
            for (const cat of this.navItems) {
                const link = cat.links.find(l => l.id === this.nextSection);
                if (link) return link.title[this.lang];
            }
            return '';
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
            if (firstSection) {
                this.openCategoryFor(firstSection);
                this.selectSection(firstSection);
            }

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

        toggleCategory(categoryKey) {
            if (this.openCategories.has(categoryKey)) {
                this.openCategories.delete(categoryKey);
            } else {
                this.openCategories.add(categoryKey);
            }
            // Trigger Alpine reactivity — reassign the Set
            this.openCategories = new Set(this.openCategories);
        },

        openCategoryFor(sectionId) {
            for (const cat of this.navItems) {
                if (cat.links.some(l => l.id === sectionId)) {
                    this.openCategories = new Set([...this.openCategories, cat.category.en]);
                    break;
                }
            }
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
            this.initFaqAccordion();
            this.initVideos();
        },

        initFaqAccordion() {
            document.querySelectorAll('.faq-item').forEach(item => {
                // Avoid double-binding
                if (item.dataset.faqInit) return;
                item.dataset.faqInit = 'true';

                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');

                if (!question || !answer) return;

                // Initial state: collapsed
                answer.style.maxHeight = '0';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.25s ease';

                question.style.cursor = 'pointer';

                question.addEventListener('click', () => {
                    const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '0';
                    answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
                    if (icon) icon.style.transform = isOpen ? '' : 'rotate(180deg)';
                });
            });
        },

        initVideos() {
            const lang = this.lang;

            document.querySelectorAll('.video-container').forEach(container => {
                const video = container.querySelector('video');
                if (!video) return;

                // Set src from data-src if not already set
                const src = video.dataset.src;
                if (!src) return;
                if (!video.src) video.src = src;

                // Avoid double initialization
                if (video.dataset.videoInit) return;
                video.dataset.videoInit = 'true';

                const loading = container.querySelector('.video-loading');
                const error = container.querySelector('.video-error');
                const loadingText = container.querySelector('.video-loading-text');
                const errorText = container.querySelector('.video-error-text');

                // Translate loading/error text
                if (loadingText) {
                    const text = loadingText.getAttribute('data-' + lang);
                    if (text) loadingText.textContent = text;
                }

                if (errorText) {
                    const text = errorText.getAttribute('data-' + lang);
                    if (text) errorText.textContent = text;
                }

                const showVideo = () => {
                    if (loading) loading.style.display = 'none';
                    video.style.display = 'block';
                    if (error) error.style.display = 'none';
                };

                const showError = () => {
                    if (loading) loading.style.display = 'none';
                    if (error) error.style.display = 'flex';
                    video.style.display = 'none';
                };

                video.addEventListener('loadeddata', showVideo);
                video.addEventListener('error', showError);

                // Handle already cached videos
                if (video.readyState >= 2) {
                    showVideo();
                }
            });
        },

        async selectSection(id) {
            this.cleanupVideos();
            this.currentSection = id;
            this.searchQuery = '';
            this.openCategoryFor(id);
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

        // Clean up video elements to stop playback and free resources when navigating away
        cleanupVideos() {
            document.querySelectorAll('.video-container video').forEach(video => {
                video.pause();
                video.currentTime = 0;
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