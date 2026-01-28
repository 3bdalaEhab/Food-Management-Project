import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            sidebar: {
                dashboard: "Dashboard Hub",
                recipes: "Culinary Studio",
                categories: "Taxonomy",
                users: "Agent Fleet",
                favorites: "Vault Collection",
                settings: "Configuration",
                logout: "Eject Session",
                management: "Management"
            },
            navbar: {
                search: "Scan Archives...",
                language: "Language Port",
                theme: "Illumination",
                notifications: "System Alerts",
                expert: "Expert",
                guest: "Guest"
            },
            dashboard: {
                welcome: "Welcome, Chef",
                sync_active: "System Online",
                elite_access: "Elite Access",
                description: "The culinary core is synchronized. manage your high-performance recipes and categories with industrial precision.",
                new_protocol: "New Protocol",
                access_vault: "Access Vault",
                recipes_vault: "Recipes in Vault",
                active_protocols: "Active Protocols",
                managed_fleet: "Managed Fleet",
                curated_picks: "Curated Picks",
                stream_feed: "Stream Feed",
                shortcuts: "Tactical Shortcuts",
                real_time: "Real-time"
            },
            profile: {
                identity_port: "Identity Port",
                security_active: "Security Active",
                core: "Core",
                description: "The heartbeat of your professional journey. manage your security protocols, identity metadata, and project portfolio with elite precision.",
                execution_hub: "EXECUTION_HUB",
                update_asset: "Update Asset Port",
                security_protocol: "Security Protocol",
                verified: "PROFESSIONAL VERIFIED",
                verified_desc: "System credentials fully synchronized",
                archive_address: "ARCHIVE_ADDRESS",
                comm_freq: "COMM_FREQUENCY",
                geospatial: "GEOSPATIAL_SECTOR",
                auth_level: "AUTHENTICATION_LEVEL",
                master_identity: "Master Identity Port",
                master_desc: "These credentials represent your professional entity within the culinary network.",
                edit_portfolio: "Edit Portfolio",
            },
            categories: {
                title: "Taxonomy Hub",
                add: "Initialize Node",
                search: "Scan Taxonomy...",
                empty: "No Nodes Detected",
                items: "Active Units",
            },
            recipes: {
                title: "Culinary Studio",
                add: "Initialize Masterpiece",
                search: "Scan Studio...",
                empty: "No Masterpieces Detected",
            },
            users: {
                title: "Agent Fleet",
                add: "Recruit Agent",
                search: "Scan Fleet...",
                empty: "No Agents Detected",
            },
            common: {
                search: "Search",
                cancel: "Abort",
                submit: "Sync",
                delete: "Purge",
                edit: "Refine",
                success: "Execution Successful",
                error: "System Failure"
            }
        }
    },
    ar: {
        translation: {
            sidebar: {
                dashboard: "مركز القيادة",
                recipes: "استوديو الطهي",
                categories: "التصنيفات",
                users: "أسطول العملاء",
                favorites: "المجموعة المفضلة",
                settings: "الإعدادات",
                logout: "إنهاء الجلسة",
                management: "الإدارة"
            },
            navbar: {
                search: "مسح الأرشيف...",
                language: "منفذ اللغة",
                theme: "الإضاءة",
                notifications: "تنبيهات النظام",
                expert: "خبير",
                guest: "زائر"
            },
            dashboard: {
                welcome: "مرحباً بك، الشيف",
                sync_active: "النظام متصل",
                elite_access: "وصول النخبة",
                description: "تمت مزامنة نواة الطهي. قم بإدارة وصفاتك وتصنيفاتك عالية الأداء بدقة صناعية.",
                new_protocol: "بروتوكول جديد",
                access_vault: "دخول القبو",
                recipes_vault: "وصفات في القبو",
                active_protocols: "بروتوكولات نشطة",
                managed_fleet: "الأسطول المدار",
                curated_picks: "اختيارات منتقاة",
                stream_feed: "خلاصة النشاط",
                shortcuts: "اختصارات تكتيكية",
                real_time: "مباشر"
            },
            profile: {
                identity_port: "ميناء الهوية",
                security_active: "الأمن نشط",
                core: "النواة",
                description: "نبض رحلتك المهنية. أدر بروتوكولات الأمان، بيانات الهوية، ومحفظة مشاريعك بدقة تكتيكية عالية.",
                execution_hub: "مركز التنفيذ",
                update_asset: "تحديث الأصول",
                security_protocol: "بروتوكول الأمان",
                verified: "محترف معتمد",
                verified_desc: "بيانات النظام متزامنة بالكامل",
                archive_address: "عنوان الأرشيف",
                comm_freq: "تردد الاتصال",
                geospatial: "القطاع الجغرافي",
                auth_level: "مستوى المصادقة",
                master_identity: "ميناء الهوية الرئيسي",
                master_desc: "تمثل هذه البيانات كيانك المهني داخل الشبكة الطهوية.",
                edit_portfolio: "تعديل المحفظة",
            },
            categories: {
                title: "مركز التصنيفات",
                add: "إضافة تصنيف",
                search: "بحث في التصنيفات...",
                empty: "لم يتم العثور على تصنيفات",
                items: "عناصر نشطة",
            },
            recipes: {
                title: "استوديو الطهي",
                add: "إضافة وصفة",
                search: "بحث في الوصفات...",
                empty: "لم يتم العثور على وصفات",
            },
            users: {
                title: "أسطول العملاء",
                add: "إضافة عميل",
                search: "بحث في الأسطول...",
                empty: "لم يتم العثور على عملاء",
            },
            common: {
                search: "بحث",
                cancel: "إلغاء",
                submit: "مزامنة",
                delete: "حذف",
                edit: "تحسين",
                success: "تم التنفيذ بنجاح",
                error: "فشل في النظام"
            }
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
