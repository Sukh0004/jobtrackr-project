import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

function Reminder() {
  const [jobTitle, setJobTitle] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reminders', {
        jobTitle,
        date,
        note
      });
      alert('Reminder email sent!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to send reminder');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Reminder Email</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <textarea
        placeholder="Reminder Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />

      <button type="submit">Send Reminder</button>
    </form>
  );
}

export default Reminder;
