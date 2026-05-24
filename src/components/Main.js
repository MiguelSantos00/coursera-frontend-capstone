import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import BookingPage from './BookingPage';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import Chicago from './Chicago';

function Main() {
    return (
        <main className="site-main">
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/booking" element={<BookingPage/>}></Route>
                <Route path="/specials" element={<Specials/>}></Route>
                <Route path="/customers" element={<CustomersSay/>}></Route>
                <Route path="/chicago" element={<Chicago/>}></Route>
            </Routes>
        </main>
    );
}

export default Main;