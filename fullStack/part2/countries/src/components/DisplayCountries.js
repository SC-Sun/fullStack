import DisplayWeather from "./DisplayWeather";

const DisplayCountries = ({ setFind, searchCountry }) => {
  if (searchCountry.length === 1) {
    const country = searchCountry[0];
    const findLanguages = Object.values(country.languages).filter((lan) => (
      <li key={lan.alpha - 3}> {[lan.languages]} </li>
    ));
    return (
      <>
        {
          <div key={country.id}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>
              {" "}
              <b>Languages: </b>
            </p>
            <ul>
              {findLanguages.map((i) => (
                <li key={i.id}>{i}</li>
              ))}
            </ul>
            <img src={country.flags.svg} alt="" width="150px" height="100px" />
            <DisplayWeather country={country} />
          </div>
        }
      </>
    );
  }
  if (searchCountry.length > 10)
    return <div>Too many matches, specify another filter</div>;
  return searchCountry.map((i) => (
    <div key={i.id}>
      {i.name.common}{" "}
      <button
        type="button"
        value={i.name.common}
        onClick={(e) => setFind(e.target.value)}
      >
        show
      </button>
    </div>
  ));
};

export default DisplayCountries;
