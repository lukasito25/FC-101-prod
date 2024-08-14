import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onExport }) => {
  const [sessionType, setSessionType] = useState('');
  const [microcycle, setMicrocycle] = useState('');
  const [objective, setObjective] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      sessionType,
      microcycle,
      objective,
      startDate,
      endDate
    });
  };

  return (
    <div style={styles.filterBar}>
      <div style={styles.filterItem}>
        <label style={styles.label}>Session Type:</label>
        <select
          value={sessionType}
          onChange={(e) => {
            setSessionType(e.target.value);
            handleFilterChange();
          }}
          style={styles.select}
        >
          <option value="">All Types</option>
          <option value="Training">Training</option>
          <option value="Match">Match</option>
          <option value="Recovery">Recovery</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={styles.filterItem}>
        <label style={styles.label}>Microcycle:</label>
        <select
          value={microcycle}
          onChange={(e) => {
            setMicrocycle(e.target.value);
            handleFilterChange();
          }}
          style={styles.select}
        >
          <option value="">All Microcycles</option>
          <option value="1">Microcycle 1</option>
          <option value="2">Microcycle 2</option>
          <option value="3">Microcycle 3</option>
          <option value="4">Microcycle 4</option>
          <option value="5">Microcycle 5</option>
        </select>
      </div>

      <div style={styles.filterItem}>
        <label style={styles.label}>Objective:</label>
        <input
          type="text"
          value={objective}
          onChange={(e) => {
            setObjective(e.target.value);
            handleFilterChange();
          }}
          placeholder="Enter objective"
          style={styles.input}
        />
      </div>

      <div style={styles.filterItem}>
        <label style={styles.label}>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            handleFilterChange();
          }}
          style={styles.input}
        />
      </div>

      <div style={styles.filterItem}>
        <label style={styles.label}>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            handleFilterChange();
          }}
          style={styles.input}
        />
      </div>

      <button onClick={onExport} style={styles.exportButton}>Export</button>
    </div>
  );
};

const styles = {
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 10px',
    minWidth: '150px',
    flex: '1 1 150px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border 0.3s ease',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border 0.3s ease',
  },
  exportButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#000',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    width: '100%',
  },
  '@media (max-width: 768px)': {
    filterBar: {
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '10px',
    },
    filterItem: {
      margin: '10px 0',
    },
    exportButton: {
      width: '100%',
    },
  },
};

export default FilterBar;








