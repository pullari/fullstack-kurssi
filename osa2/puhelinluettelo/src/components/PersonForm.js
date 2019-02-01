import React from 'react'

const PersonForm = ({ person: { name, number }, handleSubmit, handleNameChange, handleNumberChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      nimi: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      numero: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

export default PersonForm