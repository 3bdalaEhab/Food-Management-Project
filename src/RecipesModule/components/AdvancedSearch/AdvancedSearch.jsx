import { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import toast from 'react-hot-toast';
import './AdvancedSearch.css';

function AdvancedSearch() {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    loading,
    error,
    search,
    resetFilters
  } = useAdvancedSearch();

  useEffect(() => {
    search();
  }, [searchTerm, filters]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleDifficultyChange = (e) => {
    setFilters({ ...filters, difficulty: e.target.value });
  };

  const handleTimeChange = (e) => {
    setFilters({ ...filters, maxTime: parseInt(e.target.value) });
  };

  const handleRatingChange = (e) => {
    setFilters({ ...filters, minRating: parseInt(e.target.value) });
  };

  return (
    <Container className="py-4 advanced-search-container">
      <h1 className="mb-4">Advanced Recipe Search</h1>

      {/* Search & Filters */}
      <Card className="search-card mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            {/* Search Input */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-bold">Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name, ingredients, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  size="lg"
                />
              </Form.Group>
            </Col>

            {/* Category Filter */}
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={handleCategoryChange}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snacks">Snacks</option>
                  <option value="beverages">Beverages</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Difficulty Filter */}
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-bold">Difficulty</Form.Label>
                <Form.Select
                  value={filters.difficulty}
                  onChange={handleDifficultyChange}
                  className="filter-select"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Cooking Time Filter */}
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-bold">Max Time</Form.Label>
                <Form.Select
                  value={filters.maxTime}
                  onChange={handleTimeChange}
                  className="filter-select"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                  <option value={999}>Any time</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Rating Filter */}
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label className="fw-bold">Min Rating</Form.Label>
                <Form.Select
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  className="filter-select"
                >
                  <option value={0}>All Ratings</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={5}>5 Stars</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Reset Button */}
            <Col md={12}>
              <Button 
                variant="outline-secondary" 
                onClick={resetFilters}
                className="w-100"
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Count */}
      {!loading && (
        <div className="mb-3">
          <p className="text-muted">
            Found <strong>{results.length}</strong> recipe{results.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <Spinner />
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <Row className="g-4">
          {results.map((recipe) => (
            <Col key={recipe.id} md={6} lg={4}>
              <Card className="recipe-result-card h-100 shadow-sm hover-shadow">
                {recipe.image && (
                  <Card.Img
                    variant="top"
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                )}
                <Card.Body>
                  <Card.Title className="text-truncate">{recipe.name}</Card.Title>
                  <div className="recipe-meta mb-3">
                    <span className="badge bg-primary">{recipe.category}</span>
                    <span className="badge bg-info">{recipe.difficulty}</span>
                    {recipe.cookingTime && (
                      <span className="badge bg-success">{recipe.cookingTime} min</span>
                    )}
                  </div>
                  {recipe.description && (
                    <Card.Text className="text-truncate-2 text-muted">
                      {recipe.description}
                    </Card.Text>
                  )}
                  <div className="recipe-footer">
                    {recipe.rating && (
                      <div className="rating">
                        <span className="stars">
                          {'⭐'.repeat(Math.round(recipe.rating))}
                        </span>
                        <span className="rating-text">({recipe.rating})</span>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && (searchTerm || filters.category) && (
        <div className="text-center py-5">
          <h4 className="text-muted">No recipes found</h4>
          <p className="text-muted">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && results.length === 0 && !searchTerm && !filters.category && (
        <div className="text-center py-5">
          <h4 className="text-muted">Start searching for recipes</h4>
          <p className="text-muted">Enter a search term or adjust the filters above</p>
        </div>
      )}
    </Container>
  );
}

export default AdvancedSearch;
