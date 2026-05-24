import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="booking-page">
      <div className="booking card">
        <h2>Reserve a Table</h2>
        <p>Complete the form below to book your table at Little Lemon.</p>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
      </div>
    </section>
  );
}

export default BookingPage;
