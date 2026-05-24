import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

test('renders the BookingForm static text', () => {
  render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} />);

  const labelElement = screen.getByText('Choose date');

  expect(labelElement).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit reservation/i })).toBeDisabled();
});

test('applies HTML5 validation attributes to the booking form fields', () => {
  render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} />);

  expect(screen.getByLabelText('Choose date')).toHaveAttribute('required');
  expect(screen.getByLabelText('Choose date')).toHaveAttribute('min');
  expect(screen.getByLabelText('Choose time')).toHaveAttribute('required');
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('required');
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('min', '1');
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('max', '10');
  expect(screen.getByLabelText('Occasion')).toHaveAttribute('required');
});

test('keeps the submit button disabled when the form is invalid', async () => {
  const { container } = render(
    <BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} submitForm={jest.fn()} />
  );

  expect(screen.getByRole('button', { name: /submit reservation/i })).toBeDisabled();

  fireEvent.submit(container.querySelector('form'));

  expect(screen.getByText('Please choose a reservation date.')).toBeInTheDocument();
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

  fireEvent.change(screen.getByLabelText('Choose date'), {
    target: { value: '2026-05-24' },
  });

  expect(screen.getByRole('button', { name: /submit reservation/i })).toBeEnabled();

  await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

  expect(submitForm).toHaveBeenCalledWith({
    date: '2026-05-24',
    time: '17:00',
    guests: 1,
    occasion: 'Birthday',
  });
});

test('shows an error message when the date is missing', () => {
  const { container } = render(
    <BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} submitForm={jest.fn()} />
  );

  fireEvent.submit(container.querySelector('form'));

  expect(screen.getByText('Please choose a reservation date.')).toBeInTheDocument();
});

test('enables the submit button when the form is valid', async () => {
  render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} submitForm={jest.fn()} />);

  fireEvent.change(screen.getByLabelText('Choose date'), {
    target: { value: '2026-05-24' },
  });

  expect(screen.getByRole('button', { name: /submit reservation/i })).toBeEnabled();
});