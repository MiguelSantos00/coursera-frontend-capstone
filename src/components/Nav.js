import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="site-nav" aria-label="Primary navigation">
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/chicago">About</Link></li>
                <li><Link to="/specials">Menu</Link></li>
                <li><Link to="/customers">Testimonials</Link></li>
                <li><Link to="/booking">Reservation</Link></li>
                <li><Link to="/order">Order Online</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;