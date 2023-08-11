const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part
        part={props.name[0].name}
        exercises={props.exercises[0].exercises}
      />
      <Part
        part={props.name[1].name}
        exercises={props.exercises[1].exercises}
      />
      <Part
        part={props.name[2].name}
        exercises={props.exercises[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        {" "}
        Total {" "}
        {props.total.reduce((acc, curr) => {
          return acc + curr;
        })}
      </p>
    </div>
  );
};
function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content name={parts} exercises={parts} />
      <Total
        total={parts.map((i) => {
          return i.exercises;
        })}
      />
    </div>
  );
}

export default App;
