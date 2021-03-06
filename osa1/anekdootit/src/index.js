import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const randomIndex = (arr) => Math.floor(Math.random() * arr.length)

const vote = (arr, index) => {
  const copy = [...arr];
  copy[index] !== undefined ? copy[index]++ : copy[index] = 1;
  return copy;
} 

const getMostVoted = (anecdotes, votes) => {
  let mostLiked, mostLikedVotes;

  anecdotes.forEach((element, index) => {
    if (votes[index] > mostLikedVotes || (mostLiked === undefined || mostLikedVotes === undefined)) {
      mostLiked = element;
      mostLikedVotes = votes[index];
    }
  });

  return mostLiked;
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

  return (
    <>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        <Button text='next anecdote' handleClick={() => {setSelected(randomIndex(props.anecdotes))}} />
      </div>
      <div>
        <p>Has { votes[selected] ? votes[selected] : 0 } votes!</p>
        <Button text='vote' handleClick={() => {setVotes(vote(votes, selected))}} />
      </div>
      <div>
        <h1>Anecdote with most votes!</h1>
        {getMostVoted(props.anecdotes, votes)}
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)