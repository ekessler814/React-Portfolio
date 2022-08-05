import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './components/Weather';

test('renders learn react link', () => {
  render(<Weather />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
