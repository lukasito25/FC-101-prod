import React from 'react';

const Step1 = ({ date, sessionType, microcycle, objective1, objective2, setDate, setSessionType, setMicrocycle, setObjective1, setObjective2, handleNext }) => {
  return (
    <div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Session Type:</label>
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          style={styles.select}
          required
        >
          <option value="">Select Type</option>
          <option value="Training">Training</option>
          <option value="Match">Match</option>
          <option value="Recovery">Recovery</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Microcycle (Number):</label>
        <input
          type="number"
          value={microcycle}
          onChange={(e) => setMicrocycle(e.target.value)}
          style={styles.input}
          required
          min="1"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Objective 1:</label>
        <input
          type="text"
          value={objective1}
          onChange={(e) => setObjective1(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Objective 2:</label>
        <input
          type="text"
          value={objective2}
          onChange={(e) => setObjective2(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroupRight}>
        <button type="button" onClick={handleNext} style={styles.button}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', 
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border 0.3s ease',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#000',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonGroupRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
};

export default Step1;
