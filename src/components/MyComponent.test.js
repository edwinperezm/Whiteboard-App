// Correct approach
import { render, screen } from '@testing-library/react';

import React from 'react';
import MyComponent from './MyComponent';

test('my test', () => {
  render(<MyComponent />);
  const element = screen.getByTestId('my-test-id');
  expect(element).toBeInTheDocument();
  // rest of the test
});
