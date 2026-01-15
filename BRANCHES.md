# 🚀 Git Branches Strategy - Food Management Project

## 📋 نظرة عامة
المشروع يستخدم **Git Flow** مع Feature Branches منفصلة لكل ميزة.

---

## 🌳 هيكل الـ Branches

### Main Branches
- **`main`** - الإصدار الإنتاجي (Production)
- **`dev`** - فرع التطوير الرئيسي (Development)

### Feature Branches

#### 1️⃣ `feature/env-setup` ✅
**الحالة:** Just Started  
**الهدف:** إعداد متغيرات البيئة (Environment Variables)  
**المهام:**
- [ ] إنشاء `.env` و `.env.example`
- [ ] إضافة `dotenv` package
- [ ] نقل جميع URLs إلى متغيرات البيئة
- [ ] حذف Hardcoded URLs من الكود
- [ ] تكوين Vite لقراءة `.env`

**الملفات المتعلقة:**
- `.env.example`
- `src/config/constants.js`
- `vite.config.js`

---

#### 2️⃣ `feature/custom-hooks` 🎣
**الحالة:** Planned  
**الهدف:** إنشاء Custom Hooks لإعادة استخدام المنطق  
**المهام:**
- [ ] `useAuth()` - للتحكم بـ Authentication
- [ ] `useFetch()` - لـ API Calls مع Loading & Error
- [ ] `useLocalStorage()` - لـ localStorage management
- [ ] `useDebounce()` - للـ Search optimization
- [ ] `usePagination()` - لـ Pagination logic

**المسار:** `src/hooks/`

---

#### 3️⃣ `feature/axios-instance` 🔌
**الحالة:** Planned  
**الهدف:** إنشاء Axios Instance مركزي مع Interceptors  
**المهام:**
- [ ] إنشاء `axiosInstance.js`
- [ ] إضافة Request Interceptors (Token)
- [ ] إضافة Response Interceptors (Error Handling)
- [ ] معالجة Token Expiry
- [ ] استخدامه في جميع API Calls

**الملفات:**
- `src/api/axiosInstance.js`
- `src/api/interceptors.js`

---

#### 4️⃣ `feature/routes-separation` 🗺️
**الحالة:** Planned  
**الهدف:** فصل Router Configuration عن App.jsx  
**المهام:**
- [ ] إنشاء `routes.jsx` ملف منفصل
- [ ] تنظيم Routes بشكل منطقي
- [ ] Implement Lazy Loading للـ Routes
- [ ] إضافة Route Guards
- [ ] تحسين Code Splitting

**الملفات:**
- `src/routes/routes.jsx`
- `src/routes/privateRoutes.jsx`
- `src/routes/publicRoutes.jsx`

---

#### 5️⃣ `feature/security-improvements` 🔒
**الحالة:** Planned  
**الهدف:** تحسينات الأمان الشاملة  
**المهام:**
- [ ] إزالة Hardcoded Credentials
- [ ] Token Refresh Logic
- [ ] Input Validation & Sanitization
- [ ] CSRF Protection
- [ ] XSS Prevention
- [ ] Rate Limiting Client-side Check

**الملفات:**
- `src/utils/security.js`
- `src/utils/validators.js`

---

#### 6️⃣ `feature/error-handling` ⚠️
**الحالة:** Planned  
**الهدف:** نظام معالجة أخطاء شامل  
**المهام:**
- [ ] Error Boundary Component
- [ ] Global Error Handler
- [ ] Custom Error Types
- [ ] User-friendly Error Messages
- [ ] Error Logging System
- [ ] Network Error Handling

**الملفات:**
- `src/components/ErrorBoundary.jsx`
- `src/utils/errorHandler.js`

---

#### 7️⃣ `feature/performance-optimization` ⚡
**الحالة:** Planned  
**الهدف:** تحسين الأداء والـ Load Time  
**المهام:**
- [ ] Remove Console.logs
- [ ] Image Optimization
- [ ] Bundle Size Analysis
- [ ] Code Splitting Implementation
- [ ] Caching Strategy (React Query / SWR)
- [ ] Virtual Scrolling for Lists

**الملفات:**
- `src/services/cacheService.js`

---

#### 8️⃣ `feature/typescript-migration` 📘
**الحالة:** Planned  
**الهدف:** إضافة TypeScript للمشروع  
**المهام:**
- [ ] تثبيت TypeScript Dependencies
- [ ] إعداد `tsconfig.json`
- [ ] تحويل جميع `.jsx` إلى `.tsx`
- [ ] إضافة Type Definitions
- [ ] إعداد Path Aliases

---

#### 9️⃣ `feature/testing-setup` 🧪
**الحالة:** Planned  
**الهدف:** إضافة Unit Tests و Integration Tests  
**المهام:**
- [ ] تثبيت Jest و React Testing Library
- [ ] كتابة tests للـ Hooks
- [ ] كتابة tests للـ Components
- [ ] كتابة tests للـ API calls
- [ ] CI/CD Setup

---

## 📊 جدول الأولويات والعملية

### Priority Levels
```
🔴 High Priority (Critical)
- feature/env-setup
- feature/custom-hooks
- feature/axios-instance
- feature/security-improvements

🟡 Medium Priority
- feature/routes-separation
- feature/error-handling
- feature/performance-optimization

🟢 Low Priority (Nice to have)
- feature/typescript-migration
- feature/testing-setup
```

---

## 🔄 Git Workflow

### للبدء في ميزة جديدة:
```bash
# 1. تحديث dev branch
git checkout dev
git pull origin dev

# 2. إنشاء feature branch
git checkout -b feature/feature-name

# 3. العمل والـ Commit
git add .
git commit -m "feat: brief description"

# 4. دفع التغييرات
git push origin feature/feature-name

# 5. إنشاء Pull Request على GitHub
```

### قواعس الـ Commits:
```
feat:  جديد ميزة جديدة
fix:   إصلاح bug
refactor: إعادة تنظيم كود
perf: تحسين الأداء
docs: توثيق
style: تنسيق (لا يؤثر على الوظيفة)
chore: مهام بناء / تحديثات dependencies
```

---

## ✅ Merge Strategy

1. **Feature Testing** ✓ - اختبر الميزة محليًا
2. **Create PR** - أنشئ Pull Request
3. **Code Review** - مراجعة الكود
4. **Merge to dev** - دمج في `dev`
5. **Test in dev** - اختبر النسخة الكاملة
6. **Release to main** - انقل إلى `main` عند الإفراج

---

## 🎯 الخطوات التالية

1. ابدأ بـ `feature/env-setup` ✅
2. ثم `feature/custom-hooks`
3. ثم `feature/axios-instance`
4. ثم باقي الـ features حسب الأولوية

---

**آخر تحديث:** 2026-01-15  
**الحالة:** جاهز للعمل 🚀
