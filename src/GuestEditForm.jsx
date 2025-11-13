import { useState } from "react";

export default function GuestEditForm({ guest, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
    job: guest.job,
    bio: guest.bio,
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
      <h2>Edit Guest</h2>

      <label>Name:</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Email:</label>
      <input name="email" value={form.email} onChange={handleChange} />

      <label>Phone:</label>
      <input name="phone" value={form.phone} onChange={handleChange} />

      <label>Job:</label>
      <input name="job" value={form.job} onChange={handleChange} />

      <label>Bio:</label>
      <textarea name="bio" value={form.bio} onChange={handleChange} />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
