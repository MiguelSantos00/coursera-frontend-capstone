function CustomersSay() {
  const customers = [
    { id: 1, name: 'Alex', quote: 'Amazing food and service!', stars: 5 },
    { id: 2, name: 'Maria', quote: 'A cozy spot with bold flavors.', stars: 4 },
  ];

  return (
    <section className="customers">
      <h3>What Our Customers Say</h3>
      <div className="customers-grid">
        {customers.map(c => (
          <figure key={c.id} className="card">
            <img src="%PUBLIC_URL%/logo192.png" alt={c.name} />
            <figcaption>
              <strong>{c.name}</strong>
              <div className="stars">{'★'.repeat(c.stars)}</div>
              <p>{c.quote}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default CustomersSay;
