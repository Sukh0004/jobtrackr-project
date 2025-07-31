import React from 'react';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../utils/api';

function JobForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.pathname.includes('edit');
  const initial = location.state || {};

  const [title, setTitle] = useState(initial.title || '');
  const [company, setCompany] = useState(initial.company || '');
  const [status, setStatus] = useState(initial.status || 'Applied');
  const [notes, setNotes] = useState(initial.notes || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/jobs/${initial._id}`, { title, company, status, notes });
      } else {
        await API.post('/jobs', { title, company, status, notes });
      }
      navigate('/');
    } catch (err) {
      alert('Error saving job');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Add'} Job Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Job Title" className="w-full border p-2" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Company" className="w-full border p-2" value={company} onChange={e => setCompany(e.target.value)} required />
        <select className="w-full border p-2" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offered</option>
        </select>
        <textarea placeholder="Notes" className="w-full border p-2" value={notes} onChange={e => setNotes(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2">{editing ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default JobForm;