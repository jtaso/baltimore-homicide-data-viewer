import React, { Fragment, useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import 'regenerator-runtime/runtime';
import css from './index.css';

const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterFuncs, setFilterFuncs] = useState({
    age: () => true,
    gender: () => true,
    race: () => true,
  });

  const handleChangeAge = (e) => {
    const ageFilter = {
      under18: (victim) => victim.age < 18 && victim.age !== null,
      '18to50': (victim) => victim.age >= 18 && victim.age <= 50,
      above50: (victim) => victim.age > 50,
    }[e.target.value];

    // assign age filter depends on the returned key, default to return all
    setFilterFuncs({
      ...filterFuncs,
      ...{ age: ageFilter ? ageFilter : () => true },
    });
  };

  const handleChangeGender = (e) => {
    const genderFilter = {
      m: (victim) => victim.gender === 'male',
      f: (victim) => victim.gender === 'female',
      x: (victim) => victim.gender === 'unknown',
    }[e.target.value];

    setFilterFuncs({
      ...filterFuncs,
      ...{ gender: genderFilter ? genderFilter : () => true },
    });
  };

  const handleChangeRace = (e) => {
    const raceFilter = {
      black: (victim) => victim.race === 'black',
      white: (victim) => victim.race === 'white',
      hispanic: (victim) => victim.race === 'hispanic',
      asian: (victim) => victim.race === 'asian',
      unknown: (victim) => victim.race === 'unknown',
    }[e.target.value];

    setFilterFuncs({
      ...filterFuncs,
      ...{ race: raceFilter ? raceFilter : () => true },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api');
        const homicide = await response.json();

        setData(homicide);
        // keep the original data before filtering
        setOriginalData(homicide);

        console.log(homicide[3]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    setData(
      originalData.reduce(
        (acc, elem) =>
          Object.values(filterFuncs).every((fn) => fn(elem))
            ? [...acc, elem]
            : acc,
        []
      )
    );
  }, [filterFuncs]);

  return (
    <div className="container">
      <h1 className="text-center">Baltimore Homicide Data</h1>
      <h2 className="mt-4 text-center">Victim List</h2>
      <div className="mt-4 row mb-3">
        <div className="col-md-4">
          <label>Age</label>
          <select onChange={handleChangeAge}>
            <option value=""></option>
            <option value="under18">Under 18</option>
            <option value="18to50">18 - 50</option>
            <option value="above50">Above 50</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Gender</label>
          <select onChange={handleChangeGender}>
            <option value=""></option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="x">Unknown</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Race</label>
          <select onChange={handleChangeRace}>
            <option value=""></option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="hispanic">Hispanic</option>
            <option value="asian">Asian</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
            <th scope="col">Race</th>
            <th scope="col">Gender</th>
            <th scope="col">Cause of Death</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>
                {new Date(row.date).toDateString() +
                  ' ' +
                  (row.time ? row.time : '')}
              </td>
              <td>{row.first_name + ' ' + row.last_name}</td>
              <td>{row.age}</td>
              <td>{row.street_address}</td>
              <td>{row.race}</td>
              <td>{row.gender}</td>
              <td>{row.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('react-app'));
