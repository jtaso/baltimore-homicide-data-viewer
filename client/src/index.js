import React, { Fragment, useState, useEffect } from "react";
import ReactDom from "react-dom";
import "regenerator-runtime/runtime";
import css from "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const handleChangeAge = (e) => {
    console.log("original data --- ", originalData);
    let filteredData = {};
    switch (e.target.value) {
      case "under18":
        console.log("under18");
        filteredData = [
          ...originalData.filter(
            (victim) => victim.age < 18 && victim.age !== null
          ),
        ];
        break;
      case "18to50":
        filteredData = [
          ...originalData.filter(
            (victim) => victim.age >= 18 && victim.age <= 50
          ),
        ];
        break;
      case "above50":
        filteredData = [...originalData.filter((victim) => victim.age > 50)];
        break;
      default:
        filteredData = [...originalData];
    }
    console.log("new data --- ", filteredData);

    setData(filteredData);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api");
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

  return (
    <div className="container">
      <h1 className="text-center">Baltimore Homicide Data</h1>
      <h2 className="mt-4 text-center">Victim List</h2>
      <div className="mt-4 row mb-3">
        <div className="col-md-4">
          <label>Age: </label>
          {/* when to use handleChange vs () => handleChange()?? */}
          <select onChange={handleChangeAge}>
            <option value=""></option>
            <option value="under18">Under 18</option>
            <option value="18to50">18 - 50</option>
            <option value="above50">Above 50</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Gender: </label>
          <select>
            <option value=""></option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="x">Unknown</option>
          </select>
        </div>
        <div className="col-md-4">filter</div>
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
                  " " +
                  (row.time ? row.time : "")}
              </td>
              <td>{row.first_name + " " + row.last_name}</td>
              <td>{row.age}</td>
              <td>{row.street_address}</td>
              <td>{row.race}</td>
              <td>{row.gender}</td>
              <td>{row.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ul>
        {data.map((row, i) => (
          <li key={i}>{row.first_name}</li>
        ))}
      </ul> */}
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("react-app"));
