import "../nav/nav_style.css"
import image8 from "../img/BackFirstButton.png";
import image9 from "../img/BackSecButt.png";

const Navbar_second=()=>{
return(
<nav className="nav">
  <div className="container">
    <button className="nav-button">
      <span className="text">
        <p>Главная</p>
        <p>Страница</p>
      </span>
    </button>
    <button className="nav-button">
      <span className="text">
        <p>Выбрать</p>
        <p>мероприятие</p>
      </span>
    </button>
    <button className="nav-button">
      <span className="text">
        <p>Tекст</p>
        <p>Кнопки</p>
      </span>
    </button>
    <button className="nav-button">
      <span className="text">
        <p>Tекст</p>
        <p>Кнопки</p>
      </span>
    </button>
  </div>
</nav>

);
}
export default Navbar_second;