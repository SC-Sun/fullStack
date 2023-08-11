import { useState } from "react";

const Anecdotes = ({ value, handler1, value2, handler2 }) => {
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{value}</p>
      <p> {`has ${value2} ${[value2 >= 2 ? "votes" : "vote"]}`} </p>
      <button onClick={handler1}>vote</button>
      <button onClick={handler2}>next anecdotes</button>
    </div>
  );
};
const MostVotes = ({ value, value2 }) => {
  return (
    <div>
      <h1>Anecdotes with most votes</h1>
      <p>{value}</p>
      <p> {`has ${value2} ${[value2 >= 2 ? "votes" : "vote"]}`} </p>
    </div>
  );
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const random = (i) => {
    return Math.floor(Math.random() * i.length);
  };
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  const maxN = Math.max(...vote);
  const highest = anecdotes[vote.indexOf(maxN)];

  const handleAnecdotes = () => {
    const randonNumber = random(anecdotes);
    setSelected(randonNumber);
  };

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };
  return (
    <>
      <Anecdotes
        value={anecdotes[selected]}
        handler2={handleAnecdotes}
        value2={vote[selected]}
        handler1={handleVote}
      />
      <MostVotes value={highest} value2={maxN} />
    </>
  );
}

export default App;
