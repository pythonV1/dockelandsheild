import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Normal', 'Repair', 'Disable', 'Arrears'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 3, 6, 5],
      backgroundColor: [
        '#007bc0',
        '#ed0007',
        '#ffcf00',
        '#00884a',
      ],
      borderColor: [
        '#007bc0',
        '#ed0007',
        '#ffcf00',
        '#00884a',
      ],
      borderWidth: 1,
    },
  ],
};
const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  height: 400,
  plugins: {
    legend: {
      position: 'bottom', // Move the legend labels to the bottom
    },
  },
};
const containerStyle = {
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const VehicleOperation = () => {
  return (
    <div style={containerStyle}>
      <Pie data={data} options={chartOptions} />
    </div>
  )
}

export default VehicleOperation