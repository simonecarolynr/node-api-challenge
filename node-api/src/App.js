import React from 'react';
import './App.css';
import axios from 'axios';

function App() {

  axios
    .get('localhost:4000/')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  
  return (
    <div className="App">

    </div>
  );
}

export default App;
