import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ExpenseTracker from "./Components/ExpenseTracker";
import ShowList from "./Components/ShowList";
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {
  let token = localStorage.getItem("token_react_lab");
  const [isValid, setIsValid] = useState(false);
  const logout = () => {
    localStorage.removeItem("token_react_lab");
  }
  useEffect(() => {
    if(token) {
      setIsValid(true);
    }
  }, [token]);
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
              <button className="btn btn-outline-success" type="submit"><a href="/ExpenseTracker">Add</a></button>&nbsp;
              {" "}{isValid && <button className="btn btn-outline-success" id="logout" type="button" onClick={() => logout()}><a href="/">Logout</a></button>}
            </div>
          </div>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={token ? <ShowList /> : <SignIn />} />
          <Route path="/sign-in" element={token ? <ShowList /> : <SignIn />} />
          <Route path="/sign-up" element={token ? <ShowList /> : <SignUp />} />
          <Route path="/ExpenseTracker" element={token ? <ExpenseTracker /> : <SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
