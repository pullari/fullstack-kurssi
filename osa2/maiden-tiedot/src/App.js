import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = (props) => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const queryChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="App">
      <h1>Maiden tiedot!</h1>
      <input value={query} onChange={queryChange} />
      <Countries 
        countries={countries.filter((value) => value.name.toLowerCase().includes(query.toLowerCase()))} 
        setQuery={setQuery}
      />
    </div>
  );
}

const Countries = ({ countries, setQuery }) => (
  <>
    {validate(countries, setQuery)}
  </>
)

const validate = (countries, setQuery) => 
  countries.length > 10 ? 
    <p>Too many matches, specify another filter</p> : 
    countries.length === 1 ? 
      <Country country={countries[0]} /> : 
      countries.map(country => <CountryListItem country={country} setQuery={setQuery} key={country.name} />);

const CountryListItem = ({ country, setQuery }) => (
  <div>
    {country.name} <button type="button" onClick={() => setQuery(country.name)}>Show</button>
  </div>
)

const Country = ({ country, country: {name, capital, population, languages, flag} }) => (
  <div>
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h3>languages</h3>
    <ul>{ languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
    <img src={flag} alt="Lippu" width="200" />
    <Weather country={country} />
  </div>
)

const Weather = ({ country: { capital } }) => {
  const [weather, setWeather] = useState({
    current: {
      temp_c: undefined,
      wind_kph: undefined,
      wind_dir: undefined,
      condition: {
        icon: ''
      }
    }
  })

  const hook = () => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=474cb7b068b44006a77134906190402&q=${capital}`)
      .then(response => setWeather(response.data))
  }
  useEffect(hook, [])

  const { current: { condition: { icon }, temp_c, wind_kph, wind_dir } } = weather;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div> temperature: { temp_c } Celsius</div>
      <img alt="ikoni" src={icon} />
      <div>wind: { wind_kph } kph direction { wind_dir }</div>
    </div>
  )
}

export default App;
