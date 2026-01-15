/**
 * ============================================
 * شرح الاستخدام الاحترافي للمكتبات
 * ============================================
 * 
 * هذا الملف يوضح كيفية استخدام كل مكتبة
 * بالطريقة الاحترافية والفضلى
 */

// ============================================
// 1. REACT + REACT ROUTER
// ============================================
/**
 * استخدام React للـ Component-based architecture
 * مع React Router للـ Navigation
 */
import { Suspense, lazy, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// مثال: Lazy Loading للـ Components
const Dashboard = lazy(() => import('./Dashboard'));

// مثال: استخدام Routing
function AppRouter() {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/dashboard', { state: { from: 'login' } });
  };
  
  return <Suspense fallback={<Loader />}><Dashboard /></Suspense>;
}

// ============================================
// 2. AXIOS - للـ API Calls
// ============================================
/**
 * استخدام Axios للـ HTTP Requests
 * مع Interceptors للـ Authentication
 */
import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from './config/constants';

// إنشاء instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// إضافة Interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// مثال: API Call
const fetchRecipes = async () => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL);
    console.log('Recipes:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// ============================================
// 3. REACT HOOK FORM - إدارة النماذج
// ============================================
/**
 * استخدام React Hook Form لـ Form Handling
 * مع Validation وـ Error Handling
 */
import { useForm, Controller } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input 
        type="password" 
        {...register('password', { 
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' }
        })} 
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}

// ============================================
// 4. REACT BOOTSTRAP - UI Components
// ============================================
/**
 * استخدام React Bootstrap للـ Responsive Design
 * و Pre-built Components
 */
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

function RecipeCard({ recipe }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Button variant="primary">View Recipe</Button>
      </Card.Body>
    </Card>
  );
}

function RecipesList({ recipes }) {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Our Recipes</h2>
      <Row className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4} sm={6} xs={12}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// ============================================
// 5. REACT HOT TOAST - Notifications
// ============================================
/**
 * استخدام React Hot Toast لـ User Feedback
 * مع Custom Styling
 */
import toast from 'react-hot-toast';

function NotificationExample() {
  const handleSuccess = () => {
    toast.success('Operation successful!', {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#28a745',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };

  const handleError = () => {
    toast.error('Something went wrong!', {
      duration: 4000,
      position: 'top-right',
    });
  };

  const handleCustom = () => {
    toast((t) => (
      <div>
        <p>Custom notification</p>
        <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
      </div>
    ));
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleCustom}>Custom</button>
    </div>
  );
}

// ============================================
// 6. DATE-FNS - Date Handling
// ============================================
/**
 * استخدام date-fns لـ Date Formatting
 * والـ Date Calculations
 */
import { format, differenceInDays, addDays } from 'date-fns';
import { ar } from 'date-fns/locale';

function DateExample({ date }) {
  // Format date
  const formatted = format(new Date(date), 'dd/MM/yyyy', { locale: ar });
  
  // Calculate days difference
  const daysUntilExpiry = differenceInDays(new Date(date), new Date());
  
  // Add days
  const expiryDate = addDays(new Date(), 7);

  return (
    <div>
      <p>Date: {formatted}</p>
      <p>Days until expiry: {daysUntilExpiry}</p>
      <p>Expiry date: {format(expiryDate, 'dd/MM/yyyy')}</p>
    </div>
  );
}

// ============================================
// 7. JWT-DECODE - Token Management
// ============================================
/**
 * استخدام jwt-decode لـ Token Parsing
 * والـ User Info Extraction
 */
import { jwtDecode } from 'jwt-decode';

function useAuthToken() {
  const getToken = () => localStorage.getItem('token');
  
  const decodeToken = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const isTokenValid = () => {
    const decoded = decodeToken();
    if (!decoded) return false;
    
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() < expiryTime;
  };

  const getUserId = () => {
    const decoded = decodeToken();
    return decoded?.userId;
  };

  return { getToken, decodeToken, isTokenValid, getUserId };
}

// ============================================
// 8. FONTAWESOME - Icons
// ============================================
/**
 * استخدام FontAwesome للـ Icons
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function IconExample() {
  return (
    <div>
      <button><FontAwesomeIcon icon={faHome} /> Home</button>
      <button><FontAwesomeIcon icon={faUser} /> Profile</button>
      <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
      <button><FontAwesomeIcon icon={faTrash} /> Delete</button>
    </div>
  );
}

// ============================================
// 9. REACT LOADER SPINNER - Loading States
// ============================================
/**
 * استخدام React Loader Spinner لـ Loading Indicators
 */
import { ThreeDots, Rings, Oval } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <ThreeDots color="#007bff" height={80} width={80} />
      {/* أو */}
      <Rings color="#007bff" height={80} width={80} />
      {/* أو */}
      <Oval color="#007bff" height={80} width={80} />
    </div>
  );
}

// ============================================
// 10. REACT PRO SIDEBAR - Navigation
// ============================================
/**
 * استخدام React Pro Sidebar للـ Professional Navigation
 */
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar collapsed={collapsed}>
      <Menu>
        <MenuItem onClick={() => setCollapsed(!collapsed)}>
          Menu Toggle
        </MenuItem>
        
        <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
          Dashboard
        </MenuItem>
        
        <SubMenu label="Recipes" icon={<FontAwesomeIcon icon={faEdit} />}>
          <MenuItem>View Recipes</MenuItem>
          <MenuItem>Add Recipe</MenuItem>
          <MenuItem>My Recipes</MenuItem>
        </SubMenu>
        
        <MenuItem icon={<FontAwesomeIcon icon={faUser} />}>
          Profile
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

// ============================================
// أفضل الممارسات (Best Practices)
// ============================================
/**
 * 1. استخدام Custom Hooks
 *    - useFetch: للـ API Calls
 *    - useAuth: للـ Authentication
 *    - useLocalStorage: للـ Storage
 * 
 * 2. Error Handling
 *    - Try/Catch blocks
 *    - Custom Error Boundary
 *    - Error Toast Notifications
 * 
 * 3. Loading States
 *    - Spinners while fetching
 *    - Skeleton loaders
 *    - Suspense boundaries
 * 
 * 4. Performance
 *    - Lazy loading components
 *    - Memoization with useMemo
 *    - useCallback for functions
 *    - Code splitting
 * 
 * 5. Code Organization
 *    - Constants في ملف منفصل
 *    - Custom Hooks في مجلد hooks
 *    - API calls في مجلد api
 *    - Utilities في مجلد utils
 * 
 * 6. Responsive Design
 *    - React Bootstrap للـ Grid System
 *    - Mobile-first approach
 *    - Media queries في CSS
 * 
 * 7. Form Handling
 *    - React Hook Form للـ Forms
 *    - Validation rules
 *    - Error messages
 *    - Loading states on submit
 * 
 * 8. Security
 *    - JWT tokens للـ Authentication
 *    - Interceptors للـ Authorization
 *    - Token validation
 *    - Logout on 401
 */

export { 
  AppRouter, 
  LoginForm, 
  RecipesList,
  NotificationExample,
  DateExample,
  useAuthToken,
  IconExample,
  LoadingSpinner,
  SidebarNav
};
