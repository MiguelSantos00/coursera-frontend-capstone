import { render, screen } from '@testing-library/react';
import BookingPage from './BookingPage';

test('renders the BookingPage static text', () => {
  render(<BookingPage availableTimes={['17:00']} dispatch={jest.fn()} />);

  expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
});