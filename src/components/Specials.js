const specialsData = [
  { id: 1, title: 'Pasta Primavera', price: '$14.99', desc: 'Seasonal vegetables, fresh herbs' },
  { id: 2, title: 'Grilled Salmon', price: '$19.50', desc: 'Lemon-herb butter, greens' },
  { id: 3, title: 'Margherita Pizza', price: '$12.00', desc: 'Fresh mozzarella, basil' },
];

function Specials() {
  return (
    <section className="specials">
      <h3>Weekly Specials</h3>
      <div className="specials-grid">
        {specialsData.map(item => (
          <article key={item.id} className="card">
            <h4>{item.title} <small style={{float:'right'}}>{item.price}</small></h4>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;
