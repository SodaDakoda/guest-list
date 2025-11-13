import { useState } from "react";

export default function NewGuestForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    bio: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form className="guest-edit" onSubmit={handleSubmit}>
      <h2>Invite a New Guest</h2>

      <label>Name:</label>
      <input name="name" required value={form.name} onChange={handleChange} />

      <label>Email:</label>
      <input name="email" required value={form.email} onChange={handleChange} />

      <label>Phone:</label>
      <input name="phone" required value={form.phone} onChange={handleChange} />

      <label>Job:</label>
      <input name="job" required value={form.job} onChange={handleChange} />

      <label>Bio:</label>
      <textarea name="bio" required value={form.bio} onChange={handleChange} />

      <button type="submit">Add Guest</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
