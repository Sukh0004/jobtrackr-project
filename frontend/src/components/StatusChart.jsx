import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import API from '../utils/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart() {
  const [data, setData] = useState(null);

  const fetchChartData = async () => {
    try {
      const res = await API.get('/jobs'); // Authorization header added via interceptor
      const jobs = res.data;

      const statusCounts = {
        Applied: 0,
        Interviewing: 0,
        Offered: 0,
        Rejected: 0,
      };

      jobs.forEach(job => {
        if (statusCounts[job.status] !== undefined) {
          statusCounts[job.status]++;
        }
      });

      setData({
        labels: Object.keys(statusCounts),
        datasets: [{
          label: 'Job Status',
          data: Object.values(statusCounts),
          backgroundColor: ['#60a5fa', '#facc15', '#34d399', '#f87171'],
        }]
      });
    } catch (err) {
      console.error('StatusChart error:', err);
      setData(null); // fallback
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  if (!data) return <p className="text-sm text-gray-500">No chart data available.</p>;

  return (
    <div className="max-w-sm mx-auto mb-8">
      <h3 className="text-lg font-semibold mb-2 text-center">Job Status Overview</h3>
      <Pie data={data} />
    </div>
  );
}

export default StatusChart;
