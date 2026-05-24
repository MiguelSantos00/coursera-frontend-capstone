import { render, screen } from '@testing-library/react';
import ConfirmedBooking from './ConfirmedBooking';

test('renders the confirmed booking message', () => {
  render(<ConfirmedBooking />);

  expect(screen.getByText('Booking Confirmed')).toBeInTheDocument();
});