// ============================================================
//  navigation.js — Sidebar navigation structure
//  Loaded as a plain script; exposes NAV_ITEMS globally.
// ============================================================

const NAV_ITEMS = [
    {
        category: { en: 'Getting Started', ar: 'البدء' },
        links: [
            { id: 'dashboard-overview', title: { en: 'Dashboard Overview', ar: 'نظرة عامة على لوحة التحكم' } },
            { id: 'changing-language',  title: { en: 'Changing Language',   ar: 'تغيير اللغة' } },
        ]
    },
    {
        category: { en: 'Profile Management', ar: 'إدارة الملف الشخصي' },
        links: [
            { id: 'profile-username', title: { en: 'Update Username', ar: 'تحديث اسم المستخدم' } },
            { id: 'profile-email',    title: { en: 'Update Email',    ar: 'تحديث البريد الإلكتروني' } },
            { id: 'profile-password', title: { en: 'Update Password', ar: 'تحديث كلمة المرور' } },
            { id: 'profile-delete',   title: { en: 'Delete Account',  ar: 'حذف الحساب' } },
        ]
    },
    {
        category: { en: 'Restaurant Setup', ar: 'إعداد المطعم' },
        links: [
            { id: 'settings-overview', title: { en: 'Settings Overview',     ar: 'نظرة عامة على الإعدادات' } },
            { id: 'settings-logo',     title: { en: 'Upload Logo',           ar: 'تحميل الشعار' } },
            { id: 'settings-cover',    title: { en: 'Upload Cover Photo',    ar: 'تحميل صورة الغلاف' } },
            { id: 'settings-info',     title: { en: 'Restaurant Information',ar: 'معلومات المطعم' } },
            { id: 'settings-colors',   title: { en: 'Brand Colors',          ar: 'ألوان العلامة التجارية' } },
            { id: 'settings-qr',       title: { en: 'QR Code for Menu',      ar: 'رمز QR للقائمة' } },
            { id: 'settings-social',   title: { en: 'Social Media Links',    ar: 'روابط وسائل التواصل' } },
            { id: 'settings-other',    title: { en: 'Other Settings',        ar: 'إعدادات أخرى' } },
        ]
    },
    {
        category: { en: 'Menu Management', ar: 'إدارة القائمة' },
        links: [
            { id: 'categories-overview', title: { en: 'Categories Overview',   ar: 'نظرة عامة على الفئات' } },
            { id: 'categories-add',      title: { en: 'Add Category',          ar: 'إضافة فئة' } },
            { id: 'categories-excel',    title: { en: 'Import/Export Excel',   ar: 'استيراد/تصدير Excel' } },
            { id: 'categories-search',   title: { en: 'Search Categories',     ar: 'البحث في الفئات' } },

            { id: 'products-overview', title: { en: 'Products Overview',     ar: 'نظرة عامة على المنتجات' } },
            { id: 'products-add',      title: { en: 'Add Product',           ar: 'إضافة منتج' } },
            { id: 'products-excel',    title: { en: 'Import/Export Excel',   ar: 'استيراد/تصدير Excel' } },
            { id: 'products-filter',   title: { en: 'Filter Products',       ar: 'تصفية المنتجات' } },
            { id: 'products-pin',      title: { en: 'Pin Products',          ar: 'تثبيت المنتجات' } },
        ]
    },
    {
        category: { en: 'Team Management', ar: 'إدارة الفريق' },
        links: [
            { id: 'users-overview', title: { en: 'Users Overview', ar: 'نظرة عامة على المستخدمين' } },
            { id: 'users-add',      title: { en: 'Add New User',   ar: 'إضافة مستخدم جديد' } },
            { id: 'users-edit',     title: { en: 'Edit User',      ar: 'تعديل المستخدم' } },
        ]
    },
    {
        category: { en: 'Customer Experience', ar: 'تجربة العملاء' },
        links: [
            { id: 'public-menu-overview',  title: { en: 'Public Menu Overview', ar: 'نظرة عامة على القائمة العامة' } },
            { id: 'public-menu-search',    title: { en: 'Search & Browse',      ar: 'البحث والتصفح' } },
            { id: 'public-menu-cart',      title: { en: 'Add to Cart',          ar: 'إضافة إلى السلة' } },
            { id: 'public-menu-whatsapp',  title: { en: 'WhatsApp Orders',      ar: 'طلبات واتساب' } },
            { id: 'public-menu-language',  title: { en: 'Language & Dark Mode', ar: 'اللغة والوضع الداكن' } },
            { id: 'public-menu-about',     title: { en: 'About Us Section',     ar: 'قسم من نحن' } },
        ]
    },
    {
        category: { en: 'Analytics & Billing', ar: 'التحليلات والفواتير' },
        links: [
            { id: 'reports', title: { en: 'Reports & Analytics',   ar: 'التقارير والتحليلات' } },
            { id: 'billing', title: { en: 'Billing & Subscription', ar: 'الفواتير والاشتراك' } },
        ]
    },
    {
        category: { en: 'Help', ar: 'المساعدة' },
        links: [
            { id: 'faq', title: { en: 'FAQ & Troubleshooting', ar: 'الأسئلة الشائعة واستكشاف الأخطاء' } },
        ]
    },
];
