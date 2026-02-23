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
            { id: 'settings-logo',     title: { en: 'Upload Logo',           ar: 'تحميل الشعار' },           isSublink: true },
            { id: 'settings-cover',    title: { en: 'Upload Cover Photo',    ar: 'تحميل صورة الغلاف' },      isSublink: true },
            { id: 'settings-info',     title: { en: 'Restaurant Information',ar: 'معلومات المطعم' },         isSublink: true },
            { id: 'settings-colors',   title: { en: 'Brand Colors',          ar: 'ألوان العلامة التجارية' }, isSublink: true },
            { id: 'settings-qr',       title: { en: 'QR Code for Menu',      ar: 'رمز QR للقائمة' },        isSublink: true },
            { id: 'settings-social',   title: { en: 'Social Media Links',    ar: 'روابط وسائل التواصل' },   isSublink: true },
            { id: 'settings-other',    title: { en: 'Other Settings',        ar: 'إعدادات أخرى' },          isSublink: true },
        ]
    },
    {
        category: { en: 'Menu Management', ar: 'إدارة القائمة' },
        links: [
            { id: 'categories-overview', title: { en: 'Categories Overview',   ar: 'نظرة عامة على الفئات' } },
            { id: 'categories-add',      title: { en: 'Add Category',          ar: 'إضافة فئة' },             isSublink: true },
            { id: 'categories-excel',    title: { en: 'Import/Export Excel',   ar: 'استيراد/تصدير Excel' },   isSublink: true },
            { id: 'categories-search',   title: { en: 'Search Categories',     ar: 'البحث في الفئات' },       isSublink: true },

            { id: 'products-overview', title: { en: 'Products Overview',     ar: 'نظرة عامة على المنتجات' } },
            { id: 'products-add',      title: { en: 'Add Product',           ar: 'إضافة منتج' },              isSublink: true },
            { id: 'products-excel',    title: { en: 'Import/Export Excel',   ar: 'استيراد/تصدير Excel' },    isSublink: true },
            { id: 'products-filter',   title: { en: 'Filter Products',       ar: 'تصفية المنتجات' },         isSublink: true },
            { id: 'products-pin',      title: { en: 'Pin Products',          ar: 'تثبيت المنتجات' },         isSublink: true },
        ]
    },
    {
        category: { en: 'Team Management', ar: 'إدارة الفريق' },
        links: [
            { id: 'users-overview', title: { en: 'Users Overview', ar: 'نظرة عامة على المستخدمين' } },
            { id: 'users-add',      title: { en: 'Add New User',   ar: 'إضافة مستخدم جديد' }, isSublink: true },
            { id: 'users-edit',     title: { en: 'Edit User',      ar: 'تعديل المستخدم' },    isSublink: true },
        ]
    },
    {
        category: { en: 'Customer Experience', ar: 'تجربة العملاء' },
        links: [
            { id: 'public-menu-overview',  title: { en: 'Public Menu Overview', ar: 'نظرة عامة على القائمة العامة' } },
            { id: 'public-menu-search',    title: { en: 'Search & Browse',      ar: 'البحث والتصفح' },               isSublink: true },
            { id: 'public-menu-cart',      title: { en: 'Add to Cart',          ar: 'إضافة إلى السلة' },             isSublink: true },
            { id: 'public-menu-whatsapp',  title: { en: 'WhatsApp Orders',      ar: 'طلبات واتساب' },                isSublink: true },
            { id: 'public-menu-language',  title: { en: 'Language & Dark Mode', ar: 'اللغة والوضع الداكن' },        isSublink: true },
            { id: 'public-menu-about',     title: { en: 'About Us Section',     ar: 'قسم من نحن' },                  isSublink: true },
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
