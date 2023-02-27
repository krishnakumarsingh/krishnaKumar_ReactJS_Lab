import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from "./Components/ShowList";
import ExpenseTracker from "./Components/ExpenseTracker";
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Expense Tracker</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Show List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ExpenseTracker">Expense Tracker</a>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <button className="btn btn-outline-success" type="submit"><a href="/ExpenseTracker">Add</a></button>
            </div>
          </div>
        </div>
      </nav>
      <Router>
          <Routes>
              <Route path="/" element={<ShowList />} />
              <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
