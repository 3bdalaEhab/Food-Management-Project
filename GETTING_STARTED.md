# 🎯 كيفية البدء في العمل على المشروع

## 📌 الحالة الحالية

تم إعداد المشروع بنجاح مع:
- ✅ 9 Feature Branches
- ✅ dev branch للتطوير
- ✅ main branch للإنتاج
- ✅ توثيق شامل

---

## 🔄 الخطوات للبدء

### 1️⃣ الإعداد الأولي (مرة واحدة فقط)

```bash
# استنساخ المشروع
git clone https://github.com/3bdalaEhab/Food-Management-Project.git
cd Food-Management-Project

# تثبيت المكتبات
npm install

# تحديث الـ branches
git fetch --all
```

---

### 2️⃣ اختيار الفرع (Branch) للعمل عليه

```bash
# عرض جميع الـ branches
git branch -a

# الانتقال إلى الفرع المطلوب
git checkout feature/env-setup
```

---

### 3️⃣ العمل على الفرع

```bash
# عمل تغييرات في الملفات
# ...

# عرض التغييرات
git status

# إضافة التغييرات
git add .

# إنشاء commit
git commit -m "feat: brief description"

# دفع التغييرات
git push origin feature/env-setup
```

---

### 4️⃣ إنشاء Pull Request (PR)

1. اذهب إلى GitHub
2. سترى زر "Compare & pull request"
3. اكتب وصف الـ PR
4. اختر `dev` كـ base branch
5. اضغط "Create Pull Request"

---

## 📋 قواعس الـ Commits

استخدم البادئات التالية:

```
feat:      إضافة ميزة جديدة
fix:       إصلاح خطأ (bug)
refactor:  إعادة تنظيم كود دون تغيير الوظيفة
perf:      تحسين الأداء
docs:      تحديث التوثيق
style:     تنسيق الكود (spacing, semicolons, etc.)
test:      إضافة أو تحديث اختبارات
chore:     مهام البناء أو التحديثات
```

### أمثلة:
```bash
git commit -m "feat: add env setup with dotenv"
git commit -m "fix: resolve token expiry issue"
git commit -m "refactor: extract useAuth hook"
git commit -m "docs: update README"
```

---

## 🚀 البدء بـ Feature الأولى

### التسلسل الموصى به:

```
1. feature/env-setup          ← ابدأ هنا 🎯
2. feature/custom-hooks       ← ثم هنا
3. feature/axios-instance     ← ثم هنا
4. feature/routes-separation
5. feature/security-improvements
6. feature/error-handling
7. feature/performance-optimization
8. feature/typescript-migration
9. feature/testing-setup
```

---

## 📁 هيكل الـ Directories الجديد (بعد الانتهاء)

```
src/
├── api/
│   ├── axiosInstance.js
│   ├── interceptors.js
│   └── endpoints.js
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── usePagination.js
├── routes/
│   ├── routes.jsx
│   ├── privateRoutes.jsx
│   └── publicRoutes.jsx
├── utils/
│   ├── security.js
│   ├── validators.js
│   ├── errorHandler.js
│   └── tokenManager.js
├── components/
│   ├── ErrorBoundary.jsx
│   └── ... (existing components)
├── services/
│   └── cacheService.js
├── config/
│   └── constants.js
├── App.jsx (محسّنة)
└── main.jsx (محسّنة)
```

---

## 🔗 الملفات المهمة للقراءة

1. **[BRANCHES.md](BRANCHES.md)** - شرح كل branch بالتفصيل
2. **[DEVELOPMENT_ROADMAP.md](DEVELOPMENT_ROADMAP.md)** - خطة التطوير الكاملة
3. **README.md** - معلومات المشروع الأساسية

---

## ⚠️ نصائح مهمة

### ✅ افعل:
```bash
# اسحب التحديثات قبل العمل
git pull origin dev

# استخدم feature branches
git checkout -b feature/my-feature

# اعمل commits صغيرة ومنطقية
git commit -m "feat: one thing at a time"

# دفع التغييرات بانتظام
git push origin feature/my-feature
```

### ❌ لا تفعل:
```bash
# لا تعدل على main مباشرة
git checkout -b feature/ main  # ❌ Wrong!

# لا تعدل على dev مباشرة
git commit -m "direct to dev"   # ❌ Wrong!

# لا تنسى git pull قبل العمل
git commit...                    # ❌ May cause conflicts

# لا تستخدم git push --force
git push --force                 # ❌ Dangerous!
```

---

## 🆘 أسئلة شائعة

### س: كيف أحدّث الـ branch الخاص بي من dev؟
```bash
git fetch origin
git rebase origin/dev
```

### س: عملت commit خطأ، كيف أصلحه؟
```bash
# آخر commit
git commit --amend

# آخر 3 commits
git rebase -i HEAD~3
```

### س: حدث conflict، كيف أحله؟
```bash
# اسحب التحديثات
git pull origin dev

# تعديل الملفات المتعارضة
# ثم
git add .
git commit -m "merge: resolve conflicts"
git push origin feature/my-feature
```

### س: كيف أحذف branch محلي؟
```bash
git branch -d feature/my-feature
```

### س: كيف أحذف branch من remote؟
```bash
git push origin --delete feature/my-feature
```

---

## 📞 الدعم والمساعدة

إذا واجهت مشكلة:
1. اقرأ BRANCHES.md
2. اقرأ DEVELOPMENT_ROADMAP.md
3. ابحث في Git Issues
4. اطلب مساعدة من الفريق

---

## 🎓 موارد للتعلم

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React Hooks](https://react.dev/reference/react)
- [Axios Documentation](https://axios-http.com/)

---

**جاهز للبدء؟ 🚀**

```bash
# اختر الفرع الأول
git checkout feature/env-setup

# ابدأ العمل!
npm run dev
```

**استمتع بالعمل! 💪**
