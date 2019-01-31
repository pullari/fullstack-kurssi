import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => {
    acc.exercises += cur.exercises;
    return acc;
  });
  return <p>yhteensä {total.exercises} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ parts }) => (
  <div>
    { 
      parts.map( part => <Part key={part.id} part={part} /> ) 
    }
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course