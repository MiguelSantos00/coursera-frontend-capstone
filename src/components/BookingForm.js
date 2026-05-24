import { useRef, useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const formRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] ?? '17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, fieldValue) => {
    if (fieldName === 'date') {
      if (!fieldValue) {
        return 'Please choose a reservation date.';
      }

      if (fieldValue < today) {
        return 'Please choose today or a future date.';
      }
    }

    if (fieldName === 'time' && !fieldValue) {
      return 'Please choose a reservation time.';
    }

    if (fieldName === 'guests') {
      if (!fieldValue) {
        return 'Please enter the number of guests.';
      }

      if (fieldValue < 1) {
        return 'Please reserve for at least 1 guest.';
      }

      if (fieldValue > 10) {
        return 'Please reserve for no more than 10 guests.';
      }
    }

    if (fieldName === 'occasion' && !fieldValue) {
      return 'Please choose an occasion.';
    }

    return '';
  };

  const updateValidity = () => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
    }
  };

  const updateFieldError = (fieldName, fieldValue) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateField(fieldName, fieldValue),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { date, time, guests, occasion };

    const nextErrors = {
      date: validateField('date', date),
      time: validateField('time', time),
      guests: validateField('guests', guests),
      occasion: validateField('occasion', occasion),
    };

    setErrors(nextErrors);

    if (formRef.current && formRef.current.checkValidity() && submitForm) {
      submitForm(formData);
    }
  };

  return (
    <form ref={formRef} className="booking-form card" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        required
        min={today}
        value={date}
        onChange={(event) => {
          const selectedDate = event.target.value;
          setDate(selectedDate);
          dispatch({ type: 'date_changed', date: selectedDate });
          updateFieldError('date', selectedDate);
          updateValidity();
        }}
        onBlur={(event) => updateFieldError('date', event.target.value)}
      />
      {errors.date ? <span className="field-error" role="alert">{errors.date}</span> : null}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        required
        value={time}
        onChange={(event) => {
          setTime(event.target.value);
          updateFieldError('time', event.target.value);
          updateValidity();
        }}
        onBlur={(event) => updateFieldError('time', event.target.value)}
      >
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>
      {errors.time ? <span className="field-error" role="alert">{errors.time}</span> : null}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        required
        value={guests}
        onChange={(event) => {
          const guestCount = event.target.value === '' ? '' : Number(event.target.value);
          setGuests(guestCount);
          updateFieldError('guests', guestCount);
          updateValidity();
        }}
        onBlur={(event) => updateFieldError('guests', event.target.value === '' ? '' : Number(event.target.value))}
      />
      {errors.guests ? <span className="field-error" role="alert">{errors.guests}</span> : null}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        required
        value={occasion}
        onChange={(event) => {
          setOccasion(event.target.value);
          updateFieldError('occasion', event.target.value);
          updateValidity();
        }}
        onBlur={(event) => updateFieldError('occasion', event.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {errors.occasion ? <span className="field-error" role="alert">{errors.occasion}</span> : null}

      <button className="cta-btn" type="submit" disabled={!isFormValid}>
        Submit reservation
      </button>
    </form>
  );
}

export default BookingForm;