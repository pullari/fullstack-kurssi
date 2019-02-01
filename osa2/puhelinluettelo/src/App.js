import React, { useState } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import InputField from './components/InputField'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  const handleChange = (event, handle) => {
    console.log(event.target.value);
    handle(event.target.value) 
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if(validatePerson(person)) {
      alert(`${person.name} on jo luettelossa`);
    } else {
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const validatePerson = (person) =>  persons.map(p => p.name).includes(person.name)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <InputField text='rajaa näytettäviä' valuePointer={query} onChangeFunc={(e) => handleChange(e, setQuery)} />
      <h3>Lisää uusi</h3>
      <PersonForm 
        person={{name: newName, number: newNumber}} 
        handleSubmit={addPerson} 
        handleNameChange={(e) => handleChange(e, setNewName)}
        handleNumberChange={(e) => handleChange(e, setNewNumber)}
      />
      <h2>Numerot</h2>
      <PersonList personList={persons} query={query} />
    </div>
  )
}

export default App