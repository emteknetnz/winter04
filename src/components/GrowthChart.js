import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// Chart.js registration (for React 18+)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GrowthChart({ projectionData }) {
  // projectionData: [{ year, value }, ...]
  const data = {
    labels: projectionData.map((d) => d.year),
    datasets: [
      {
        label: 'Retirement Savings Growth',
        data: projectionData.map((d) => d.value),
        fill: false,
        borderColor: '#4bc0c0',
        backgroundColor: '#222',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: 'Projected Retirement Savings Over Time',
        color: '#fff',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: '#444' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: '#444' },
      },
    },
  };

  return (
    <div role="region" aria-label="Retirement Savings Growth Chart">
      <Line
        data={data}
        options={options}
        aria-label="Retirement Savings Growth Chart"
      />
    </div>
  );
}

GrowthChart.propTypes = {
  projectionData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GrowthChart;
