import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from './PieChart.module.css';

const data = [
  { name: 'Food', value: 0 },
  { name: 'Entertainment', value: 0 },
  { name: 'Travel', value: 0 },
];


  const COLORS = [ '#FF9304' , '#A000FF', '#FDE006'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function Chart(){
    return (
        <div className={styles.pieChart}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={95}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className={styles.legend}>
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className={styles.legendText}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
    )
  }

  export default Chart;