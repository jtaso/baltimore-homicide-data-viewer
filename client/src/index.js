import React, { Fragment, useState, useEffect } from "react";
import ReactDom from "react-dom";
import "regenerator-runtime/runtime";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api");
        const homicide = await response.json();
        setData(homicide);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ul>
      {data.map((row, i) => (
        <li key={i}>{row.first_name}</li>
      ))}
    </ul>
  );
};

ReactDom.render(<App />, document.getElementById("react-app"));
