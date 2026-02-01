import React from 'react';
import styles from './Charts.module.css';

export const LineChart = ({ 
  data = [], 
  height = 200, 
  color = '#00d4ff',
  showGrid = true,
  showLabels = true,
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const padding = 40;
  const chartWidth = 100;
  const chartHeight = height - padding * 2;
  
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((d.value - minValue) / range) * 100,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className={styles.chartContainer} style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.chart}>
        {showGrid && (
          <g className={styles.grid}>
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} />
            ))}
          </g>
        )}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#gradient-${color})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} className={styles.dot} />
        ))}
      </svg>
      {showLabels && (
        <div className={styles.labels}>
          {data.map((d, i) => (
            <span key={i} className={styles.label}>{d.label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export const BarChart = ({ 
  data = [], 
  height = 200, 
  colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'],
  showLabels = true,
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={styles.barChartContainer} style={{ height }}>
      <div className={styles.bars}>
        {data.map((d, i) => (
          <div key={i} className={styles.barWrapper}>
            <div 
              className={styles.bar}
              style={{ 
                height: `${(d.value / maxValue) * 100}%`,
                background: `linear-gradient(180deg, ${colors[i % colors.length]}, ${colors[i % colors.length]}80)`,
              }}
            >
              <span className={styles.barValue}>{d.value}</span>
            </div>
            {showLabels && <span className={styles.barLabel}>{d.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DonutChart = ({ 
  data = [], 
  size = 200,
  thickness = 30,
  colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ff6b6b'],
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;

  return (
    <div className={styles.donutContainer}>
      <svg width={size} height={size} className={styles.donut}>
        {data.map((d, i) => {
          const percentage = d.value / total;
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += percentage * circumference;
          
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className={styles.donutSegment}
            />
          );
        })}
      </svg>
      <div className={styles.donutCenter}>
        <span className={styles.donutTotal}>{total}</span>
        <span className={styles.donutLabel}>Total</span>
      </div>
      <div className={styles.donutLegend}>
        {data.map((d, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendColor} style={{ background: colors[i % colors.length] }} />
            <span className={styles.legendText}>{d.label}</span>
            <span className={styles.legendValue}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'increase',
  icon,
  color = '#00d4ff',
  sparklineData = [],
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        {icon && (
          <div className={styles.statIcon} style={{ background: `${color}20`, color }}>
            {icon}
          </div>
        )}
        <span className={styles.statTitle}>{title}</span>
      </div>
      <div className={styles.statBody}>
        <span className={styles.statValue}>{value}</span>
        {change && (
          <span className={`${styles.statChange} ${styles[changeType]}`}>
            {changeType === 'increase' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      {sparklineData.length > 0 && (
        <div className={styles.sparkline}>
          <LineChart data={sparklineData} height={60} color={color} showGrid={false} showLabels={false} />
        </div>
      )}
    </div>
  );
};

export default { LineChart, BarChart, DonutChart, StatCard };
