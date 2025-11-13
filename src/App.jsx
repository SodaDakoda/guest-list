import { useEffect, useState } from "react";
import { fetchGuests, fetchGuestById, updateGuest, createGuest } from "./api";

import GuestList from "./GuestList";
import GuestDetails from "./GuestDetails";
import GuestEditForm from "./GuestEditForm";
import NewGuestForm from "./NewGuestForm";

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
    setIsEditing(false);
    setIsCreating(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleSave(updatedFields) {
    try {
      const updated = await updateGuest(selectedId, updatedFields);

      setSelectedGuest(updated);

      setGuests(guests.map((g) => (g.id === updated.id ? updated : g)));

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCreate(newGuestData) {
    try {
      const created = await createGuest(newGuestData);

      setGuests([...guests, created]);

      setSelectedId(created.id);

      setIsCreating(false);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app">
      <h1>Fullstack Convention Center</h1>

      {error && <p className="error">Error: {error}</p>}

      {selectedId === null && !isCreating && (
        <>
          {loadingList && <p>Loading guests...</p>}

          {!loadingList && (
            <>
              <GuestList guests={guests} onSelect={setSelectedId} />

              <button onClick={() => setIsCreating(true)}>
                Invite New Guest
              </button>
            </>
          )}
        </>
      )}

      {isCreating && (
        <NewGuestForm
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {selectedId !== null && !isEditing && !isCreating && (
        <>
          {loadingDetails && <p>Loading guest details...</p>}
          {!loadingDetails && selectedGuest && (
            <GuestDetails
              guest={selectedGuest}
              onBack={handleBack}
              onEdit={handleEdit}
            />
          )}
        </>
      )}

      {selectedId !== null && isEditing && (
        <GuestEditForm
          guest={selectedGuest}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </main>
  );
}
