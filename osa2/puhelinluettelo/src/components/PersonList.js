import React from 'react'

const PersonList = ({ personList, query, removePerson }) => (
  personList.map(
    person => {
      if (person.name.toLowerCase().includes(query.toLowerCase())) return <Person key={person.name} person={person} removePerson={removePerson} />
    }
  )
)

const Person = ({ person, removePerson }) => (
  <div>{person.name} | {person.number}  
  <button type="button" onClick={() => { removePerson(person) }}>Poista!</button></div>
)

export default PersonList