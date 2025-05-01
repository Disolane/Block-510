import "../styles/main.css";
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
              <Link className="dropdown-item" to="/event/1" onClick={() => setIsDropdownOpen(false)}>Студ.Весна</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <Link className="dropdown-item" to="/сabinet" onClick={() => setIsDropdownOpen(false)}>День открытых дверей</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
            <Link className="dropdown-item" to="/сabinet" onClick={() => setIsDropdownOpen(false)}>Я читатель</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
            <Link className="dropdown-item" to="/event/2" onClick={() => setIsDropdownOpen(false)}>Первый снег</Link>
            </li>
            <li style={{ display: isDropdownOpen ? 'block' : 'none' }}>
            <Link className="dropdown-item" to="/event/:eventId" onClick={() => setIsDropdownOpen(false)}>MathCat</Link>
            </li>
          </ul>
        </div>

        <Link to="/"  className="button2">
         <div className=" text-button2" >
         Вернуться на главную страницу
         </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;