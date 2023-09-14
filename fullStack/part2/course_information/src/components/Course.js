const Header = ({ value }) => <h1>{value}</h1>;

const Topic = ({ value }) => <h2>{value}</h2>;

const Part = ({ value, number }) => (
  <p>
    {" "}
    {value} {number}
  </p>
);

const Content = ({ value }) => {
  const copy = [...value.parts];
  const excercise = copy.map((i) => {
    return i.exercises;
  });

  return (
    <>
      {copy.map((i) => {
        return <Part key={i.id} value={i.name} number={i.exercises} />;
      })}

      <p>
        <b>
          Total{" "}
          {excercise.reduce((acc, curr) => {
            return acc + curr;
          }, 0)}{" "}
          excercises{" "}
        </b>
      </p>
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      <Header value="Web Development curriculum" />
      <Topic value={courses[0].name} />
      <Content value={courses[0]} />
      <Topic value={courses[1].name} />
      <Content value={courses[1]} />
    </>
  );
};

export default Course;
