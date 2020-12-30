import React, { Fragment, useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import "regenerator-runtime/runtime";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api');
                console.log('RESPONSE ----  ', response);
                const homicide = await response.json();
                console.log('HOMICIDE ------- ', homicide);
                setData(homicide);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (<div>HIIIIIII</div>);
};



ReactDom.render(<App />, document.getElementById('react-app'));