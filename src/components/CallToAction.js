import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="call-to-action card" aria-labelledby="hero-title">
      <h2 id="hero-title">Welcome to Little Lemon</h2>
      <p>Fresh Mediterranean flavors — reserve a table or order online.</p>
      <ul className="cta-list">
        <li>
          <Link className="cta-btn" to="/booking">Reserve a table</Link>
        </li>
        <li>
          <Link className="cta-btn" to="/order" aria-label="On Click">Order Online</Link>
        </li>
        <li>
          <Link className="cta-btn" to="/customers">Read Reviews</Link>
        </li>
      </ul>
    </section>
  );
}

export default CallToAction;
