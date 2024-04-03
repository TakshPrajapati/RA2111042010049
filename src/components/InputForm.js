// InputForm.js
import React, { useState } from 'react';

const InputForm = ({ onSubmit, loading }) => {
  const [qualifiedId, setQualifiedId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(qualifiedId); // Call the onSubmit function passed from props
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Qualified ID:
        <input
          type="text"
          value={qualifiedId}
          onChange={(e) => setQualifiedId(e.target.value)}
          disabled={loading}
        />
      </label>
      <button type="submit" disabled={!qualifiedId || loading}>
        Fetch Data
      </button>
    </form>
  );
};

export default InputForm;
