import React from 'react';

const Step3 = ({ volume, intensity, complexity, setVolume, setIntensity, setComplexity, handlePrev, handleSubmit, exerciseData }) => {
  return (
    <div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Volume (Minutes):</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={styles.input}
          required
          min="1"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Intensity (%):</label>
        <input
          type="number"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          style={styles.input}
          required
          min="0"
          max="100"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Complexity (Optional):</label>
        <select
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Complexity</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      {/* Added Exercises Table */}
      <h3 style={styles.addedExercisesTitle}>Summary of Added Exercises</h3>
      <div style={styles.exerciseTable}>
        <div style={styles.exerciseTableHeader}>
          <div style={styles.attribute}>ID</div>
          <div style={styles.attribute}>Goal</div>
          <div style={styles.attribute}>Duration</div>
        </div>
        {exerciseData.map((exercise) => (
          <div key={exercise.id} style={styles.exerciseTableRow}>
            <div style={styles.data}>{exercise.id}</div>
            <div style={styles.data}>{exercise.goal}</div>
            <div style={styles.data}>{exercise.duration} min</div>
          </div>
        ))}
      </div>

      <div style={styles.buttonGroup}>
        <button type="button" onClick={handlePrev} style={styles.button}>
          Previous
        </button>
        <button type="submit" style={styles.button}>
          Submit
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
    marginBottom: '16px',
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
  addedExercisesTitle: {
    marginTop: '32px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  exerciseTable: {
    marginTop: '16px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  exerciseTableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#e9e9e9',
    fontWeight: '600',
  },
  exerciseTableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: '1px solid #ddd',
  },
  attribute: {
    flex: 1,
    fontWeight: '500',
    fontSize: '14px',
    color: '#333',
  },
  data: {
    flex: 1,
    fontSize: '14px',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
  },
};

export default Step3;

