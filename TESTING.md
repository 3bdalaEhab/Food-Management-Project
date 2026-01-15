# Testing Documentation

## Overview

This project uses **Vitest** as the test runner and **React Testing Library** for component testing.

## Testing Stack

- **Test Runner**: Vitest
- **Component Testing**: React Testing Library
- **Mocking**: Vitest's vi
- **Coverage**: V8

## Setup

All test configuration is in `vitest.config.ts` and test utilities in `src/tests/setup.ts`.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- validators.test.ts
```

## Test Structure

Tests are located in `src/tests/` directory and follow naming conventions:
- `*.test.ts` for unit tests
- `*.test.tsx` for component tests
- `*.spec.ts` for integration tests

## Test Examples

### Hook Testing
```typescript
import { describe, it, expect } from 'vitest'

describe('useLocalStorage', () => {
  it('should set and retrieve value', () => {
    localStorage.setItem('key', 'value')
    expect(localStorage.getItem('key')).toBe('value')
  })
})
```

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'

describe('Component', () => {
  it('should render content', () => {
    render(<Component />)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
```

### Utility Testing
```typescript
describe('Validator', () => {
  it('should validate email', () => {
    const result = validateEmail('test@example.com')
    expect(result).toBe(true)
  })
})
```

## Mocking

### API Mocking
```typescript
import { vi } from 'vitest'

beforeEach(() => {
  global.fetch = vi.fn()
})
```

### Storage Mocking
```typescript
localStorage.setItem('key', 'value')
expect(localStorage.getItem('key')).toBe('value')
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what components do, not how they do it
   - Write tests that would fail if requirements change

2. **Use Descriptive Test Names**
   - Test names should clearly describe what is being tested
   - Use "should" prefix for clarity

3. **Keep Tests Isolated**
   - Each test should be independent
   - Use `beforeEach` and `afterEach` for setup/cleanup

4. **Test User Interactions**
   - Test the way users interact with components
   - Use React Testing Library queries like `getByRole`, `getByText`

5. **Mock External Dependencies**
   - Mock API calls, localStorage, or other external systems
   - Isolate the unit being tested

## Adding New Tests

1. Create test file alongside the component/utility
2. Follow the naming convention
3. Write descriptive test cases
4. Run tests to ensure they pass
5. Check coverage report

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
