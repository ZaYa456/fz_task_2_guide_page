// ========================================
// Lazy Load Subsections
// ========================================
const loadedSubsections = new Map();

function showSkeleton(container) {
    container.innerHTML = `
        <div class="skeleton-wrapper">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text skeleton-text--short"></div>
            <div class="skeleton skeleton-video"></div>
        </div>
    `;
}

async function loadSubsection(id) {
    if (loadedSubsections.has(id)) {
        return loadedSubsections.get(id);
    }

    const container = document.getElementById(id);
    if (!container) return null;

    showSkeleton(container);

    try {
        const response = await fetch(`subsections/${id}.html`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        container.innerHTML = html;

        // Re-initialize FAQ accordion after its content is injected
        if (id === 'faq') {
            container.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => {
                    question.closest('.faq-item').classList.toggle('open');
                });
            });
        }

        loadedSubsections.set(id, container);
        return container;
    } catch (err) {
        container.innerHTML = `
            <div class="load-error">
                <span class="load-error-icon">⚠️</span>
                <span>Failed to load content. Please refresh the page.</span>
            </div>
        `;
        console.error(`Error loading subsection "${id}":`, err);
        return null;
    }
}
