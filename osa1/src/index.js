import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
)

const Content = (props) => { 

  let names = props.parts.map(p => p.name)
  let exercises = props.parts.map(p => p.exercises)

  return (
    <>
      <Part part={names[0]} exercise={exercises[0]} />
      <Part part={names[1]} exercise={exercises[1]} />
      <Part part={names[2]} exercise={exercises[2]} />
    </>
  )
}

const Total = (props) => {
  let total = props.parts.reduce((a, b) => a + b.exercises, 0);
  
  return (
    <p>
      yhteensä {total} tehtävää
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))