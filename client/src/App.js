import './App.css';
import {
  Route, Routes, Outlet, NavLink,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav className="d-flex wrapper">
        <div className="logo"><a href="/home"><h1>COGNITO</h1></a></div>
        <ul className="nav-links d-flex">
            <li><NavLink to="/contribute">Contribute</NavLink></li>
            <li><NavLink to="/signin">Sign in</NavLink></li>
        </ul>
      </nav>
      <header className="App-header d-flex wrapper">
        <section>
          <h2>A new way to train for cognitive ability and aptitude.</h2>
          <p>Cognito.com helps people especially interview candidates to improve their aptitude and cognitive ability through the use of timed logical, numerical reasoning questions among others.</p>
          <NavLink className="btn btn-primary" to="/signup">Create account</NavLink>
        </section>
      </header>
    </div>
  );
}

export default App;