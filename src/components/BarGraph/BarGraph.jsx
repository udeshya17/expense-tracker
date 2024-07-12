import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
//   {
//     name: 'Food',
//     uv: 2000,
//     pv: 400,
//     amt: 1400,
//   },
//   {
//     name: 'Entertainment',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Travel',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   }
];

const Graph = () => {
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
          <Bar dataKey="uv" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
