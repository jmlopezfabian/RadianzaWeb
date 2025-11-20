import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const DistribucionRadianza = ({ data, selectedMetrica = 'Media_de_radianza' }) => {
  // Obtener el nombre de la métrica para mostrar
  const getMetricaLabel = (key) => {
    const labels = {
      'Media_de_radianza': 'Media de Radianza',
      'Maximo_de_radianza': 'Máximo de Radianza',
      'Minimo_de_radianza': 'Mínimo de Radianza',
      'Suma_de_radianza': 'Suma de Radianza',
      'Desviacion_estandar_de_radianza': 'Desviación Estándar',
      'Percentil_25_de_radianza': 'Percentil 25',
      'Percentil_50_de_radianza': 'Percentil 50 (Mediana)',
      'Percentil_75_de_radianza': 'Percentil 75',
      'Cantidad_de_pixeles': 'Cantidad de Píxeles'
    };
    return labels[key] || key;
  };

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Obtener valores para determinar rangos dinámicamente
    const valores = data.map(item => parseFloat(item[selectedMetrica]) || 0).filter(v => v > 0);
    if (valores.length === 0) return [];

    const min = Math.min(...valores);
    const max = Math.max(...valores);
    const rango = max - min;
    const tercil1 = min + rango / 3;
    const tercil2 = min + (rango * 2) / 3;

    // Categorizar por rangos dinámicos
    const ranges = {
      [`Baja (${min.toFixed(0)}-${tercil1.toFixed(0)})`]: 0,
      [`Media (${tercil1.toFixed(0)}-${tercil2.toFixed(0)})`]: 0,
      [`Alta (${tercil2.toFixed(0)}-${max.toFixed(0)})`]: 0
    };

    data.forEach(item => {
      const valor = parseFloat(item[selectedMetrica]) || 0;
      if (valor <= tercil1) {
        ranges[Object.keys(ranges)[0]]++;
      } else if (valor <= tercil2) {
        ranges[Object.keys(ranges)[1]]++;
      } else {
        ranges[Object.keys(ranges)[2]]++;
      }
    });

    return Object.entries(ranges)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value
      }));
  }, [data, selectedMetrica]);

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  if (chartData.length === 0) {
    return <div className="no-data">No hay datos disponibles</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#667eea"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#2a2a3e',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '8px',
            color: '#e0e0e0'
          }}
          labelStyle={{ color: '#e0e0e0' }}
        />
        <Legend 
          wrapperStyle={{ color: '#e0e0e0' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DistribucionRadianza;

