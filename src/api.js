const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";

const COHORT = "2509-Mackenzie";

async function handleResponse(response) {
  const json = await response.json();

  if (!json.success) {
    const message = json.error?.message || "Unknown API error";
    throw new Error(message);
  }

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
