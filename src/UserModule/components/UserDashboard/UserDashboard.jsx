import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axiosInstance';
import { API_ENDPOINTS } from '../../api/endpoints';
import { Spinner } from '../../SharedModule/components/Pagination/Spinner';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import toast from 'react-hot-toast';
import './UserDashboard.css';

function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useLocalStorage('user_stats', {});
  const [loading, setLoading] = useState(true);

  // Mock stats - replace with API call
  useEffect(() => {
    const mockStats = {
      totalRecipes: 24,
      totalFavorites: 8,
      mealsPlanned: 15,
      recipesCreated: 3,
      lastWeekViews: [
        { day: 'Mon', views: 12 },
        { day: 'Tue', views: 19 },
        { day: 'Wed', views: 8 },
        { day: 'Thu', views: 25 },
        { day: 'Fri', views: 18 },
        { day: 'Sat', views: 22 },
        { day: 'Sun', views: 14 }
      ],
      recipesByCategory: [
        { category: 'Breakfast', count: 6 },
        { category: 'Lunch', count: 8 },
        { category: 'Dinner', count: 7 },
        { category: 'Dessert', count: 3 }
      ],
      recentActivity: [
        {
          id: 1,
          action: 'Added recipe to favorites',
          recipe: 'Classic Pasta Carbonara',
          date: new Date().toISOString()
        },
        {
          id: 2,
          action: 'Created new recipe',
          recipe: 'Homemade Pizza',
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          action: 'Rated recipe',
          recipe: 'Chocolate Cake',
          date: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    };

    setStats(mockStats);
    setLoading(false);
  }, [setStats]);

  const statCards = [
    { title: 'Total Recipes', value: stats.totalRecipes || 0, color: 'primary', icon: '🍽️' },
    { title: 'Favorites', value: stats.totalFavorites || 0, color: 'danger', icon: '❤️' },
    { title: 'Meals Planned', value: stats.mealsPlanned || 0, color: 'success', icon: '📅' },
    { title: 'Created', value: stats.recipesCreated || 0, color: 'info', icon: '✨' }
  ];

  if (loading) return <Spinner />;

  return (
    <Container className="py-4 user-dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section mb-5">
        <h1>Welcome, {user?.name || 'User'}! 👋</h1>
        <p className="text-muted">Here's your recipe dashboard overview</p>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        {statCards.map((card, idx) => (
          <Col key={idx} md={6} lg={3}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <div className="stat-icon">{card.icon}</div>
                <Card.Title className="stat-title">{card.title}</Card.Title>
                <h2 className={`stat-value text-${card.color}`}>
                  {card.value}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row className="g-4 mb-5">
        {/* Activity Chart */}
        <Col lg={6}>
          <Card className="chart-card shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Last Week Activity</h5>
            </Card.Header>
            <Card.Body>
              <div className="activity-chart">
                {stats.lastWeekViews?.map((day, idx) => (
                  <div key={idx} className="activity-bar">
                    <div className="bar-label">{day.day}</div>
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={{
                          height: `${(day.views / Math.max(...(stats.lastWeekViews?.map(d => d.views) || [1]))) * 100}%`
                        }}
                      />
                    </div>
                    <div className="bar-value">{day.views}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recipes by Category */}
        <Col lg={6}>
          <Card className="chart-card shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Recipes by Category</h5>
            </Card.Header>
            <Card.Body>
              <div className="category-list">
                {stats.recipesByCategory?.map((cat, idx) => (
                  <div key={idx} className="category-item">
                    <div className="category-name">{cat.category}</div>
                    <ProgressBar
                      now={(cat.count / (stats.totalRecipes || 1)) * 100}
                      className="category-bar"
                      label={cat.count}
                    />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card className="activity-card shadow-sm mb-5">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Recent Activity</h5>
        </Card.Header>
        <Card.Body>
          <div className="activity-list">
            {stats.recentActivity?.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-marker" />
                <div className="activity-content">
                  <p className="activity-action">
                    <strong>{activity.action}</strong>
                  </p>
                  <p className="activity-recipe">{activity.recipe}</p>
                  <small className="activity-date">
                    {new Date(activity.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Quick Stats Summary */}
      <Card className="summary-card shadow-sm">
        <Card.Body>
          <Row className="text-center">
            <Col md={4}>
              <div className="summary-item">
                <h6 className="text-muted">Favorites Count</h6>
                <h3 className="text-danger">{stats.totalFavorites || 0}</h3>
              </div>
            </Col>
            <Col md={4}>
              <div className="summary-item">
                <h6 className="text-muted">Meal Plans</h6>
                <h3 className="text-success">{stats.mealsPlanned || 0}</h3>
              </div>
            </Col>
            <Col md={4}>
              <div className="summary-item">
                <h6 className="text-muted">Recipes Created</h6>
                <h3 className="text-info">{stats.recipesCreated || 0}</h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDashboard;
