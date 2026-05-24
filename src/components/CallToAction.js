import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="call-to-action card">
      <h2>Welcome to Little Lemon</h2>
      <p>Fresh Mediterranean flavors — reserve a table or order online.</p>
      <div>
        <Link className="cta-btn" to="/booking">Reserve a table</Link>
        <Link className="cta-btn" to="/order" style={{marginLeft:'0.75rem'}}>Order Online</Link>
        <Link className="cta-btn" to="/customers" style={{marginLeft:'0.75rem'}}>Read Reviews</Link>
      </div>
    </section>
  );
}

export default CallToAction;
