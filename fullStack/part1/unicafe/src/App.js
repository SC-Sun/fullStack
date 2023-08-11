import { useState } from "react";

const FeedBack = ({
  name,
  name2,
  name3,
  handleGood,
  handleBad,
  handleNeutral,
}) => {
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>{name}</button>
      <button onClick={handleNeutral}>{name2}</button>
      <button onClick={handleBad}>{name3}</button>
    </div>
  );
};

const StatisticLine = ({ name, t, value }) => {
  return (
    <div>
      <h2>{t}</h2>
      <p>
        {" "}
        {name} {value}
      </p>
    </div>
  );
};

const MoreStatistics = ({ all, average, positive }) => {
  return (
    <div>
      <p>all {all}</p>
      <p>average {!average ? 0 : average}</p>
      <p>positive {!positive ? 0 : positive}%</p>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + bad + neutral;
  const goodFunction = () => {
    setGood(good + 1);
  };
  const neutralFunction = () => {
    setNeutral(neutral + 1);
  };
  const badFunction = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <FeedBack
        name="good"
        name2="neutral"
        name3="bad"
        handleGood={goodFunction}
        handleNeutral={neutralFunction}
        handleBad={badFunction}
      />
      {!all ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine t="statistics" name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <MoreStatistics
            all={all}
            average={(good - bad) / all}
            positive={(good * 100) / all}
          />
        </>
      )}
    </div>
  );
}

export default App;
