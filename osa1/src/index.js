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
  return (
    <>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </>
  )
}

const Total = (props) => (
    <p>
        yhteensä {props.total} tehtävää
    </p>
)

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))