import React from 'react'

function ScoreDonut({ label = 'Avg Score', score = 4.2, max = 5, size = 120, stroke = 10, color = '#2563eb' }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(Math.max(score / max, 0), 1)
  const dash = circumference * percent

  return (
    <div className='flex items-center gap-4'>
      <svg width={size} height={size} className='shrink-0'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='#e5e7eb'
          strokeWidth={stroke}
          fill='none'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill='none'
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap='round'
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          className='fill-gray-900'
          style={{ fontSize: 18, fontWeight: 700 }}
        >
          {score.toFixed(1)}
        </text>
        <text
          x='50%'
          y={size / 2 + 18}
          dominantBaseline='hanging'
          textAnchor='middle'
          className='fill-gray-500'
          style={{ fontSize: 11, fontWeight: 500 }}
        >
          / {max}
        </text>
      </svg>
      <div>
        <p className='text-sm font-medium text-gray-600'>{label}</p>
        <p className='text-2xl font-bold text-gray-900'>{Math.round(percent * 100)}%</p>
        <p className='text-sm text-gray-500'>Average candidate performance</p>
      </div>
    </div>
  )
}

export default ScoreDonut


