import React from 'react';

const StatCard = ({ icon: Icon, value, label }) => {
  return (
    <div className="glass-card">
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
