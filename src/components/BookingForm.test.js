import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

test('renders the BookingForm static text', () => {
  render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} />);

  const labelElement = screen.getByText('Choose date');

  expect(labelElement).toBeInTheDocument();
});

test('submits the BookingForm when the user clicks submit', async () => {
  const submitForm = jest.fn();

  render(
    <BookingForm
      availableTimes={['17:00', '18:00']}
      dispatch={jest.fn()}
      submitForm={submitForm}
    />
  );

  await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

  expect(submitForm).toHaveBeenCalledWith({
    date: '',
    time: '17:00',
    guests: 1,
    occasion: 'Birthday',
  });
});