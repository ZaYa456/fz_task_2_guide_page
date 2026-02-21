# Restaurant Dashboard Guide

A bilingual (English/Arabic), lazy-loaded, single-page documentation site for restaurant owners to navigate their dashboard features.

## Features

- **Lazy Loading** — Subsections are fetched on demand via `fetch()`, reducing initial page weight
- **Bilingual Support** — Full English/Arabic language switching with RTL layout support
- **Skeleton Loading UI** — Shimmer animation displays while content is being fetched
- **Hash-based Navigation** — Deep-linkable URLs with browser back/forward support
- **Sidebar Search** — Real-time filtering of navigation links in both languages
- **Mobile Responsive** — Collapsible sidebar with hamburger menu on small screens
- **FAQ Accordion** — Expandable FAQ items with smooth animations

## Project Structure

```
restaurant-dashboard-guide/
├── index.html              # Main document shell with empty subsection mount points
├── css/
│   └── styles.css          # All styles: fonts, layout, components, skeleton, RTL
├── js/
│   ├── translations.js     # EN/AR translation strings
│   ├── language.js         # Language switching + RTL logic
│   ├── lazy.js             # Subsection lazy loading with skeleton UI
│   ├── search.js           # Sidebar navigation filter (nav-only, no content search)
│   ├── ui.js               # Navigation, scroll-to-top, mobile menu, FAQ accordion
│   └── main.js             # App entry point, state management, module initialization
└── subsections/
    ├── dashboard-overview.html
    ├── changing-language.html
    ├── profile-username.html
    ├── profile-email.html
    ├── profile-password.html
    ├── profile-delete.html
    ├── settings-overview.html
    ├── settings-logo.html
    ├── settings-cover.html
    ├── settings-info.html
    ├── settings-colors.html
    ├── settings-qr.html
    ├── settings-social.html
    ├── settings-other.html
    ├── categories-overview.html
    ├── categories-add.html
    ├── categories-excel.html
    ├── categories-search.html
    ├── products-overview.html
    ├── products-add.html
    ├── products-excel.html
    ├── products-filter.html
    ├── products-pin.html
    ├── users-overview.html
    ├── users-add.html
    ├── users-edit.html
    ├── public-menu-overview.html
    ├── public-menu-search.html
    ├── public-menu-cart.html
    ├── public-menu-whatsapp.html
    ├── public-menu-language.html
    ├── public-menu-about.html
    ├── reports.html
    ├── billing.html
    └── faq.html
```

## How It Works

### Lazy Loading Flow

1. User clicks a sidebar nav link with `data-section="example-id"`
2. `ui.js` hides all sections, shows the parent `<section>`, and calls `loadSubsection('example-id')`
3. `lazy.js` checks if already loaded; if not, displays skeleton UI
4. Fetches `subsections/example-id.html` and injects into `<div id="example-id">`
5. For FAQ specifically, re-initializes accordion click listeners after injection
6. Caches the loaded container in a `Map` to avoid re-fetching

### Navigation Structure

Each nav link has:
- `data-section="id"` — Points to the subsection `<div id="id">` to load
- `data-en="English Text"` — English label for search/translation
- `data-ar="Arabic Text"` — Arabic label for search/translation

Example:
```html
<a class="nav-link" 
   data-section="settings-logo" 
   data-en="Upload Logo"
   data-ar="تحميل الشعار">Upload Logo</a>
```

Maps to:
```html
<section id="restaurant-setup" class="content-section">
    <h2 class="section-header">Restaurant Setup</h2>
    <div id="settings-logo" class="subsection"></div>
</section>
```

### Language Switching

`language.js` updates all elements with `data-en` / `data-ar` attributes when toggled:
- Nav links
- Section headers
- Page title/description
- Search placeholder

The `<body>` gets `.rtl` class for Arabic, flipping sidebar position and text direction via CSS.

### Search Behavior

`search.js` filters **only the sidebar navigation** by matching the query against both `data-en` and `data-ar` attributes. It does NOT search page content. Category headings auto-hide when all their child links are filtered out.

## Local Development

**Requirements:** A local web server (due to `fetch()` restrictions on `file://` URLs)

### Option 1: Python
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Node.js
```bash
npx serve
# Visit http://localhost:3000
```

### Option 3: VS Code Live Server
Install the "Live Server" extension and click "Go Live" in the bottom status bar.

## Browser Support

- Modern browsers with ES6+ support (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- `fetch()` API
- CSS Grid & Flexbox
- CSS animations

## Known Issues / Future Improvements

### Translation Lag
`switchLanguage()` runs on page load, but subsections are loaded later via `fetch()`. Any `data-en`/`data-ar` attributes inside lazily loaded content won't be translated until the user toggles language manually.

**Fix:** Call a lightweight re-apply function inside `loadSubsection()` after injecting HTML.

### Mobile Sidebar
The `.open` class is toggled on the sidebar for mobile, but no CSS rules define what it should do (slide in, show overlay, etc.). Mobile experience may be broken.

**Fix:** Add transform/transition styles for `.sidebar.open` and an overlay backdrop.

### Static Page Header
The page header ("Welcome to Your Dashboard") is always visible regardless of which section is active. It may be redundant since each section has its own header.

**Fix:** Only show on the default landing section, or remove entirely.

### Accessibility
Nav links use `<a>` tags with no `href`, relying on `data-section` + JS click handlers. Screen readers won't announce them properly.

**Fix:** Add `role="button"` or use proper `href="#id"` with `preventDefault()`.

## License

[Specify your license here]

## Contributing

[Add contribution guidelines if applicable]
