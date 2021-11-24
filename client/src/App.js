import './App.css';
// import UpdateFlight from './components/UpdateFlight';
// import Flights from '../src/components/Flights'
// import ViewFlight from './components/ViewFlight';
import * as React from 'react'
import Flights from '../src/components/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/" element={<Flights/>}/>
    </Routes> 
    </div>
    </Router>
  );
}

export default App;
