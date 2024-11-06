import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  {
    date: 'Sep 28',
    Active: 10,
    Inactive: 5,
  },
  {
    date: 'Sep 29',
    Active: 7,
    Inactive: 8,
  },
  {
    date: 'Sep 30',
    Active: 13,
    Inactive: 9,
  },
  {
    date: 'Oct 01',
    Active: 11,
    Inactive: 6,
  },
  {
    date: 'Oct 02',
    Active: 7,
    Inactive: 15,
  },
  {
    date: 'Oct 02',
    Active: 4,
    Inactive: 2,
  },
];

const BarCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Active" fill="#007bc0" />
        <Bar dataKey="Inactive" fill="#00884a" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarCharts