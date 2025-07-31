import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function JobList({ onEdit }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const [reminderJobId, setReminderJobId] = useState(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this job?')) {
      try {
        await API.delete(`/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const result = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, jobs]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search jobs..."
        className="w-full border p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map((job) => (
        <div key={job._id} className="border p-3 rounded shadow-sm">
          <div className="font-bold">{job.title} at {job.company}</div>
          <div>Status: {job.status}</div>
          <div className="text-sm">{job.notes}</div>

          <div className="space-x-2 mt-2">
            <button onClick={() => onEdit(job)} className="px-3 py-1 bg-yellow-400 text-black">Edit</button>
            <button onClick={() => handleDelete(job._id)} className="px-3 py-1 bg-red-500 text-white">Delete</button>
            <button onClick={() => setReminderJobId(job._id)} className="px-3 py-1 bg-blue-500 text-white">Send Reminder</button>
          </div>

          {reminderJobId === job._id && (
            <form
              className="mt-3 space-y-2"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await API.post('/reminders', {
                    jobTitle: job.title,
                    date: reminderDate,
                    note: reminderNote,
                  });
                  alert('Reminder sent!');
                  setReminderJobId(null);
                  setReminderDate('');
                  setReminderNote('');
                } catch (err) {
                  console.error('Failed to send reminder:', err);
                  alert('Failed to send reminder');
                }
              }}
            >
              <input
                type="date"
                className="border p-1 w-full"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Reminder note"
                className="border p-1 w-full"
                value={reminderNote}
                onChange={(e) => setReminderNote(e.target.value)}
                required
              />
              <div className="space-x-2">
                <button type="submit" className="px-3 py-1 bg-green-600 text-white">Send</button>
                <button type="button" onClick={() => setReminderJobId(null)} className="px-3 py-1 bg-gray-400 text-white">Cancel</button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobList;
