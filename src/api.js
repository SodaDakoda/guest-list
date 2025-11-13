const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2509-Mackenzie";

async function handleResponse(response) {
  const json = await response.json();
  if (!json.success) throw new Error(json.error?.message || "API Error");
  return json.data;
}

export async function fetchGuests() {
  const res = await fetch(`${BASE_URL}/${COHORT}/guests`);
  return handleResponse(res);
}

export async function fetchGuestById(id) {
  const res = await fetch(`${BASE_URL}/${COHORT}/guests/${id}`);
  return handleResponse(res);
}

export async function updateGuest(id, updates) {
  const res = await fetch(`${BASE_URL}/${COHORT}/guests/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return handleResponse(res);
}

export async function createGuest(newGuest) {
  const res = await fetch(`${BASE_URL}/${COHORT}/guests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGuest),
  });

  const json = await res.json();
  if (!json.success)
    throw new Error(json.error?.message || "Failed to create guest");
  return json.data;
}
