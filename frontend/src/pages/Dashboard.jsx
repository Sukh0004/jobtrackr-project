import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList';
import StatusChart from '../components/StatusChart';
import API from '../utils/api';

function Dashboard() {
  const navigate = useNavigate();

  const handleEdit = (job) => {
    navigate('/edit', { state: job });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Job Applications</h2>
        <button onClick={() => navigate('/add')} className="bg-green-500 text-white px-4 py-2">+ Add Job</button>
      </div>
      <StatusChart />
      <JobList onEdit={handleEdit} />
    </div>
  );
}



export default Dashboard;