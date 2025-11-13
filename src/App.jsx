import { useEffect, useState } from "react";
import { fetchGuests, fetchGuestById } from "./api";

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGuests() {
      try {
        setError(null);
        setLoadingList(true);

        const data = await fetchGuests();
        setGuests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    }

    loadGuests();
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setSelectedGuest(null);
      return;
    }

    async function loadGuestDetails() {
      try {
        setError(null);
        setLoadingDetails(true);

        const data = await fetchGuestById(selectedId);
        setSelectedGuest(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingDetails(false);
      }
    }

    loadGuestDetails();
  }, [selectedId]);

  function handleBack() {
    setSelectedId(null);
  }

  return (
    <main className="app">
      <h1>Fullstack Convention Center</h1>

      {error && <p className="error">Error: {error}</p>}

      {selectedId === null && (
        <>
          {loadingList && <p>Loading guests...</p>}
          {!loadingList && (
            <GuestList guests={guests} onSelect={setSelectedId} />
          )}
        </>
      )}

      {selectedId !== null && (
        <>
          {loadingDetails && <p>Loading guest details...</p>}
          {!loadingDetails && selectedGuest && (
            <GuestDetails guest={selectedGuest} onBack={handleBack} />
          )}
        </>
      )}
    </main>
  );
}

function GuestList({ guests, onSelect }) {
  return (
    <section>
      <h2>Guests</h2>
      <ul className="guest-list">
        {guests.map((guest) => (
          <li
            key={guest.id}
            className="guest-list-item"
            onClick={() => onSelect(guest.id)}
          >
            <strong>{guest.name}</strong>
            <div className="guest-email">{guest.email}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GuestDetails({ guest, onBack }) {
  return (
    <section className="guest-details">
      <h2>{guest.name}</h2>
      <p>
        <strong>Email:</strong> {guest.email}
      </p>
      <p>
        <strong>Phone:</strong> {guest.phone}
      </p>
      <p>
        <strong>Job:</strong> {guest.job}
      </p>
      <p>
        <strong>Bio:</strong> {guest.bio}
      </p>

      <button onClick={onBack}>Back</button>
    </section>
  );
}
