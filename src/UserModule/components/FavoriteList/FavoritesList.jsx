import { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useFavorites } from '../../hooks/useFavorites';
import { Heart, Trash2, Download } from 'lucide-react';
import './FavoritesList.css';

function FavoritesList() {
  const {
    favorites,
    removeFavorite,
    clearFavorites,
    sortFavorites,
    getFavoritesCount
  } = useFavorites();

  const [sortBy, setSortBy] = useState('recent');

  const sortedFavorites = sortFavorites(sortBy);

  const handleExport = () => {
    const data = favorites.map(recipe => ({
      name: recipe.name,
      category: recipe.category,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      rating: recipe.rating
    }));

    const csv = [
      ['Name', 'Category', 'Difficulty', 'Cooking Time (min)', 'Rating'],
      ...data.map(r => [r.name, r.category, r.difficulty, r.cookingTime, r.rating])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `favorites-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container className="py-4 favorites-container">
      <div className="favorites-header mb-4">
        <h1>My Favorite Recipes</h1>
        <p className="text-muted">Total: {getFavoritesCount()} recipes</p>
      </div>

      {favorites.length > 0 && (
        <Card className="controls-card mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-3 align-items-center">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold mb-2">Sort By</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Highest Rating</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex gap-2 justify-content-end pt-md-0 pt-3">
                <Button
                  variant="outline-success"
                  onClick={handleExport}
                  className="btn-icon"
                >
                  <Download size={18} /> Export CSV
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    if (window.confirm('Clear all favorites?')) {
                      clearFavorites();
                    }
                  }}
                  className="btn-icon"
                >
                  <Trash2 size={18} /> Clear All
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {favorites.length === 0 ? (
        <div className="empty-state text-center py-5">
          <Heart size={64} className="text-muted mb-3" />
          <h3 className="text-muted">No Favorite Recipes Yet</h3>
          <p className="text-muted">
            Add recipes to your favorites to see them here
          </p>
        </div>
      ) : (
        <Row className="g-4">
          {sortedFavorites.map((recipe) => (
            <Col key={recipe.id} md={6} lg={4}>
              <Card className="favorite-card h-100 shadow-sm">
                {recipe.image && (
                  <div className="recipe-image-container">
                    <Card.Img
                      variant="top"
                      src={recipe.image}
                      alt={recipe.name}
                      className="recipe-image"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="remove-btn"
                      onClick={() => removeFavorite(recipe.id)}
                      title="Remove from favorites"
                    >
                      <Heart size={18} fill="currentColor" />
                    </Button>
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate mb-2">
                    {recipe.name}
                  </Card.Title>

                  <div className="recipe-info mb-3">
                    <span className="badge bg-primary">{recipe.category}</span>
                    <span className="badge bg-info">{recipe.difficulty}</span>
                    {recipe.cookingTime && (
                      <span className="badge bg-success">
                        {recipe.cookingTime} min
                      </span>
                    )}
                  </div>

                  {recipe.description && (
                    <p className="text-muted text-truncate-2 flex-grow-1">
                      {recipe.description}
                    </p>
                  )}

                  {recipe.rating && (
                    <div className="recipe-rating mt-auto pt-3 border-top">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="stars">
                          {'⭐'.repeat(Math.round(recipe.rating))}
                        </span>
                        <span className="rating-value">
                          {recipe.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesList;
