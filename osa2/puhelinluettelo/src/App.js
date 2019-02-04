import React, { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import InputField from './components/InputField'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    personService      
      .getAll()      
      .then(initialNotes => {        
        setPersons(initialNotes)    
      })
  },[])

  const handleChange = (event, handle) => {
    handle(event.target.value) 
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber,
    }

    if(validatePerson(person)) {
      updatePerson(person)
    } else {
      personService      
        .create(person)      
        .then(person => {        
          setPersons(persons.concat(person))
          setNewName('')    
        })
    }
  }

  const updatePerson = (person) => {

    const personInDB = persons.filter(p => p.name === person.name)[0]

    if(window.confirm(`Päivitetäänkö ${person.name}?`)) {
      const updatedPerson = {...personInDB, number: person.number}

      personService.update(updatedPerson.id, updatedPerson)
      .then(() => {
        const updatedPersons = persons.map(p => p.id !== updatedPerson.id ? p : {...p, number: person.number})
        setPersons(updatedPersons)
      })
    }
  } 

  const removePerson = (person) => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(person.id)
      .then(() => {
        const filteredPersons = persons.filter(p => p.id !== person.id)
        setPersons(filteredPersons)
      })
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
      <PersonList personList={persons} query={query} removePerson={removePerson} />
    </div>
  )
}

export default App