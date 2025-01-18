import React from 'react';

interface StatDisplayProps {
  value: string;
  label: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-lg font-semibold">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default StatDisplay;
