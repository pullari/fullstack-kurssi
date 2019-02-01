import React from 'react'

const PersonList = ({ personList, query }) => (
  personList.map(
    person => {
      if (person.name.toLowerCase().includes(query.toLowerCase())) return <Person key={person.name} person={person} />
    }
  )
)

const Person = ({ person }) => (<div>{person.name} | {person.number}</div>)

export default PersonList