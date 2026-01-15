# 🍽️ Food Management Project - الدليل الشامل للبدء

## 📚 محتوى الدليل

1. [نظرة عامة](#نظرة-عامة)
2. [المكتبات المستخدمة](#المكتبات-المستخدمة)
3. [البنية الهندسية](#البنية-الهندسية)
4. [التثبيت والإعداد](#التثبيت-والإعداد)
5. [أمثلة عملية](#أمثلة-عملية)
6. [أفضل الممارسات](#أفضل-الممارسات)
7. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## 🎯 نظرة عامة

مشروع **احترافي لإدارة الوصفات** مبني باستخدام أحدث التقنيات في عالم React والويب بشكل عام.

**المميزات:**
✅ تصميم استجابي (Responsive)  
✅ إدارة النماذج احترافية  
✅ معالجة الأخطاء الشاملة  
✅ توثيق كامل  
✅ أمان عالي  
✅ أداء محسّن  

---

## 📦 المكتبات المستخدمة

### Frontend Framework
- **React 18.2.0** - إطار العمل الأساسي
- **React DOM 18.2.0** - تطبيق React على DOM

### Routing & Navigation
- **React Router DOM 6.22.0** - نظام التوجيه المتقدم

### HTTP & API
- **Axios 1.6.7** - مكتبة الـ HTTP Requests المتقدمة

### UI & Styling
- **Bootstrap 5.3.2** - إطار العمل CSS
- **React Bootstrap 2.10.1** - مكونات Bootstrap ل React
- **React Pro Sidebar 1.1.0** - شريط تنقل احترافي
- **FontAwesome 6.5.1** - مكتبة الأيقونات

### Forms & Validation
- **React Hook Form 7.50.1** - إدارة النماذج

### User Feedback
- **React Hot Toast 2.4.1** - الإشعارات

### Date Handling
- **date-fns 3.3.1** - معالجة التواريخ

### Authentication
- **jwt-decode 4.0.0** - فك تشفير JWT

### Loading States
- **React Loader Spinner 6.1.6** - مؤشرات التحميل

### Build & Development
- **Vite 5.1.0** - أداة البناء السريعة
- **ESLint** - فحص جودة الكود

---

## 📁 البنية الهندسية

```
src/
├── App.jsx                          # المكون الرئيسي
├── App.css                          # أنماط التطبيق
├── index.css                        # الأنماط العامة
├── main.jsx                         # نقطة الدخول
│
├── api/                             # طبقة API
│   ├── axiosInstance.js             # إعدادات Axios
│   ├── endpoints.js                 # نقاط الاتصال
│   └── interceptors.js              # معالجات Axios
│
├── config/                          # الإعدادات
│   └── constants.js                 # الثوابت
│
├── hooks/                           # الـ Hooks المخصصة
│   ├── useAuth.js                   # المصادقة
│   ├── useFetch.js                  # جلب البيانات
│   ├── useLocalStorage.js           # التخزين
│   ├── useDebounce.js               # التأخير
│   └── usePagination.js             # الترقيم
│
├── components/                      # المكونات المشتركة
│   └── ErrorBoundary/               # معالج الأخطاء
│
├── utils/                           # الدوال المساعدة
│   ├── validators.js                # التحقق من البيانات
│   ├── tokenManager.js              # إدارة الرموز
│   ├── errorHandler.js              # معالجة الأخطاء
│   ├── logger.js                    # تسجيل الأحداث
│   └── cacheManager.js              # إدارة الذاكرة المؤقتة
│
├── types/                           # تعريفات TypeScript
│   ├── index.ts                     # أنواع البيانات
│   └── guards.ts                    # حراس النوع
│
├── tests/                           # ملفات الاختبار
│   ├── setup.ts                     # إعداد الاختبار
│   ├── validators.test.ts           # اختبار التحقق
│   └── ...
│
├── AuthModule/                      # وحدة المصادقة
├── HomeModule/                      # وحدة الصفحة الرئيسية
├── RecipesModule/                   # وحدة الوصفات
├── UserModule/                      # وحدة المستخدم
├── categoriesModule/                # وحدة الفئات
└── SharedModule/                    # المكونات المشتركة
    ├── components/
    │   ├── MasterLayout/            # تخطيط الرئيسي
    │   ├── NavBar/                  # شريط التنقل
    │   ├── SideBar/                 # الشريط الجانبي
    │   └── ...
    └── ...
```

---

## 🚀 التثبيت والإعداد

### 1. متطلبات النظام
```bash
Node.js >= 16.0
npm >= 8.0
```

### 2. التثبيت
```bash
# استنساخ المشروع
git clone <repository-url>

# الذهاب للمجلد
cd Food-Management-Project

# تثبيت المكتبات
npm install
```

### 3. إعداد متغيرات البيئة
```bash
# نسخ الملف النموذجي
cp .env.example .env

# تحرير الملف وإضافة البيانات الصحيحة
# VITE_API_BASE_URL=https://your-api-url
# VITE_API_TIMEOUT=10000
```

### 4. تشغيل المشروع
```bash
# بيئة التطوير
npm run dev

# البناء للإنتاج
npm run build

# معاينة الإنتاج
npm run preview

# فحص الكود
npm run lint
```

---

## 💡 أمثلة عملية

### 1. استخدام useFetch للحصول على البيانات

```jsx
import { useFetch } from '@/hooks';
import { API_ENDPOINTS } from '@/config/constants';
import axiosInstance from '@/api/axiosInstance';

function RecipesList() {
  const { data, loading, error } = useFetch(
    () => axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL)
  );

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {data?.map(recipe => (
        <Card key={recipe.id}>
          <Card.Img src={recipe.image} />
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
```

### 2. إنشاء نموذج مع React Hook Form

```jsx
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils/validators';
import toast from 'react-hot-toast';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );
      
      localStorage.setItem('token', response.data.token);
      toast.success('تم الدخول بنجاح');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في الدخول');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          type="email"
          {...register('email', {
            required: 'البريد مطلوب',
            validate: validateEmail
          })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>كلمة المرور</Form.Label>
        <Form.Control
          type="password"
          {...register('password', {
            required: 'كلمة المرور مطلوبة',
            validate: validatePassword
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="w-100">
        دخول
      </Button>
    </form>
  );
}
```

### 3. عرض الإشعارات

```jsx
import toast from 'react-hot-toast';

// نجاح
toast.success('تم الحفظ بنجاح!');

// خطأ
toast.error('حدث خطأ ما');

// معلومة
toast((t) => (
  <div>
    <p>هل أنت متأكد؟</p>
    <button onClick={() => {
      handleDelete();
      toast.dismiss(t.id);
    }}>
      نعم، احذف
    </button>
  </div>
));
```

### 4. معالجة التواريخ

```jsx
import { format, addDays, differenceInDays } from 'date-fns';
import { ar } from 'date-fns/locale';

function RecipeDate({ createdAt, expiresAt }) {
  const created = format(new Date(createdAt), 'dd MMMM yyyy', { locale: ar });
  const daysLeft = differenceInDays(new Date(expiresAt), new Date());

  return (
    <div>
      <p>تاريخ الإنشاء: {created}</p>
      <p>أيام المتبقية: {daysLeft}</p>
    </div>
  );
}
```

### 5. استخراج بيانات المستخدم من JWT

```jsx
import { jwtDecode } from 'jwt-decode';

function useAuthToken() {
  const token = localStorage.getItem('token');
  
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    
    // التحقق من انتهاء الصلاحية
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
}
```

### 6. استخدام Bootstrap مع React

```jsx
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={4} md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>إجمالي الوصفات</Card.Title>
              <h2>42</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>المفضلة</Card.Title>
              <h2>18</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>المستخدمون</Card.Title>
              <h2>256</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
```

---

## ✨ أفضل الممارسات

### 1. استخدام Custom Hooks
```jsx
// ❌ خطأ
const [recipes, setRecipes] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  // fetch logic
}, []);

// ✅ صحيح
const { data: recipes, loading, error } = useFetch(
  () => axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL)
);
```

### 2. معالجة الأخطاء
```jsx
// ❌ خطأ
try {
  await api.call();
} catch (error) {
  console.log(error);
}

// ✅ صحيح
try {
  await api.call();
} catch (error) {
  const message = error.response?.data?.message || 'حدث خطأ';
  toast.error(message);
  logger.error('API Error:', error);
}
```

### 3. التحقق من البيانات
```jsx
// ❌ خطأ
const email = data.email;

// ✅ صحيح
import { validateEmail } from '@/utils/validators';

if (!validateEmail(data.email)) {
  toast.error('البريد غير صحيح');
  return;
}
```

### 4. الترقيم (Pagination)
```jsx
const { items, page, totalPages, goToPage } = usePagination(
  recipes,
  10 // items per page
);

<Pagination>
  <Pagination.First onClick={() => goToPage(0)} />
  {[...Array(totalPages)].map((_, i) => (
    <Pagination.Item
      key={i}
      active={i === page}
      onClick={() => goToPage(i)}
    >
      {i + 1}
    </Pagination.Item>
  ))}
  <Pagination.Last onClick={() => goToPage(totalPages - 1)} />
</Pagination>
```

### 5. استخدام Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const RecipesList = lazy(() => import('./pages/RecipesList'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<RecipesList />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 🐛 استكشاف الأخطاء

### المشكلة: CORS Error
```bash
# الحل: تأكد من أن API يدعم CORS
# أو استخدم Proxy في vite.config.js
```

### المشكلة: Token مفقود
```jsx
// تأكد من حفظ Token بعد الدخول
localStorage.setItem('token', response.data.token);
```

### المشكلة: Form يرسل بيانات فارغة
```jsx
// استخدم handleSubmit من React Hook Form
const { handleSubmit } = useForm();
<form onSubmit={handleSubmit(onSubmit)}>
```

### المشكلة: Performance بطيء
```jsx
// استخدم useMemo و useCallback
const memoizedValue = useMemo(() => expensiveOperation(), [dependency]);
const memoizedCallback = useCallback(() => doSomething(), [dependency]);
```

---

## 📞 التواصل والدعم

للمزيد من المعلومات:
- 📧 البريد الإلكتروني: support@example.com
- 💬 Discord: your-discord-server
- 🐙 GitHub: your-github-repo

---

**تم الإنشاء بـ ❤️ باستخدام React و Vite**
