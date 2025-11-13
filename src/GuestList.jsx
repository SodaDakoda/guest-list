export default function GuestList({ guests, onSelect }) {
  return (
    <section>
      <h2>Guests</h2>
      <ul className="guest-list">
        {guests.map((guest) => (
          <li key={guest.id} className="guest-list-row">
            <div className="guest-list-item" onClick={() => onSelect(guest.id)}>
              <strong>{guest.name}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
