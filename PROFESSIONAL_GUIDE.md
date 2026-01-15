# 🍽️ Food Management Project - Professional Complete Guide

## 📚 Guide Contents

1. [Overview](#overview)
2. [Libraries Used](#libraries-used)
3. [Architecture](#architecture)
4. [Installation & Setup](#installation--setup)
5. [Practical Examples](#practical-examples)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**A professional recipe management project** built using the latest React and web technologies.

**Features:**
✅ Responsive Design
✅ Modern UI/UX
✅ Professional Code Structure
✅ Error Handling
✅ Performance Optimization
✅ Security Best Practices
✅ Complete Documentation
✅ Easy to Extend

---

## 📦 Libraries Used

### Core Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI Library |
| React DOM | 18.2.0 | React Rendering |
| React Router DOM | 6.22.0 | Routing |
| Vite | 5.1.0 | Build Tool |
| Bootstrap | 5.3.2 | CSS Framework |
| React Bootstrap | 2.10.1 | Bootstrap Components |
| Axios | 1.6.7 | HTTP Client |

### Form & Validation

| Library | Version | Purpose |
|---------|---------|---------|
| React Hook Form | 7.50.1 | Form Management |

### UI & Notifications

| Library | Version | Purpose |
|---------|---------|---------|
| React Hot Toast | 2.4.1 | Toast Notifications |
| React Loader Spinner | 6.1.6 | Loading Spinners |
| FontAwesome | 6.5.1 | Icons |

### Data & Date

| Library | Version | Purpose |
|---------|---------|---------|
| date-fns | 3.3.1 | Date Formatting |

### Authentication

| Library | Version | Purpose |
|---------|---------|---------|
| jwt-decode | 4.0.0 | JWT Token Decoding |

### Navigation

| Library | Version | Purpose |
|---------|---------|---------|
| React Pro Sidebar | 1.1.0 | Sidebar Menu |

---

## 🏗️ Architecture

### Folder Structure

```
src/
├── api/
│   ├── axiosInstance.js      # Axios configuration
│   ├── endpoints.js           # API endpoints
│   └── interceptors.js        # Request/Response interceptors
├── hooks/
│   ├── useAuth.js            # Authentication hook
│   ├── useFetch.js           # Fetch data hook
│   ├── useDebounce.js        # Debounce hook
│   ├── usePagination.js      # Pagination hook
│   └── useLocalStorage.js    # LocalStorage hook
├── utils/
│   ├── validators.js         # Data validators
│   ├── tokenManager.js       # Token management
│   ├── errorHandler.js       # Error handling
│   ├── errorTypes.js         # Error types
│   ├── logger.js             # Logging
│   ├── cacheManager.js       # Caching
│   └── performanceOptimization.js
├── components/
│   ├── ErrorBoundary/        # Error boundary
│   ├── NavBar/               # Navigation bar
│   ├── SideBar/              # Sidebar
│   └── ...other components
├── AuthModule/               # Authentication module
├── RecipesModule/            # Recipes module
├── UserModule/               # User module
├── SharedModule/             # Shared components
├── categoriesModule/         # Categories module
├── HomeModule/               # Home module
├── routes/                   # Route definitions
├── types/                    # TypeScript types
├── config/                   # Configuration
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/3bdalaEhab/Food-Management-Project.git

# 2. Navigate to project directory
cd Food-Management-Project

# 3. Install dependencies
npm install

# 4. Create .env file
# Add your API endpoints and configuration

# 5. Start development server
npm run dev

# 6. Open browser
# Visit http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

---

## 💡 Practical Examples

### Example 1: Using useFetch Hook

```jsx
import { useFetch } from './hooks/useFetch';
import { axiosInstance } from './api/axiosInstance';
import { API_ENDPOINTS } from './api/endpoints';

function RecipesList() {
  // Fetch recipes from API
  const { data: recipes, loading, error } = useFetch(
    () => axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL)
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipesList;
```

### Example 2: React Hook Form with Validation

```jsx
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from './utils/validators';
import toast from 'react-hot-toast';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Submit login
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );
      
      // Save token
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          validate: validateEmail
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          validate: validatePassword
        })}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

### Example 3: Toast Notifications

```jsx
import toast from 'react-hot-toast';

function NotificationExample() {
  const handleSuccess = () => {
    toast.success('Operation successful!', {
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleError = () => {
    toast.error('An error occurred!', {
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleLoading = () => {
    toast.loading('Processing...', {
      position: 'top-right'
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleLoading}>Show Loading</button>
    </div>
  );
}

export default NotificationExample;
```

### Example 4: date-fns Date Formatting

```jsx
import { format, parseISO, isToday, differenceInDays } from 'date-fns';

function DateExample() {
  const apiDate = "2024-01-15T10:30:00Z";
  const date = parseISO(apiDate);

  return (
    <div>
      {/* Format: Jan 15, 2024 */}
      <p>Date: {format(date, 'MMM dd, yyyy')}</p>

      {/* Format: Monday, 10:30 AM */}
      <p>Full: {format(date, 'EEEE, hh:mm a')}</p>

      {/* Check if today */}
      {isToday(date) && <p>This is today!</p>}

      {/* Days difference */}
      <p>Days ago: {differenceInDays(new Date(), date)}</p>
    </div>
  );
}

export default DateExample;
```

### Example 5: JWT Token Handling

```jsx
import { jwtDecode } from 'jwt-decode';
import { isTokenValid } from './utils/tokenManager';

function TokenExample() {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    // Redirect to login
    return <Navigate to="/login" />;
  }

  // Decode token
  const decoded = jwtDecode(token);
  const userId = decoded.userId;
  const email = decoded.email;
  const role = decoded.role;

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default TokenExample;
```

### Example 6: Bootstrap Grid System

```jsx
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function LayoutExample() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* 3 columns on desktop, 1 on mobile */}
        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recipe 1</Card.Title>
              <Card.Text>Description here</Card.Text>
              <Button variant="primary">View Recipe</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recipe 2</Card.Title>
              <Card.Text>Description here</Card.Text>
              <Button variant="primary">View Recipe</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recipe 3</Card.Title>
              <Card.Text>Description here</Card.Text>
              <Button variant="primary">View Recipe</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LayoutExample;
```

---

## ✨ Best Practices

### 1. Use Custom Hooks for Logic
```jsx
// Good ✅
const { data, loading } = useFetch(fetchData);

// Bad ❌
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
// ... repeat in every component
```

### 2. Validate Input Data
```jsx
// Good ✅
if (!validateEmail(email)) {
  toast.error('Invalid email');
  return;
}

// Bad ❌
// Send data without validation
```

### 3. Use Error Boundaries
```jsx
// Good ✅
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Bad ❌
// No error handling
<YourComponent />
```

### 4. Use Suspense for Lazy Loading
```jsx
// Good ✅
const Component = lazy(() => import('./Component'));

<Suspense fallback={<Spinner />}>
  <Component />
</Suspense>

// Bad ❌
// Load all components at once
```

### 5. Cache API Responses
```jsx
// Good ✅
const cacheManager = new CacheManager();
const cachedData = cacheManager.get('recipes');

// Bad ❌
// Fetch the same data multiple times
```

### 6. Use Environment Variables
```jsx
// Good ✅
const API_URL = import.meta.env.VITE_API_URL;

// Bad ❌
const API_URL = 'http://api.example.com';
```

### 7. Use Toast for User Feedback
```jsx
// Good ✅
toast.success('Recipe added successfully!');
toast.error('Error adding recipe!');

// Bad ❌
alert('Success');
alert('Error');
```

### 8. Organize Components by Feature
```
// Good ✅
RecipesModule/
  ├── RecipesList/
  ├── AddRecipe/
  └── RecipeDetail/

// Bad ❌
components/
  ├── RecipesList.jsx
  ├── AddRecipe.jsx
  ├── RecipeDetail.jsx
  └── ... 50 more files
```

---

## 🐛 Troubleshooting

### Issue 1: CORS Error

**Problem:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
```jsx
// Update axiosInstance.js with proper headers
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
```

### Issue 2: Token Expired

**Problem:** `Unauthorized` error

**Solution:**
```jsx
// Use interceptor to refresh token
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Refresh token or redirect to login
      redirectToLogin();
    }
  }
);
```

### Issue 3: Long Load Time

**Problem:** App takes too long to load

**Solution:**
```jsx
// Use lazy loading and code splitting
const Component = lazy(() => import('./Component'));
// Use Suspense with fallback
```

### Issue 4: Memory Leak Warning

**Problem:** `Warning: Memory leak in useEffect`

**Solution:**
```jsx
// Clean up in useEffect
useEffect(() => {
  return () => {
    // Cleanup code
  };
}, [dependency]);
```

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Axios Documentation](https://axios-http.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)

---

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Contact

For questions or suggestions, please contact the development team.

---

**Happy Coding!** 🚀
