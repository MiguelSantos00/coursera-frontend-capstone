import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  window.fetchAPI = jest.fn((date) => {
    if (date instanceof Date && date.toISOString().startsWith('2026-05-24')) {
      return ['17:00', '18:00'];
    }

    return ['17:00', '18:00', '19:00', '20:00', '21:00'];
  });
  window.submitAPI = jest.fn(() => true);
});

test('renders the booking page route', () => {
  render(
    <MemoryRouter initialEntries={['/booking']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
});

test('calls the API and refreshes available times when a table is reserved', async () => {
  render(
    <MemoryRouter initialEntries={['/booking']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Choose date'), {
    target: { value: '2026-05-24' },
  });

  const timeSelect = screen.getByLabelText('Choose time');
  expect(within(timeSelect).getAllByRole('option')).toHaveLength(2);

  await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

  expect(window.submitAPI).toHaveBeenCalledWith({
    date: '2026-05-24',
    time: '17:00',
    guests: 1,
    occasion: 'Birthday',
  });
  expect(window.fetchAPI).toHaveBeenCalledWith(new Date('2026-05-24'));
  expect(screen.getByText('Booking Confirmed')).toBeInTheDocument();
});
