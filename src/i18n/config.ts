import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            sidebar: {
                dashboard: "Dashboard Hub",
                recipes: "Culinary Studio",
                categories: "Taxonomy Hub",
                users: "Agent Fleet",
                favorites: "Vault Collection",
                settings: "Configuration",
                logout: "Eject Session",
                management: "MANAGEMENT"
            },
            navbar: {
                search: "Scan Archives...",
                language: "Language Port",
                theme: "Illumination",
                notifications: "System Alerts",
                expert: "EXPERT_NODE",
                guest: "GUEST_ACCESS"
            },
            dashboard: {
                welcome: "Welcome, Commander",
                sync_active: "System Online",
                elite_access: "Elite Access",
                description: "The culinary core is methodology synchronized. manage your high-performance recipes and categories with industrial precision.",
                new_protocol: "New Protocol",
                access_vault: "Access Vault",
                recipes_vault: "Recipes in Vault",
                active_protocols: "Active Protocols",
                managed_fleet: "Managed Fleet",
                curated_picks: "Curated Picks",
                stream_feed: "Stream Feed",
                shortcuts: "Tactical Shortcuts",
                real_time: "REAL_TIME",
                vault_update: "VAULT_UPDATE",
                pasta_carbonara: "Pasta Carbonara Node",
                "2_min_ago": "2 MIN AGO",
                metadata_sync: "METADATA_SYNC",
                italian_refined: "Italian Refined Protocol",
                "1_hour_ago": "1 HOUR AGO",
                fleet_join: "FLEET_JOIN",
                agent_authorized: "Agent Authorized",
                "3_hours_ago": "3 HOURS AGO",
                curation: "CURATION",
                ramen_favorited: "Ramen Favorited",
                "5_hours_ago": "5 HOURS AGO",
                studio: "STUDIO_NODE",
                manage_recipes: "Manage culinary assets",
                taxonomy: "TAXONOMY_NODE",
                organize_categories: "Organize asset hierarchy",
                upgrade_pro: "Upgrade to PROTOCOL_PRO",
                get_access: "GET_ACCESS"
            },
            profile: {
                identity_port: "Identity Port",
                security_active: "Security Active",
                core: "CORE_SYSTEM",
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
                title: "Taxonomy Studio",
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
                dashboard: "لوحة التحكم",
                recipes: "مركز الوصفات",
                categories: "نظام التصنيفات",
                users: "إدارة المستخدمين",
                favorites: "المفضلة",
                settings: "الإعدادات",
                logout: "إنهاء الجلسة",
                management: "الإدارة"
            },
            navbar: {
                search: "بحث في الأرشيف...",
                language: "اللغة",
                theme: "السمة",
                notifications: "التنبيهات",
                expert: "خبير",
                guest: "زائر"
            },
            dashboard: {
                welcome: "مرحباً بك، أيها الشيف",
                sync_active: "النظام متصل",
                elite_access: "وصول خاص",
                description: "تمت مزامنة نواة النظام بنجاح. يمكنك الآن إدارة الوصفات والتصنيفات بدقة واحترافية عالية.",
                new_protocol: "إضافة جديدة",
                access_vault: "دخول القبو",
                recipes_vault: "الوصفات المسجلة",
                active_protocols: "التصنيفات النشطة",
                managed_fleet: "المستخدمين المدارين",
                curated_picks: "مختارات الشيف",
                stream_feed: "آخر النشاطات",
                shortcuts: "اختصارات سريعة",
                real_time: "مباشر",
                vault_update: "تحديث القبو",
                pasta_carbonara: "وصفة باستا كاربونارا",
                "2_min_ago": "منذ دقيقتين",
                metadata_sync: "مزامنة البيانات",
                italian_refined: "بروتوكول الطهي الإيطالي",
                "1_hour_ago": "منذ ساعة",
                fleet_join: "انضمام للأسطول",
                agent_authorized: "تم تفويض العميل",
                "3_hours_ago": "منذ 3 ساعات",
                curation: "تنسيق القائمة",
                ramen_favorited: "تم تفضيل وجمع الرامن",
                "5_hours_ago": "منذ 5 ساعات",
                studio: "مركز الإنتاج",
                manage_recipes: "إدارة الأصول الغذائية",
                taxonomy: "نظام التصنيف",
                organize_categories: "تنظيم هيكل الأصول",
                upgrade_pro: "الترقية للنسخة الاحترافية",
                get_access: "الحصول على الوصول"
            },
            profile: {
                identity_port: "إعدادات الهوية",
                security_active: "الأمان مكثف",
                core: "النظام الأساسي",
                description: "إدارة ملفك الشخصي وبروتوكولات الأمان وبيانات الهوية الخاصة بك بأعلى المعايير المهنية.",
                execution_hub: "مركز التحكم",
                update_asset: "تحديث الصغرة",
                security_protocol: "بروتوكول الأمان",
                verified: "حساب موثق",
                verified_desc: "بيانات الاعتماد متزامنة بالكامل",
                archive_address: "عنوان البريد",
                comm_freq: "رقم التواصل",
                geospatial: "الموقع الجغرافي",
                auth_level: "مستوى الصلاحية",
                master_identity: "إدارة الهوية",
                master_desc: "هذه البيانات تمثل كيانك المهني داخل منصة الطهي.",
                edit_portfolio: "تعديل الملف",
            },
            categories: {
                title: "استوديو التصنيفات",
                add: "إضافة تصنيف جديد",
                search: "بحث في التصنيفات...",
                empty: "لا توجد تصنيفات حالية",
                items: "عناصر نشطة",
            },
            recipes: {
                title: "استوديو الوصفات",
                add: "إضافة وصفة جديدة",
                search: "بحث في الوصفات...",
                empty: "لا توجد وصفات مسجلة",
            },
            users: {
                title: "إدارة العملاء",
                add: "إضافة مستخدم",
                search: "بحث في المستخدمين...",
                empty: "لا يوجد مستخدمين",
            },
            common: {
                search: "بحث",
                cancel: "إلغاء",
                submit: "مزامنة",
                delete: "حذف",
                edit: "تعديل",
                success: "تمت العملية بنجاح",
                error: "خطأ في النظام"
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
