import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = props => (
  <h1>{props.text}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({value, text, suffix}) => (
  <>
    <td>{text}</td><td>{value}{suffix}</td>
  </>
)

const Statistics = props => {
  const totalText = 'yhteensä'
  const averageText = 'keskiarvo'
  const positivityText = 'positiivisia'
  const { good, bad, neutral, goodText, badText, neutralText } = props.info;

  return(
    good !== 0 || bad !== 0 || neutral !== 0 ? 
      <table>
        <tbody>
          <tr><Statistic value={good} text={goodText} /></tr>
          <tr><Statistic value={neutral} text={neutralText} /></tr>
          <tr><Statistic value={bad} text={badText} /></tr>
          <tr><Statistic value={good + neutral + bad} text={totalText} /></tr>
          <tr><Statistic value={(good - bad) / (good + neutral + bad)} text={averageText} /></tr>
          <tr><Statistic value={(good / (good + neutral + bad)) * 100} text={positivityText} suffix='%' /></tr>
        </tbody>
      </table>
    :
      <p>Ei yhtään palautetta annettu</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'hyvä'
  const neutralText = 'neutraali'
  const badText = 'huono'

  const info = {
    goodText: goodText,
    neutralText: neutralText,
    badText: badText,
    good: good,
    neutral: neutral,
    bad: bad
  }
  
  return (
    <div>
      <Heading text='Anna palautetta' />
      <Button handleClick={() => setGood(good + 1)} text={goodText} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutralText} />
      <Button handleClick={() => setBad(bad + 1)} text={badText} />
      <Heading text='Statistiikka' />
      <Statistics info={info} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)