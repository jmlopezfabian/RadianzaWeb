import React from 'react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  if (!stats || !stats.general) {
    return null;
  }

  const { general } = stats;

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-content">
          <h3>Total de Registros</h3>
          <p className="stat-value">{general.total_records?.toLocaleString() || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <h3>Municipios</h3>
          <p className="stat-value">{general.total_municipios || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <h3>Radianza Promedio</h3>
          <p className="stat-value">{general.radianza_promedio?.toFixed(2) || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <h3>Radianza Máxima</h3>
          <p className="stat-value">{general.radianza_maxima?.toFixed(2) || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <h3>Rango de Fechas</h3>
          <p className="stat-value-small">
            {general.fecha_min?.split(' ')[0] || ''} - {general.fecha_max?.split(' ')[0] || ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

