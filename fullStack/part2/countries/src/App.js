import { useEffect, useState } from "react";
import DisplayCountries from "./components/DisplayCountries";

import getAll from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [findOne, setFind] = useState("");

  useEffect(() => {
    getAll()
      .then((response) => {
        console.log("promose fullffilled");
        setCountries(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(findOne.toLowerCase())
  );

  return (
    <>
      find countries:{" "}
      <input value={findOne} onChange={(e) => setFind(e.target.value)} />
      <DisplayCountries searchCountry={searchCountry} setFind={setFind} />
    </>
  );
}

export default App;
