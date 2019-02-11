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
  const [ action, setAction ] = useState(null)

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
          showNoti(`Lisättiin ${person.name} listaan`, 'success')
          setNewName('')    
        })
        .catch(error => {
          console.log("ERROR: ", error.response.data)
          showNoti(`Henkilön ${person.name} lisäys epäonnistui. ${error.response.data.error}`, 'error')
        })
    }
  }

  const showNoti = (message, status) => {
    setAction({ message: message, status: status })
    setTimeout(() => {
      setAction(null)
    }, 5000)
  }

  const updatePerson = (person) => {

    const personInDB = persons.filter(p => p.name === person.name)[0]

    if(window.confirm(`Päivitetäänkö ${person.name}?`)) {
      const updatedPerson = {...personInDB, number: person.number}

      personService.update(updatedPerson.id, updatedPerson)
      .then(() => {
        const updatedPersons = persons.map(p => p.id !== updatedPerson.id ? p : {...p, number: person.number})
        setPersons(updatedPersons)
        showNoti(`Päivitettiin ${personInDB.name}`, 'success')
      })
      .catch(error => {
        showNoti(`Henkilön ${person.name} tietojen päivitys epäonnistui. Henkilö saattaa olla poistettu.`, 'error')
      })
    }
  } 

  const removePerson = (person) => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(person.id)
      .then(() => {
        const filteredPersons = persons.filter(p => p.id !== person.id)
        showNoti(`Poistettiin ${person.name} onnistuneesti`, 'success')
        setPersons(filteredPersons)
      })
      .catch(error => {
        showNoti(`Henkilön ${person.name} poisto epäonnistui. Henkilö saattaa olla jo poistettu.`, 'error')
      })
    }
  }

  const validatePerson = (person) =>  persons.map(p => p.name).includes(person.name)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification action={action} />
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

const Notification = ({ action }) => {
  if (action === null) {
    return null
  }

  const { message, status } = action;

  if(status !== 'error') return (
    <div className="success">
      {message}
    </div>
  )

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App