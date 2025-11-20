import React from 'react';
import './MunicipioSelector.css';

const MunicipioSelector = ({ municipios, selectedMunicipio, onSelectMunicipio }) => {
  return (
    <div className="municipio-selector">
      <label htmlFor="municipio-select">Seleccionar Municipio:</label>
      <select
        id="municipio-select"
        value={selectedMunicipio}
        onChange={(e) => onSelectMunicipio(e.target.value)}
        className="select-input"
      >
        {municipios.map((municipio) => (
          <option key={municipio} value={municipio}>
            {municipio}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MunicipioSelector;

