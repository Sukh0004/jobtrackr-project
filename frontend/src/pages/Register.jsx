import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      alert('Register failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Username" className="w-full border p-2" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-2" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
}

export default Register;