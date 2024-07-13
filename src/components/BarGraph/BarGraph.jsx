import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Graph = ({ transactions }) => {
  
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  
  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5, right: 30, left: 50, bottom: 5,
          }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={100}
            tick={{ width: 100, wordWrap: 'break-word' }}
          />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
