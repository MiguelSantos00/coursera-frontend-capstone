import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import Chicago from './Chicago';

const defaultTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];

function getFetchAPI() {
    if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
        return window.fetchAPI;
    }

    return () => defaultTimes;
}

export function initializeTimes() {
    const today = new Date();
    return getFetchAPI()(today);
}

export function updateTimes(state, action) {
    return getFetchAPI()(new Date(action.date));
}

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
    const navigate = useNavigate();

    const submitForm = (formData) => {
        if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
            const isSubmitted = window.submitAPI(formData);

            if (isSubmitted) {
                dispatch({ type: 'date_changed', date: formData.date });
                navigate('/confirmed');
            }
        }
    };

    return (
        <main className="site-main">
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />}></Route>
                <Route path="/confirmed" element={<ConfirmedBooking/>}></Route>
                <Route path="/specials" element={<Specials/>}></Route>
                <Route path="/customers" element={<CustomersSay/>}></Route>
                <Route path="/chicago" element={<Chicago/>}></Route>
            </Routes>
        </main>
    );
}

export default Main;

