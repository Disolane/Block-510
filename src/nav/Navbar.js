import "../styles/main.css";
import image8 from "../img/BackFirstButton.png";
import image9 from "../img/BackSecButt.png";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="nav">
      <div className="container">
        <div className="dropdown">
          <button
            className="button1 btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            onClick={toggleDropdown} 
          >
            <span className="text">
              <p>Выбрать</p>
              <p>мероприятие</p>
            </span>
          </button>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">

            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <Link className="dropdown-item" to="/сabinet" onClick={() => setIsDropdownOpen(false)}>Студ.Весна</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <Link className="dropdown-item" to="/сabinet" onClick={() => setIsDropdownOpen(false)}>День открытых дверей</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <Link className="dropdown-item" to="/сabinet" onClick={() => setIsDropdownOpen(false)}>MathCat</Link>
            </li>
          </ul>
        </div>

        <Link to="/"  className="button2">
        <img src={image8} width="114" height="106" alt="" className="img8" />
        </Link>
        <button className="button3">
          <img src={image9} width="114" height="106" alt="" className="img9" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;