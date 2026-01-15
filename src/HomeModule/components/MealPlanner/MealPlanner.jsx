import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useMealPlanner } from '../../hooks/useMealPlanner';
import { format, startOfWeek, addDays } from 'date-fns';
import { Download, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import './MealPlanner.css';

function MealPlanner() {
  const {
    getMealsForWeek,
    addMealToDay,
    removeMealFromDay,
    generateShoppingList,
    clearDay,
    getMealPlanStats
  } = useMealPlanner();

  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const weekMeals = getMealsForWeek(currentWeekStart);
  const stats = getMealPlanStats();

  const handlePreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handleExportShoppingList = () => {
    const endDate = addDays(currentWeekStart, 6);
    const shoppingList = generateShoppingList(currentWeekStart, endDate);

    if (shoppingList.length === 0) {
      toast.error('No ingredients in meal plan');
      return;
    }

    const csv = [
      ['Ingredient', 'Quantity', 'Unit'],
      ...shoppingList.map(item => [
        item.name,
        item.quantity,
        item.unit || ''
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${format(currentWeekStart, 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Shopping list downloaded');
  };

  const renderMealCard = (date, mealType) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const meals = weekMeals[dateStr] || {};
    const recipe = meals[mealType];

    return (
      <div key={mealType} className="meal-slot">
        <div className="meal-type">{mealType.toUpperCase()}</div>
        {recipe ? (
          <div className="meal-content">
            <p className="meal-name">{recipe.name}</p>
            {recipe.cookingTime && (
              <span className="badge bg-info text-dark">{recipe.cookingTime} min</span>
            )}
            <Button
              size="sm"
              variant="outline-danger"
              className="mt-2"
              onClick={() => removeMealFromDay(date, mealType)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ) : (
          <button
            className="add-meal-btn"
            onClick={() => {
              setSelectedDate(date);
              setSelectedMealType(mealType);
              setShowModal(true);
            }}
          >
            + Add Meal
          </button>
        )}
      </div>
    );
  };

  return (
    <Container className="py-4 meal-planner-container">
      <div className="planner-header mb-4">
        <h1>Weekly Meal Planner</h1>
        <div className="planner-stats">
          <Badge bg="primary" className="stat-badge">
            {stats.totalDays} Days
          </Badge>
          <Badge bg="success" className="stat-badge">
            {stats.totalMeals} Meals
          </Badge>
          <Badge bg="info" className="stat-badge">
            {stats.uniqueRecipes} Recipes
          </Badge>
        </div>
      </div>

      {/* Week Navigation */}
      <Card className="navigation-card mb-4">
        <Card.Body className="d-flex align-items-center justify-content-between">
          <Button
            variant="outline-primary"
            onClick={handlePreviousWeek}
            className="nav-btn"
          >
            <ChevronLeft size={20} />
          </Button>

          <h5 className="mb-0">
            {format(currentWeekStart, 'MMM dd')} -{' '}
            {format(addDays(currentWeekStart, 6), 'MMM dd, yyyy')}
          </h5>

          <Button
            variant="outline-primary"
            onClick={handleNextWeek}
            className="nav-btn"
          >
            <ChevronRight size={20} />
          </Button>
        </Card.Body>
      </Card>

      {/* Action Buttons */}
      <div className="action-buttons mb-4">
        <Button
          variant="success"
          onClick={handleExportShoppingList}
          className="action-btn"
        >
          <Download size={18} /> Generate Shopping List
        </Button>
      </div>

      {/* Weekly Grid */}
      <Row className="g-3">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = addDays(currentWeekStart, i);
          const dateStr = format(date, 'yyyy-MM-dd');

          return (
            <Col key={dateStr} md={6} lg={4}>
              <Card className="day-card h-100">
                <Card.Header className="day-header bg-primary text-white">
                  <div className="day-date">
                    {format(date, 'EEE')}
                  </div>
                  <div className="day-number">
                    {format(date, 'dd')}
                  </div>
                  <Button
                    size="sm"
                    variant="outline-light"
                    className="clear-day-btn"
                    onClick={() => {
                      if (window.confirm('Clear all meals for this day?')) {
                        clearDay(date);
                      }
                    }}
                    title="Clear day"
                  >
                    <Trash2 size={14} />
                  </Button>
                </Card.Header>
                <Card.Body className="day-meals">
                  {mealTypes.map(mealType =>
                    renderMealCard(date, mealType)
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Add Meal Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add {selectedMealType?.toUpperCase()} -{' '}
            {selectedDate && format(selectedDate, 'MMM dd')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select a Recipe</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for recipe..."
              className="mb-3"
            />
            <p className="text-muted text-center">
              (Connect to your API to show recipes)
            </p>
            <div className="recipe-selection">
              <p className="text-center text-muted">
                No recipes available yet
              </p>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MealPlanner;
