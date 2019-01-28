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

const Stat = ({value, text, suffix}) => (
  <p>{text} {value} {suffix}</p>
)

const Statistics = props => {
  const totalText = 'yhteensä'
  const averageText = 'keskiarvo'
  const positivityText = 'positiivisia'
  const { good, bad, neutral, goodText, badText, neutralText } = props.info;

  return(
    <>
      <Stat value={good} text={goodText} />
      <Stat value={neutral} text={neutralText} />
      <Stat value={bad} text={badText} />
      <Stat value={good + neutral + bad} text={totalText} />
      <Stat value={(good - bad) / (good + neutral + bad)} text={averageText} />
      <Stat value={(good / (good + neutral + bad)) * 100} text={positivityText} suffix='%' />
    </>
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